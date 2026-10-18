const { test } = require('node:test');
const assert = require('node:assert/strict');
const { Pomodoro } = require('../public/pomodoro.js');
test('defaults, count-up timing, pause/resume and one-shot completion', () => {
  let now = 1000; const timer = new Pomodoro({}, () => now);
  assert.deepEqual(timer.settings, { work:25, short:5, long:15 });
  timer.start(); now += 15000; assert.equal(timer.elapsed(), 15000);
  timer.pause(); now += 30000; assert.equal(timer.elapsed(), 15000);
  timer.start(); now += 1485000; assert.equal(timer.tick(), true);
  assert.equal(timer.elapsed(), 25*60000); assert.equal(timer.workCount, 1);
  assert.equal(timer.tick(), false); assert.equal(timer.nextMode(), 'short');
});
test('wall-clock restoration catches elapsed time, including while minimized', () => {
  let now = 1000; const timer = new Pomodoro({}, () => now); timer.start();
  const saved = timer.serialize(); now += 25*60000;
  const restored = new Pomodoro(saved, () => now);
  assert.equal(restored.tick(), true); assert.equal(restored.running, false);
  const completed = new Pomodoro(restored.serialize(), () => now+1000);
  assert.equal(completed.tick(), false); assert.equal(completed.workCount, 1);
});
test('custom durations, mode reset, four-work long break, and invalid settings', () => {
  let now = 1000; const timer = new Pomodoro({}, () => now);
  timer.configure({work:1, short:2, long:3});
  for (let i=0;i<4;i++) { timer.select('work'); timer.start(); now += 60000; assert.ok(timer.tick()); }
  assert.equal(timer.nextMode(), 'long'); timer.select('long'); assert.equal(timer.targetMs, 180000);
  timer.start(); now+=2000; timer.reset(); assert.equal(timer.elapsed(), 0); assert.equal(timer.running, false);
  assert.throws(() => timer.configure({work:0,short:5,long:15}));
  assert.throws(() => timer.configure({work:1.5,short:5,long:15}));
  assert.deepEqual(new Pomodoro({settings:{work:'bad',short:-1,long:999}}).settings, {work:25,short:5,long:15});
});
test('pausing exactly at the deadline completes once', () => {
  let now = 1000; const timer = new Pomodoro({}, () => now);
  timer.start(); now += timer.targetMs; timer.pause();
  assert.equal(timer.completed, true); assert.equal(timer.workCount, 1); assert.equal(timer.tick(), false);
});
