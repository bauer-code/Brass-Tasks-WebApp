const {test} = require('node:test');
const assert = require('node:assert/strict');
const BrassMotion = require('../public/motion.js');

function environment(rowCount = 0) {
  const events = () => ({handlers:new Map(),addEventListener(name,fn){this.handlers.set(name,fn);},removeEventListener(name){this.handlers.delete(name);},emit(name){this.handlers.get(name)?.();}});
  let measures = 0;
  function element(text = '') {
    return {textContent:text,effects:[],getBoundingClientRect(){measures++; return {top:10,bottom:20};},animate(frames,options){
      let resolve,reject;
      const effect = {frames,options,cancelled:false,finished:new Promise((yes,no)=>{resolve=yes;reject=no;}),cancel(){this.cancelled=true;reject(Error('cancelled'));},finish(){resolve();}};
      this.effects.push(effect); return effect;
    }};
  }
  const paper = element(), roller = element(), guide = element(), cap = element('E'), space = element();
  paper.getBoundingClientRect = () => ({top:0,bottom:500});
  const rows = Array.from({length:rowCount},()=>element('Task text stays available'));
  paper.querySelectorAll = () => rows;
  paper.contains = element => rows.includes(element);
  const elements = {'#paper':paper,'.roller':roller,'.type-guide':guide,'#keys .space':space};
  const document = {...events(),hidden:false,querySelector:selector=>elements[selector],querySelectorAll:()=>[cap]};
  const preference = {...events(),matches:false};
  const motion = new BrassMotion(document,preference);
  return {motion,document,preference,paper,roller,guide,cap,rows,measures:()=>measures};
}

test('long lists have bounded, finite visual work without altering task content', () => {
  const e = environment(200);
  e.motion.feed();
  assert.ok(e.measures() <= 12);
  assert.ok(e.motion.effects.size <= 14);
  for(const animation of e.motion.effects.values()) {
    assert.ok(animation.options.duration + (animation.options.delay || 0) <= 600);
    assert.equal(animation.options.iterations,undefined);
  }
  assert.ok(e.rows.every(row=>row.textContent === 'Task text stays available'));
  e.motion.destroy();
});

test('rapid typing replaces effects; cancellation callbacks cannot remove a newer effect', async () => {
  const e = environment();
  for(let i=0;i<100;i++) e.motion.strike('é');
  assert.equal(e.motion.effects.size,1);
  assert.equal(e.guide.effects.length,0);
  assert.ok(e.cap.effects.slice(0,-1).every(effect=>effect.cancelled));
  await Promise.resolve();
  assert.equal(e.motion.effects.get(e.cap),e.cap.effects.at(-1));
  e.cap.effects.at(-1).finish();
  await Promise.resolve();
  assert.equal(e.motion.effects.size,0);
  e.motion.destroy();
});

test('reduced motion and hidden tabs cancel effects and skip new animation and layout work', () => {
  const e = environment(200);
  e.motion.feed(); const effects = [...e.motion.effects.values()];
  e.preference.matches = true; e.preference.emit('change');
  assert.ok(effects.every(effect=>effect.cancelled));
  const measured = e.measures();
  e.motion.feed(); e.motion.strike('e'); e.motion.finish();
  assert.equal(e.motion.effects.size,0); assert.equal(e.measures(),measured);
  e.preference.matches = false; e.motion.feed();
  e.document.hidden = true; e.document.emit('visibilitychange');
  e.motion.feed(); assert.equal(e.motion.effects.size,0);
  e.motion.destroy();
  assert.equal(e.document.handlers.size,0); assert.equal(e.preference.handlers.size,0);
});

test('new renders can cancel every effect and missing animation support is harmless', () => {
  const e = environment();
  e.motion.feed(); e.motion.strike('e'); e.motion.cancel();
  assert.equal(e.motion.effects.size,0);
  assert.doesNotThrow(()=>e.motion.animate({},[],{duration:100}));
  e.motion.destroy();
});

function printingEnvironment(texts) {
  const e = environment(), pending = new Map(); let id = 0;
  const delays = [];
  e.motion.schedule = {set(fn,delay){delays.push(delay);pending.set(++id,fn);return id;},clear(key){pending.delete(key);}};
  e.document.createElement = () => ({textContent:'',children:[],append(...children){this.children.push(...children);},setAttribute(name,value){this[name]=value;},remove(){this.removed=true;}});
  e.document.createTextNode = data => ({data,appendData(text){this.data += text;}});
  const elements = texts.map(text => {
    const classes = new Set();
    return {textContent:text,isConnected:true,overlays:[],classList:{add:name=>classes.add(name),remove:name=>classes.delete(name),contains:name=>classes.has(name)},append(overlay){this.overlays.push(overlay);}};
  });
  const step = () => { const [key,fn] = pending.entries().next().value; pending.delete(key); fn(); };
  return {...e,pending,elements,step,delays};
}

test('task printing reveals whole graphemes while retaining the complete accessible text', () => {
  const e = printingEnvironment(['A👩‍💻é']), sounds = [];
  const element = e.elements[0]; e.motion.printTasks(e.elements,char=>sounds.push(char));
  assert.equal(element.textContent,'A👩‍💻é');
  assert.equal(element.overlays[0]['aria-hidden'],'true');
  const [ink,pending] = element.overlays[0].children;
  e.step(); assert.equal(ink.data,'A'); assert.equal(pending.textContent,'👩‍💻é');
  e.step(); assert.equal(ink.data,'A👩‍💻'); assert.equal(pending.textContent,'é');
  e.step(); assert.equal(ink.data,'A👩‍💻é'); assert.equal(pending.textContent,'');
  assert.deepEqual(sounds,['A','👩‍💻','é','\n']);
  assert.equal(element.classList.contains('task-printing'),false);
  assert.equal(e.pending.size,0); assert.equal(e.motion.printing,null);
  e.motion.destroy();
});

test('interrupted printing restores full text and cannot leave a stale timer', () => {
  const e = printingEnvironment(['First task','Second task']);
  e.motion.printTasks(e.elements); e.step();
  e.preference.matches = true; e.preference.emit('change');
  assert.equal(e.pending.size,0);
  assert.ok(e.elements.every(el=>el.overlays[0].removed && !el.classList.contains('task-printing')));
  e.motion.printTasks(e.elements); assert.equal(e.pending.size,0);
  e.preference.matches = false; e.motion.printTasks(e.elements); e.step();
  e.document.hidden = true; e.document.emit('visibilitychange');
  assert.equal(e.pending.size,0); assert.equal(e.motion.printing,null);
  e.document.hidden = false; e.motion.printTasks(e.elements); e.elements[0].isConnected = false; e.step();
  assert.equal(e.pending.size,0); assert.equal(e.motion.printing,null);
  e.motion.destroy();
});

test('bulk printing has one timer, a bounded queue, and completes without changing source text', () => {
  const e = printingEnvironment(Array.from({length:200},()=> 'E'.repeat(500)));
  e.motion.printTasks(e.elements);
  let ticks = 0;
  while(e.pending.size) { assert.equal(e.pending.size,1); assert.ok(++ticks <= 248); e.step(); }
  assert.equal(e.elements.filter(el=>el.overlays.length).length,8);
  assert.ok(e.elements.every(el=>el.textContent === 'E'.repeat(500) && !el.classList.contains('task-printing')));
  e.motion.destroy();
});

test('desktop rhythm pauses between tasks while the arrow stays stationary', () => {
  const e = printingEnvironment(['E.','E']);
  e.motion.printTasks(e.elements);
  e.step(); assert.equal(e.delays.at(-1),77);
  e.step(); assert.equal(e.delays.at(-1),260);
  e.step(); assert.equal(e.pending.size,0);
  e.motion.feed(); e.motion.strike('E'); e.motion.carriage(); e.motion.finish();
  assert.equal(e.guide.effects.length,0);
  e.motion.destroy();
});

test('printing preserves the full line layout at every reveal and leaves the paper still', () => {
  const text = 'A word near the margin must keep its final line position.';
  const e = printingEnvironment([text]);
  e.motion.feed(); const feed = e.paper.effects.at(-1);
  e.motion.printTasks(e.elements);
  assert.equal(feed.cancelled,true);
  const [ink,pending] = e.elements[0].overlays[0].children;
  while(e.pending.size) { e.step(); assert.equal(ink.data + pending.textContent,text); }
  e.motion.strike('\n'); e.motion.carriage();
  assert.equal(e.paper.effects.length,1);
  assert.equal(e.motion.effects.has(e.paper),false);
  e.motion.destroy();
});

test('writing settles page-entry effects without cancelling the key mechanism', () => {
  const e = environment(3);
  e.motion.feed(); e.motion.strike('E'); e.motion.settlePaper();
  assert.equal(e.motion.effects.has(e.paper),false);
  assert.ok(e.rows.every(row=>row.effects.every(effect=>effect.cancelled)));
  assert.equal(e.motion.effects.has(e.cap),true);
  assert.equal(e.motion.effects.has(e.roller),true);
  e.motion.destroy();
});
