if (window) window.FTWEEN = require("../lib/ftween.js");

SupEngine.registerEarlyUpdateFunction("fTween", function() {
  if (window) window.FTWEEN.update();
});
