SupTWEEN = require("../lib/sup-tween.js");

SupEngine.addEarlyUpdatePlugin "fTween", -> 
  console.log("fTween engine early update");
  SupTWEEN.update() 
  return
