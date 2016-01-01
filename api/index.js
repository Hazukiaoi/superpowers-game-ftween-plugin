var fs = require("fs");

SupCore.system.registerPlugin("typescriptAPI", "FTWEEN", {
  code: "declare var FTWEEN;",
  defs: fs.readFileSync(__dirname + "/../lib/ftween.d.ts", { encoding: "utf8" })
});

SupCore.system.registerPlugin("typescriptAPI", "fTween", {
  code: fs.readFileSync(__dirname + "/fTween.ts", { encoding: "utf8" }).replace("<reference path=", "<_reference path="),
  defs: fs.readFileSync(__dirname + "/fTween.d.ts", { encoding: "utf8" })
});
