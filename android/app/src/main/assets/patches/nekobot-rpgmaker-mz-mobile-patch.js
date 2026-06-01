(function() {
  if (window.__NEKOBOT_RPGMAKER_MZ_MOBILE_PATCH__) return;
  window.__NEKOBOT_RPGMAKER_MZ_MOBILE_PATCH__ = true;

  var waitForSceneManager = setInterval(function() {
    if (!window.SceneManager || !SceneManager.isGameActive) return;
    clearInterval(waitForSceneManager);

    var userAgent = navigator.userAgent.toLowerCase();
    var isMobile = (
      userAgent.indexOf("iphone") >= 0 ||
      userAgent.indexOf("android") >= 0 ||
      userAgent.indexOf("ipad") >= 0
    );

    if (!isMobile) return;

    var alias = SceneManager.isGameActive;
    SceneManager.isGameActive = function() {
      alias.apply(this, arguments);
      return true;
    };

    console.log("[Nekobot MZ Patch] SceneManager.isGameActive forced active on mobile");
  }, 100);

  setTimeout(function() {
    clearInterval(waitForSceneManager);
  }, 10000);
})();
