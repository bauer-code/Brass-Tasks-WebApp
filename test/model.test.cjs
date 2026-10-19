const {test} = require('node:test');
const assert = require('node:assert/strict');
const M = require('../public/model.js');
test('Markdown parsing ignores frontmatter and fenced examples, supports nested lists and sections', () => {
  const source = '---\n- [ ] YAML example\n---\n# Real title\n## Today\n- [ ] First\n  * [X] Nested\n2. [ ] Ordered\n```md\n- [ ] Example\n```\n~~~\n- [ ] Other example\n~~~\n';
  const parsed = M.parseMarkdown(source);
  assert.equal(parsed.title,'Real title'); assert.equal(parsed.tasks.length,3); assert.equal(parsed.tasks[1].done,true); assert.equal(parsed.tasks[0].section,'Today');
});
test('toggling and editing preserve original prose, frontmatter, checkbox prefixes, and CRLF', () => {
  const source = '---\r\ntags: [work]\r\n---\r\n# Work\r\nA paragraph.\r\n  - [ ] Meet André #today\r\nAnother paragraph.\r\n';
  assert.equal(M.changeTask(source,5,'toggle'),source.replace('[ ]','[x]'));
  assert.equal(M.changeTask(source,5,'edit','Meet Ana'),source.replace('Meet André #today','Meet Ana'));
  assert.equal(M.changeTask(source,5,'remove'),source.replace('  - [ ] Meet André #today\r\n',''));
  assert.throws(() => M.changeTask(source,0,'toggle'));
  assert.ok(M.addTask(source,'Next task').endsWith('- [ ] Next task\r\n'));
});
test('invalid text and unsafe or incompatible backups are rejected', () => {
  assert.throws(() => M.cleanText('  ')); assert.throws(() => M.cleanText('x'.repeat(501)));
  assert.equal(M.cleanText(' first\nsecond '),'first second');
  assert.throws(() => M.validate({version:2,plans:[],sessions:[]}));
  assert.throws(() => M.validate({...M.fresh(),plans:[{id:'1',title:'x',markdown:'',status:'active'},{id:'1',title:'x',markdown:'',status:'active'}]}));
  assert.throws(() => M.validate({...M.fresh(),sessions:[null]}));
  const recovered = M.validate({...M.fresh(),preferences:{muted:'false'},activeId:'missing'});
  assert.equal(recovered.preferences.muted,false); assert.equal(recovered.activeId,null);
});
test('storage commits are atomic on failure and reject stale tabs', () => {
  let saved = null; const storage = {getItem:() => saved,setItem:(_key,value) => saved = value};
  const first = M.commit(storage,M.fresh(),0); assert.equal(first.revision,1);
  assert.throws(() => M.commit(storage,M.fresh(),0),/Another tab/);
  storage.setItem = () => { throw Error('quota'); };
  assert.throws(() => M.commit(storage,first,1),/quota/); assert.equal(JSON.parse(saved).revision,1); assert.equal(first.revision,1);
});

test('notes survive storage and backup validation without changing existing plans', () => {
  const body = 'A thought in Português.\n\n## Ideas\n- [ ] A checkbox stays literal in a note\n\n```js\nconst n = 1;\n```\n';
  const note = {id:'note-1',kind:'note',title:'Reading notes',markdown:body,status:'active'};
  const legacy = {id:'plan-1',title:'Existing plan',markdown:'# Existing plan\r\n- [ ] Read\r\n',status:'active'};
  let stored;
  const saved = M.commit({getItem:()=>null,setItem:(_,value)=>stored=value},{...M.fresh(),activeId:note.id,plans:[note,legacy]},0);
  const restored = M.validate(JSON.parse(stored));
  assert.deepEqual(restored.plans,saved.plans);
  assert.equal(restored.activeId,note.id);
  assert.equal(M.exportMarkdown(restored.plans[0]),'# Reading notes\n\n' + body);
  assert.equal(M.exportMarkdown(restored.plans[1]),legacy.markdown);
  assert.equal(M.exportMarkdown({...note,title:'Renamed note'}),'# Renamed note\n\n' + body);
  assert.equal(M.exportMarkdown({...note,markdown:''}),'# Reading notes\n\n');
  assert.throws(()=>M.validate({...M.fresh(),plans:[{...note,kind:'unknown'}]}),/page type/);
});
