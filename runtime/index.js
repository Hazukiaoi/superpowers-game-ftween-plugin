window.FTWEEN = require("../lib/ftween.js");

SupEngine.registerEarlyUpdateFunction("fTween", function() {
  window.FTWEEN.update();
});
