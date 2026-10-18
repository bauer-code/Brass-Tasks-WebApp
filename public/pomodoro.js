(function (root) {
  const DEFAULTS = { work: 25, short: 5, long: 15 };
  class Pomodoro {
    constructor(saved = {}, now = () => Date.now()) {
      this.now = now;
      this.settings = { ...DEFAULTS };
      for (const key of Object.keys(DEFAULTS)) {
        const value = saved?.settings?.[key];
        if (Number.isInteger(value) && value >= 1 && value <= 180) this.settings[key] = value;
      }
      this.mode = ['work', 'short', 'long'].includes(saved?.mode) ? saved.mode : 'work';
      this.elapsedMs = Number.isFinite(saved?.elapsedMs) ? Math.max(0, Math.min(saved.elapsedMs, this.targetMs)) : 0;
      this.startedAt = Number.isFinite(saved?.startedAt) && saved.startedAt > 0 ? saved.startedAt : null;
      this.running = saved?.running === true && this.startedAt !== null;
      this.completed = saved?.completed === true && this.elapsedMs >= this.targetMs;
      this.workCount = Number.isInteger(saved?.workCount) && saved.workCount >= 0 ? saved.workCount : 0;
    }
    get targetMs() { return this.settings[this.mode] * 60000; }
    elapsed() { return Math.min(this.targetMs, this.elapsedMs + (this.running ? Math.max(0, this.now() - this.startedAt) : 0)); }
    start() { if (!this.running && !this.completed) { this.startedAt = this.now(); this.running = true; } }
    pause() { if (this.tick()) return; this.elapsedMs = this.elapsed(); this.running = false; this.startedAt = null; }
    reset() { this.elapsedMs = 0; this.startedAt = null; this.running = false; this.completed = false; }
    select(mode) { if (!Object.hasOwn(DEFAULTS, mode)) throw Error('Invalid timer mode.'); this.mode = mode; this.reset(); }
    configure(settings) {
      if (!Object.keys(DEFAULTS).every(key => Number.isInteger(settings?.[key]) && settings[key] >= 1 && settings[key] <= 180)) throw Error('Use whole minutes from 1 to 180.');
      this.settings = { ...settings }; this.reset();
    }
    tick() {
      if (!this.running || this.elapsed() < this.targetMs) return false;
      this.elapsedMs = this.targetMs; this.running = false; this.startedAt = null; this.completed = true;
      if (this.mode === 'work') this.workCount++;
      return true;
    }
    nextMode() { return this.mode === 'work' ? (this.workCount % 4 === 0 ? 'long' : 'short') : 'work'; }
    serialize() { return { settings: { ...this.settings }, mode: this.mode, elapsedMs: this.elapsedMs, startedAt: this.startedAt, running: this.running, completed: this.completed, workCount: this.workCount }; }
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { Pomodoro, DEFAULTS };
  else root.Pomodoro = Pomodoro;
})(typeof window === 'undefined' ? globalThis : window);
