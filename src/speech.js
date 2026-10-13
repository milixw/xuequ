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

  function onlineUrls(t) {
    const baidu = 'https://fanyi.baidu.com/gettts?lan=en&spd=3&source=web&text=' + encodeURIComponent(t);
    if (/\s/.test(t)) return [baidu];
    return ['https://dict.youdao.com/dictvoice?audio=' + encodeURIComponent(t) + '&type=2', baidu];
  }

  let audio = null;
  // 在线读音：前一个地址失败就换下一个，都失败时调用 onFail
  function playOnline(urls, onFail) {
    if (audio) audio.pause();
    const a = audio = new root.Audio(urls[0]);
    let failed = false;
    // error 事件和 play() 的拒绝可能都会来，只处理一次
    const next = () => {
      if (failed || audio !== a) return;
      failed = true;
      if (urls.length > 1) playOnline(urls.slice(1), onFail);
      else if (onFail) onFail();
    };
    a.addEventListener('error', next);
    const played = a.play();
    if (played && played.catch) played.catch(err => { if (!err || err.name !== 'NotAllowedError') next(); });
  }

  // 返回 true 表示已开始朗读；onFail 可选，在线读音最终没放出来时调用
  function say(text, onFail) {
    const t = String(text || '').trim();
    if (!t) return false;
    const voice = englishVoice();
    if (voice) {
      const s = synth();
      if (s.speaking || s.pending) s.cancel();
      if (s.paused) s.resume();
      const u = new root.SpeechSynthesisUtterance(t);
      u.voice = voice;
      u.lang = voice.lang;
      u.rate = 0.9;
      s.speak(u);
      return true;
    }
    if (!online() || typeof root.Audio !== 'function') return false;
    try {
      playOnline(onlineUrls(t), onFail);
      return true;
    } catch {
      return false;
    }
  }

  // 部分浏览器的语音列表是异步加载的，加载完再刷新一次按钮状态
  function onReady(fn) {
    const s = synth();
    if (s && typeof s.addEventListener === 'function') s.addEventListener('voiceschanged', fn, { once: true });
  }

  const Speech = { available, say, onReady, englishVoice };
  if (typeof module !== 'undefined') module.exports = Speech;
  else root.Speech = Speech;
})(typeof globalThis !== 'undefined' ? globalThis : this);
