var fs = require("fs");

SupCore.system.api.registerPlugin("typescript", "FTWEEN", {
  code: "declare var FTWEEN;",
  defs: fs.readFileSync(__dirname + "/../lib/ftween.d.ts", { encoding: "utf8" })
});

SupCore.system.api.registerPlugin("typescript", "fTween", {
  code: fs.readFileSync(__dirname + "/fTween.ts", { encoding: "utf8" }).replace("<reference path=", "<_reference path="),
  defs: fs.readFileSync(__dirname + "/fTween.d.ts", { encoding: "utf8" })
});
