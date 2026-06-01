# RPG Maker MZ Mobile Activity Patch

File:

```text
android/app/src/main/assets/patches/nekobot-rpgmaker-mz-mobile-patch.js
```

This patch applies the requested RPG Maker MZ behavior on mobile user agents:

```js
if (
  navigator.userAgent.toLowerCase().match('iphone') ||
  navigator.userAgent.toLowerCase().match('android') ||
  navigator.userAgent.toLowerCase().match('ipad')
) {
  const alias = SceneManager.isGameActive;
  SceneManager.isGameActive = function () {
    alias.apply(this, arguments);
    return true;
  };
}
```

The repository version waits until `SceneManager.isGameActive` exists, applies only once, and logs when it activates.
