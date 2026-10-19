(function(root) {
  // Finite visual effects only: saved content and input never wait for animation.
  class BrassMotion {
    constructor(document, preference) {
      this.document = document;
      this.preference = preference;
      this.effects = new Map();
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
    cancel() { for(const effect of this.effects.values()) effect.cancel(); this.effects.clear(); }
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
      this.animate(this.document.querySelector('.type-guide'),[{transform:'translateY(0)'},{transform:'translateY(-4px)'},{transform:'translateY(0)'},{transform:'translateY(-4px)'},{transform:'translateY(0)'}],{duration:300,delay:90});
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
      const cap = key === ' ' ? this.document.querySelector('#keys .space') : [...this.document.querySelectorAll('#keys .key')].find(el => el.textContent === key);
      this.animate(cap,[{transform:'translateY(0)'},{transform:'translateY(3px)',offset:.3},{transform:'translateY(0)'}],{duration:120});
      this.animate(this.document.querySelector('.type-guide'),[{transform:'translateY(0)'},{transform:'translateY(-4px)',offset:.35},{transform:'translateY(0)'}],{duration:110});
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
