'use strict';

// 英语朗读：优先用设备自带的英文语音；没有英文语音时用在线读音（单词用有道，句子用百度翻译：
// 有道 dictvoice 只收录单词和常见短语，整句返回 500）；离线又没有英文语音时不可用。
// 百度读音带 Referer 会被拦截，所以 index.html 设了 <meta name="referrer" content="no-referrer">。
// 单词模块、语法和语音小节共用。

(function (root) {
  function synth() {
    return root.speechSynthesis && typeof root.SpeechSynthesisUtterance === 'function' ? root.speechSynthesis : null;
  }

  function englishVoice() {
    const s = synth();
    if (!s) return null;
    // 本机语音优先：Chrome 的 Google 联网语音在国内连不上，会一声不响
    const voices = (s.getVoices() || []).filter(v => /^en/i.test(v.lang));
    const local = voices.filter(v => v.localService !== false);
    for (const list of [local, voices]) {
      const v = list.find(x => /^en[-_]US/i.test(x.lang)) || list[0];
      if (v) return v;
    }
    return null;
  }

  function online() {
    return !root.navigator || root.navigator.onLine !== false;
  }

  function available() {
    return !!englishVoice() || online();
  }

  // rate 是设备语音的倍速；百度 spd 5 为正常语速，小于 1 倍时用偏慢的 3
  function onlineUrls(t, rate) {
    const baidu = 'https://fanyi.baidu.com/gettts?lan=en&spd=' + (rate < 1 ? 3 : 5) + '&source=web&text=' + encodeURIComponent(t);
    if (/\s/.test(t)) return [baidu];
    return ['https://dict.youdao.com/dictvoice?audio=' + encodeURIComponent(t) + '&type=2', baidu];
  }

  // 每次 say / stop 都换一个编号，被打断的旧朗读迟到的回调一律丢掉
  let current = 0;
  let audio = null;
  let utterance = null; // 留住引用：Chrome 会回收没人引用的朗读，导致 onend 不触发

  // 在线读音：前一个地址失败就换下一个，都失败时调用 onFail
  function playOnline(urls, id, opts) {
    if (audio) audio.pause();
    const a = audio = new root.Audio(urls[0]);
    let failed = false;
    // error 事件和 play() 的拒绝可能都会来，只处理一次
    const next = () => {
      if (failed || id !== current) return;
      failed = true;
      if (urls.length > 1) playOnline(urls.slice(1), id, opts);
      else if (opts.onFail) opts.onFail();
    };
    a.addEventListener('error', next);
    a.addEventListener('ended', () => { if (id === current && opts.onEnd) opts.onEnd(); });
    const played = a.play();
    if (played && played.catch) played.catch(err => { if (!err || err.name !== 'NotAllowedError') next(); });
  }

  // 返回 true 表示已开始朗读。opts 可选：
  //   rate   设备语音倍速，默认 0.9（单词、听力偏慢一点）
  //   onEnd  读完时调用
  //   onFail 没能读出来时调用
  function say(text, opts) {
    const o = opts || {};
    const t = String(text || '').trim();
    if (!t) return false;
    const id = ++current;
    const rate = o.rate || 0.9;
    const voice = englishVoice();
    if (voice) {
      const s = synth();
      if (s.speaking || s.pending) s.cancel();
      if (s.paused) s.resume();
      const u = utterance = new root.SpeechSynthesisUtterance(t);
      u.voice = voice;
      u.lang = voice.lang;
      u.rate = rate;
      u.onend = () => { if (id === current && o.onEnd) o.onEnd(); };
      u.onerror = e => {
        if (id !== current || (e && (e.error === 'interrupted' || e.error === 'canceled'))) return;
        if (o.onFail) o.onFail();
      };
      s.speak(u);
      return true;
    }
    if (!online() || typeof root.Audio !== 'function') return false;
    try {
      playOnline(onlineUrls(t, rate), id, o);
      return true;
    } catch {
      return false;
    }
  }

  // 停止正在进行的朗读，之前 say 的回调都不会再触发
  function stop() {
    current++;
    const s = synth();
    if (s && (s.speaking || s.pending)) s.cancel();
    if (audio) audio.pause();
    utterance = null;
  }

  // 部分浏览器的语音列表是异步加载的，加载完再刷新一次按钮状态
  function onReady(fn) {
    const s = synth();
    if (s && typeof s.addEventListener === 'function') s.addEventListener('voiceschanged', fn, { once: true });
  }

  const Speech = { available, say, stop, onReady, englishVoice };
  if (typeof module !== 'undefined') module.exports = Speech;
  else root.Speech = Speech;
})(typeof globalThis !== 'undefined' ? globalThis : this);
