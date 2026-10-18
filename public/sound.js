// Synthesized mechanical impacts: hammer, key release, and carriage bell.
// No recordings, downloads, or network access required.
class TypewriterSound {
  constructor(context = null) { this.context = context; this.muted = false; }
  init() {
    this.context ||= new AudioContext();
    if (!this.master) {
      const ctx = this.context;
      this.master = ctx.createGain(); this.master.gain.value = this.muted ? 0 : .65;
      this.master.connect(ctx.destination);
      this.noise = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * .2), ctx.sampleRate);
      const samples = this.noise.getChannelData(0);
      for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1;
    }
    if (this.context.state === 'suspended' && !this.context.startRendering) this.context.resume().catch(() => {});
  }
  setMuted(muted) { this.muted = muted; if (this.master) this.master.gain.setValueAtTime(muted ? 0 : .65, this.context.currentTime); }
  impact(at, duration, volume, frequency) {
    const ctx = this.context, source = ctx.createBufferSource(), filter = ctx.createBiquadFilter(), gain = ctx.createGain();
    source.buffer = this.noise; filter.type = 'bandpass'; filter.frequency.value = frequency; filter.Q.value = .7;
    gain.gain.setValueAtTime(volume, at); gain.gain.exponentialRampToValueAtTime(.0001, at + duration);
    source.connect(filter); filter.connect(gain); gain.connect(this.master);
    source.start(at); source.stop(at + duration);
    source.onended = () => { source.disconnect(); filter.disconnect(); gain.disconnect(); };
  }
  ring(at, frequency, duration, volume) {
    const ctx = this.context, source = ctx.createOscillator(), gain = ctx.createGain();
    source.type = 'sine'; source.frequency.value = frequency;
    gain.gain.setValueAtTime(volume, at); gain.gain.exponentialRampToValueAtTime(.0001, at + duration);
    source.connect(gain); gain.connect(this.master); source.start(at); source.stop(at + duration);
    source.onended = () => { source.disconnect(); gain.disconnect(); };
  }
  play(kind = 'key') {
    if (this.muted) return;
    try {
      this.init(); const at = this.context.currentTime;
      this.impact(at, .022, .65, 1800 + Math.random() * 700); // metal hammer
      this.ring(at, 140 + Math.random() * 45, .045, .18); // wooden case thud
      this.impact(at + .028, .04, .25, 850); // key returning
      if (kind === 'return') {
        this.impact(at + .06, .18, .25, 1100); // carriage slide
        this.ring(at + .03, 2400, .65, .09);
        this.ring(at + .03, 3770, .3, .025);
      }
    } catch { /* Audio device failures must not interrupt task editing. */ }
  }
}
window.TypewriterSound = TypewriterSound;
class ClockSound extends TypewriterSound {
  constructor(context = null) {
    super(context); this.tickMuted = false; this.bellMuted = false; this.wantsTicking = false;
  }
  init() {
    super.init();
    if (!this.tickGate) {
      this.tickGate = this.context.createGain(); this.bellGate = this.context.createGain();
      this.tickGate.gain.value = this.tickMuted ? 0 : 1; this.bellGate.gain.value = this.bellMuted ? 0 : 1;
      this.tickGate.connect(this.master); this.bellGate.connect(this.master);
    }
  }
  async loadSamples(recordings) {
    this.init();
    const decode = bytes => this.context.decodeAudioData(Uint8Array.from(bytes).buffer);
    [this.tickingBuffer,this.bellBuffer] = await Promise.all([decode(recordings.ticking),decode(recordings.bell)]);
    // Space two recorded escapement strikes one second apart, retaining their
    // original pitch and attack rather than slowing the recording's pitch.
    const original = this.tickingBuffer, rate = original.sampleRate;
    const scan = original.getChannelData(0), end = Math.min(scan.length,Math.floor(rate*4));
    let peak = .001; for(let i=Math.floor(rate*.2);i<end;i++) peak=Math.max(peak,Math.abs(scan[i]));
    const strikes = [];
    for(let i=Math.floor(rate*.2);i<end && strikes.length<2;i++) {
      if(Math.abs(scan[i]) < peak*.3) continue;
      strikes.push(Math.max(0,i-Math.floor(rate*.006)));
      i += Math.floor(rate*.16);
    }
    if (!strikes.length) strikes.push(0);
    if (strikes.length === 1) strikes.push(strikes[0]);
    this.slowTickingBuffer = this.context.createBuffer(original.numberOfChannels,Math.round(rate*2),rate);
    const length = Math.round(rate*.1), fade = Math.round(rate*.012);
    for(let channel=0;channel<original.numberOfChannels;channel++) {
      const input = original.getChannelData(channel), output = this.slowTickingBuffer.getChannelData(channel);
      strikes.forEach((start,index) => {
        for(let i=0;i<length && start+i<input.length;i++) {
          const envelope = Math.min(1,i/(rate*.0015),(length-1-i)/fade);
          output[index*rate+i] = input[start+i]*Math.max(0,envelope);
        }
      });
    }
    const level = (buffer,peak) => {
      let maximum = .001;
      for (let channel=0;channel<buffer.numberOfChannels;channel++) for(const sample of buffer.getChannelData(channel)) maximum = Math.max(maximum,Math.abs(sample));
      return peak/maximum;
    };
    this.tickingLevel = level(this.tickingBuffer,.13); this.bellLevel = level(this.bellBuffer,.52);
    this.samplesReady = true; this.setTicking(this.wantsTicking);
  }
  setMuted(muted) {
    super.setMuted(muted);
    if (muted) this.stopAlarm();
    this.setTicking(this.wantsTicking);
  }
  setChannelMuted(channel,muted) {
    if (!['tick','bell'].includes(channel)) throw Error('Invalid clock audio channel.');
    this[channel === 'tick' ? 'tickMuted' : 'bellMuted'] = muted;
    const gate = channel === 'tick' ? this.tickGate : this.bellGate;
    if (gate) gate.gain.setValueAtTime(muted ? 0 : 1,this.context.currentTime);
    if (channel === 'tick') this.setTicking(this.wantsTicking);
    else if (muted) this.stopAlarm();
  }
  setTicking(active) {
    this.wantsTicking = active;
    if (!active || this.muted || this.tickMuted) { this.stopTicking(); return; }
    if (!this.samplesReady || this.tickingSource) return;
    this.init();
    const source = this.context.createBufferSource(), gain = this.context.createGain();
    source.buffer = this.slowTickingBuffer; source.loop = true;
    gain.gain.setValueAtTime(0,this.context.currentTime); gain.gain.linearRampToValueAtTime(this.tickingLevel,this.context.currentTime+.015);
    source.connect(gain); gain.connect(this.tickGate); source.start();
    this.tickingSource = source; this.tickingVoiceGain = gain;
    source.onended = () => { source.disconnect(); gain.disconnect(); if(this.tickingSource === source) this.tickingSource = null; };
  }
  stopTicking() {
    if (!this.tickingSource) return;
    const source = this.tickingSource; this.tickingSource = null;
    const gain = this.tickingVoiceGain.gain, now = this.context.currentTime;
    gain.cancelScheduledValues(now); gain.setValueAtTime(gain.value,now); gain.linearRampToValueAtTime(0,now+.015);
    source.stop(now+.02);
  }
  stopAlarm() {
    if (!this.alarmSource) return;
    const source = this.alarmSource; this.alarmSource = null; source.stop();
  }
  tick(tock = false, delay = 0) {
    if (this.muted || this.tickMuted || this.samplesReady) return;
    try {
      this.init(); const at = this.context.currentTime + Math.max(0,delay);
      this.impact(at,.012,.14,tock ? 1700 : 3000);
      this.ring(at,tock ? 290 : 410,.035,.035);
      this.impact(at+.014,.015,.045,tock ? 2600 : 3800);
    } catch { /* A silent device must not interrupt timing. */ }
  }
  alarm() {
    if (this.muted || this.bellMuted) return;
    try {
      this.init(); const at = this.context.currentTime;
      if (this.samplesReady) {
        this.stopAlarm();
        const source = this.context.createBufferSource(), gain = this.context.createGain();
        source.buffer = this.bellBuffer; gain.gain.value = this.bellLevel;
        source.connect(gain); gain.connect(this.bellGate); source.start(); this.alarmSource = source;
        source.onended = () => { source.disconnect(); gain.disconnect(); if(this.alarmSource === source) this.alarmSource = null; };
        return;
      }
      for (let i=0;i<10;i++) {
        const strike = at+i*.16, fundamental = i%2 ? 1740 : 1280;
        this.impact(strike,.012,.18,4200);
        this.ring(strike,fundamental,.72,.075);
        this.ring(strike,fundamental*2.76,.35,.025);
        this.ring(strike,fundamental*4.07,.16,.01);
      }
    } catch { /* Preserve the timer even if audio is unavailable. */ }
  }
}
window.ClockSound = ClockSound;
