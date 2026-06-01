(function() {
  if (window.__NEKOBOT_MOBILE_OGG_AUDIO_PATCH__) return;
  window.__NEKOBOT_MOBILE_OGG_AUDIO_PATCH__ = true;

  var waitForAudioManager = setInterval(function() {
    if (!window.AudioManager || !window.WebAudio || !window.Utils) return;
    if (typeof AudioManager.audioFileExt !== "function") return;
    if (typeof WebAudio.canPlayOgg !== "function") return;
    if (typeof Utils.isMobileDevice !== "function") return;

    clearInterval(waitForAudioManager);

    var originalAudioFileExt = AudioManager.audioFileExt;
    AudioManager.audioFileExt = function() {
      try {
        if (Utils.isMobileDevice() && WebAudio.canPlayOgg()) {
          return ".ogg";
        }
      } catch (error) {
        console.warn("[Nekobot Audio Patch] Falling back to original extension:", error.message);
      }

      return originalAudioFileExt.apply(this, arguments);
    };

    console.log("[Nekobot Audio Patch] Mobile OGG audio extension patch applied");
  }, 100);

  setTimeout(function() {
    clearInterval(waitForAudioManager);
  }, 10000);
})();
