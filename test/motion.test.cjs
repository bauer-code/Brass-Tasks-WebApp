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
  assert.equal(e.motion.effects.size,2);
  assert.ok(e.cap.effects.slice(0,-1).every(effect=>effect.cancelled));
  await Promise.resolve();
  assert.equal(e.motion.effects.get(e.cap),e.cap.effects.at(-1));
  e.cap.effects.at(-1).finish(); e.guide.effects.at(-1).finish();
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
