(function(root) {
  // Finite visual effects only: saved content and input never wait for animation.
  class BrassMotion {
    constructor(document, preference, schedule = {set:(fn,delay) => setTimeout(fn,delay),clear:timer => clearTimeout(timer)}) {
      this.document = document;
      this.preference = preference;
      this.effects = new Map();
      this.schedule = schedule;
      this.onPreference = () => { if(preference.matches) this.cancel(); };
      this.onVisibility = () => { if(document.hidden) this.cancel(); };
      preference.addEventListener('change',this.onPreference);
      document.addEventListener('visibilitychange',this.onVisibility);
    }
    get enabled() { return !this.preference.matches && !this.document.hidden; }
    animate(element, frames, options) {
      if(!this.enabled || !element?.animate) return;
      this.effects.get(element)?.cancel();
      const effect = element.animate(frames,{easing:'ease-out',...options});
      this.effects.set(element,effect);
      const release = () => { if(this.effects.get(element) === effect) this.effects.delete(element); };
      effect.finished.then(release,release);
      return effect;
    }
    cancel() { this.stopPrinting(); for(const effect of this.effects.values()) effect.cancel(); this.effects.clear(); }
    stopPrinting() {
      if(!this.printing) return;
      this.schedule.clear(this.printing.timer);
      for(const entry of this.printing.entries) { entry.overlay.remove(); entry.element.classList.remove('task-printing'); }
      this.printing = null;
    }
    printTasks(elements, sound = () => {}) {
      this.stopPrinting();
      if(!this.enabled) return;
      const segmenter = typeof Intl.Segmenter === 'function' ? new Intl.Segmenter(undefined,{granularity:'grapheme'}) : null;
      const entries = elements.slice(0,8).filter(element => element.isConnected).map(element => {
        const text = element.textContent;
        const characters = segmenter ? [...segmenter.segment(text)].map(part => part.segment) : [...text];
        const overlay = this.document.createElement('span'); overlay.className = 'task-print'; overlay.setAttribute('aria-hidden','true');
        element.classList.add('task-printing'); element.append(overlay);
        return {element,overlay,characters,index:0};
      });
      if(!entries.length) return;
      const total = entries.reduce((n,entry) => n + entry.characters.length,0);
      // Match the desktop's 77 ms rhythm for short tasks; batch long text into
      // at most ~240 strikes so a bulk import never queues minutes of effects.
      const chunk = Math.max(1,Math.ceil(total/240));
      const delay = Math.max(24,Math.min(77,6000/Math.max(1,total/chunk)));
      const job = {entries,timer:null,row:0}; this.printing = job;
      const tick = () => {
        if(this.printing !== job) return;
        if(!this.enabled || entries.some(entry => !entry.element.isConnected)) return this.stopPrinting();
        const entry = entries[job.row];
        const next = entry.characters.slice(entry.index,entry.index + chunk); entry.index += next.length;
        entry.overlay.textContent += next.join('');
        const character = next.at(-1);
        if(character) { this.strike(character); sound(character); }
        let pause = character === ' ' ? delay * .75 : delay + (/[.,;:!?]/.test(character || '') ? 45 : 0);
        if(entry.index >= entry.characters.length) {
          entry.overlay.remove(); entry.element.classList.remove('task-printing'); job.row++;
          if(job.row === entries.length) { this.printing = null; this.carriage(); sound('\n'); return; }
          this.carriage(); sound('\n');
          pause = 260;
        }
        job.timer = this.schedule.set(tick,pause);
      };
      // Let the prompt close before the first key strikes.
      try { job.timer = this.schedule.set(tick,180); }
      catch { this.stopPrinting(); }
    }
    feed() {
      if(!this.enabled) return;
      const paper = this.document.querySelector('#paper');
      if(!paper) return;
      // Measure a bounded set of visible rows once, before scheduling effects.
      const bounds = paper.getBoundingClientRect(), rows = [];
      let inspected = 0;
      for(const row of paper.querySelectorAll('.paper-title,.section,.task-item,.empty-paper')) {
        if(++inspected > 12) break;
        const box = row.getBoundingClientRect();
        if(box.top >= bounds.bottom || rows.length === 8) break;
        if(box.bottom > bounds.top) rows.push(row);
      }
      this.animate(paper,[{transform:'translateY(46px)',opacity:.45},{transform:'translateY(0)',opacity:1}],{duration:420,easing:'steps(8, end)'});
      rows.forEach((row,index) => this.animate(row,[{transform:'translateY(5px)',opacity:.25},{transform:'translateY(0)',opacity:1}],{duration:180,delay:70 + index*35,fill:'backwards'}));
      const caps = [...this.document.querySelectorAll('#keys .key')];
      const letters = [...new Set(rows.map(row => row.textContent).join('').normalize('NFD').replace(/\p{M}/gu,'').toUpperCase())];
      const printCaps = letters.map(letter => caps.find(cap => cap.textContent === letter)).filter(Boolean).slice(0,3);
      printCaps.forEach((cap,index) => this.animate(cap,[{transform:'translateY(0)'},{transform:'translateY(3px)',offset:.3},{transform:'translateY(0)'}],{duration:110,delay:90 + index*70}));
      this.roller();
    }
    roller() {
      this.animate(this.document.querySelector('.roller'),[{transform:'scaleY(1)'},{transform:'scaleY(.85)',offset:.45},{transform:'scaleY(1)'}],{duration:240,easing:'steps(4, end)'});
    }
    carriage() {
      this.animate(this.document.querySelector('#paper'),[{transform:'translate(0,0)'},{transform:'translate(3px,-3px)',offset:.3},{transform:'translate(-2px,-3px)',offset:.7},{transform:'translate(0,0)'}],{duration:230,easing:'steps(5, end)'});
      this.roller();
    }
    strike(character = '') {
      if(!this.enabled) return;
      const key = character.normalize('NFD').replace(/\p{M}/gu,'').toUpperCase();
      this.keycaps ||= new Map([...this.document.querySelectorAll('#keys .key')].map(cap => [cap.textContent,cap]));
      const cap = key === ' ' ? this.document.querySelector('#keys .space') : this.keycaps.get(key);
      this.animate(cap,[{transform:'translateY(0)'},{transform:'translateY(3px)',offset:.3},{transform:'translateY(0)'}],{duration:100});
      if(character === '\n') this.carriage();
    }
    check(row, nextTask = false) {
      if(nextTask) this.animate(row,[{transform:'translateY(8px)',opacity:.4},{transform:'translateY(0)',opacity:1}],{duration:220,easing:'steps(5, end)'});
      else if(row?.getAttribute('aria-checked') === 'true') this.animate(row.querySelector('.box path'),[{strokeDashoffset:14},{strokeDashoffset:0}],{duration:220});
      this.strike(' ');
    }
    finish() {
      // Lift the finished sheet, then let it settle where it remains readable.
      this.animate(this.document.querySelector('#paper'),[{transform:'translateY(0) rotate(0)'},{transform:'translateY(-26px) rotate(-.6deg)',offset:.65},{transform:'translateY(-22px) rotate(.2deg)',offset:.8},{transform:'translateY(0) rotate(0)'}],{duration:850,easing:'ease-in-out'});
      this.roller();
    }
    destroy() {
      this.cancel();
      this.preference.removeEventListener('change',this.onPreference);
      this.document.removeEventListener('visibilitychange',this.onVisibility);
    }
  }
  if(typeof module !== 'undefined' && module.exports) module.exports = BrassMotion;
  else root.BrassMotion = BrassMotion;
})(globalThis);
