(function() {
  if (window.__NEKOBOT_PIXI_TEXTURE_PATCH__) return;
  window.__NEKOBOT_PIXI_TEXTURE_PATCH__ = true;

  var MAX_TEXTURE_SIZE = 2048;
  var waitForPixi = setInterval(function() {
    if (!window.PIXI || !PIXI.Texture || !PIXI.BaseTexture || !PIXI.Rectangle) return;
    clearInterval(waitForPixi);

    var OriginalTexture = PIXI.Texture;

    function PatchedTexture(baseTexture, frame, rotate, trim, orig) {
      try {
        if (baseTexture && frame && baseTexture.width && baseTexture.height) {
          var source = baseTexture.source ||
            (baseTexture.resource && baseTexture.resource.source);
          var overflow =
            frame.width > MAX_TEXTURE_SIZE ||
            frame.height > MAX_TEXTURE_SIZE ||
            frame.x + frame.width > baseTexture.width ||
            frame.y + frame.height > baseTexture.height;

          if (overflow && source) {
            console.warn(
              "[Nekobot Pixi Patch] Adjusting texture frame",
              "base=" + baseTexture.width + "x" + baseTexture.height,
              "frame=" + [frame.x, frame.y, frame.width, frame.height].join(",")
            );

            var scale = Math.max(
              baseTexture.width / MAX_TEXTURE_SIZE,
              baseTexture.height / MAX_TEXTURE_SIZE,
              1
            );
            var canvas = document.createElement("canvas");
            canvas.width = Math.max(1, Math.floor(baseTexture.width / scale));
            canvas.height = Math.max(1, Math.floor(baseTexture.height / scale));

            canvas.getContext("2d").drawImage(
              source,
              0,
              0,
              baseTexture.width,
              baseTexture.height,
              0,
              0,
              canvas.width,
              canvas.height
            );

            var safeBase = new PIXI.BaseTexture(canvas);
            var safeFrame = new PIXI.Rectangle(
              Math.floor(frame.x / scale),
              Math.floor(frame.y / scale),
              Math.floor(frame.width / scale),
              Math.floor(frame.height / scale)
            );

            return new OriginalTexture(safeBase, safeFrame, rotate, trim, orig);
          }
        }
      } catch (error) {
        console.warn("[Nekobot Pixi Patch] Falling back to original texture:", error.message);
      }

      return new OriginalTexture(baseTexture, frame, rotate, trim, orig);
    }

    Object.getOwnPropertyNames(OriginalTexture).forEach(function(key) {
      if (key === "prototype" || key === "length" || key === "name") return;
      try {
        Object.defineProperty(
          PatchedTexture,
          key,
          Object.getOwnPropertyDescriptor(OriginalTexture, key)
        );
      } catch (error) {
        PatchedTexture[key] = OriginalTexture[key];
      }
    });

    PatchedTexture.prototype = OriginalTexture.prototype;
    PatchedTexture.prototype.constructor = OriginalTexture;

    PIXI.Texture = PatchedTexture;
    console.log("[Nekobot Pixi Patch] PIXI.Texture patch applied");
  }, 100);

  setTimeout(function() {
    clearInterval(waitForPixi);
  }, 10000);
})();
