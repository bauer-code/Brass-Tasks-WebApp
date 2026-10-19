const {test} = require('node:test');
const assert = require('node:assert/strict');
const M = require('../public/model.js');
const quotes = require('../public/quotes.js');

test('bulk entry accepts plain lines, bullets, numbered lists and checkboxes as new tasks', () => {
  const source = '# Work\r\n\r\nOriginal paragraph.\r\n- [x] Already done\r\n';
  const batch = '\n Read the chapter \n- Draft an outline\n2. Review it\n* [x] Publish the draft\n• Take a break\n[ ] Reflect\n';
  assert.deepEqual(M.parseTaskBatch(batch),['Read the chapter','Draft an outline','Review it','Publish the draft','Take a break','Reflect']);
  const result = M.addTasks(source,batch), tasks = M.parseMarkdown(result).tasks;
  assert.equal(tasks.length,7); assert.equal(tasks[0].done,true);
  assert.ok(tasks.slice(1).every(t => !t.done));
  assert.ok(result.startsWith(source.trimEnd()));
  assert.equal(result.replaceAll('\r\n','').includes('\n'),false);
});

test('bulk validation rejects the entire invalid batch and enforces limits', () => {
  assert.throws(() => M.addTasks('# Work','\n\n'),/at least one task/);
  assert.throws(() => M.parseTaskBatch('ok\n'+'x'.repeat(501)),/500/);
  assert.throws(() => M.parseTaskBatch(Array(201).fill('Task').join('\n')),/200/);
  assert.throws(() => M.parseTaskBatch('- [ ] '),/500/);
  assert.equal(M.parseTaskBatch(Array(200).fill('Task').join('\n')).length,200);
});

test('completion fires on a transition to a nonempty finished list, not redraw or reload', () => {
  const before='# Plan\n- [x] First\n- [ ] Second\n';
  const after=M.changeTask(before,2,'toggle');
  assert.equal(M.becameComplete(before,after),true);
  assert.equal(M.becameComplete(after,after),false);
  assert.equal(M.becameComplete(after,before),false);
  assert.equal(M.becameComplete(before,'# Plan\n'),false);
  assert.equal(M.isComplete('# Empty'),false);
  const reopened=M.changeTask(after,2,'toggle');
  assert.equal(M.becameComplete(reopened,after),true);
});

test('quote library contains exactly 200 unique, sourced and complete selections', () => {
  assert.equal(quotes.length,200); assert.equal(new Set(quotes.map(q => q.id)).size,200);
  assert.equal(new Set(quotes.map(q => q.text)).size,200);
  for(const q of quotes) {
    assert.ok(q.text.length > 20 && q.book && q.author);
    assert.ok(Number.isInteger(q.page) && q.page >= 1 && q.page <= 289);
    assert.ok(Number.isInteger(q.location) && q.location > 0);
    assert.doesNotMatch(q.text,/\blittle\b|\bNOTA\b|\ufffd/i);
  }
});

test('quotes cycle through all selections once and persist in old and new backups', () => {
  const state=M.fresh(), seen=new Set();
  for(let i=0;i<200;i++) { seen.add(state.quoteIndex); M.advanceQuote(state,quotes.length); }
  assert.equal(seen.size,200); assert.equal(state.quoteIndex,0);
  state.quoteIndex=137;
  assert.equal(M.validate(JSON.parse(JSON.stringify(state))).quoteIndex,137);
  delete state.quoteIndex; assert.equal(M.validate(state).quoteIndex,0);
  assert.equal(M.validate({...state,quoteIndex:200}).quoteIndex,0);
  assert.equal(M.validate({...state,quoteIndex:-1}).quoteIndex,0);
});
