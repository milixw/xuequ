'use strict';

// 英语朗读：优先用设备自带的英文语音；没有英文语音时用有道在线读音；离线又没有英文语音时不可用。
// 单词模块、语法和语音小节共用。

(function (root) {
  function synth() {
    return root.speechSynthesis && typeof root.SpeechSynthesisUtterance === 'function' ? root.speechSynthesis : null;
  }

  function englishVoice() {
    const s = synth();
    if (!s) return null;
    const voices = s.getVoices() || [];
    return voices.find(v => /^en[-_]US/i.test(v.lang)) || voices.find(v => /^en/i.test(v.lang)) || null;
  }

  function online() {
    return !root.navigator || root.navigator.onLine !== false;
  }

  function available() {
    return !!englishVoice() || online();
  }

  let audio = null;
  // 返回 true 表示已开始朗读
  function say(text) {
    const t = String(text || '').trim();
    if (!t) return false;
    const voice = englishVoice();
    if (voice) {
      const s = synth();
      s.cancel();
      const u = new root.SpeechSynthesisUtterance(t);
      u.voice = voice;
      u.lang = voice.lang;
      u.rate = 0.9;
      s.speak(u);
      return true;
    }
    if (!online() || typeof root.Audio !== 'function') return false;
    try {
      if (audio) audio.pause();
      audio = new root.Audio('https://dict.youdao.com/dictvoice?audio=' + encodeURIComponent(t) + '&type=2');
      const played = audio.play();
      if (played && played.catch) played.catch(() => {});
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
