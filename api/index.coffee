if window? then window.SUPTWEEN = require( '../lib/sup-tween.js' )

fs = require 'fs'

SupAPI.addPlugin 'typescript', 'SUPTWEEN', {
  code: "declare var SUPTWEEN;"
  defs: fs.readFileSync(__dirname + '/../lib/sup-tween.js.d.ts', encoding: 'utf8')
}

SupAPI.addPlugin 'typescript', 'fTween', {
  code: fs.readFileSync(__dirname + '/fTween.ts', encoding: 'utf8').replace("reference path", "");
  defs: fs.readFileSync(__dirname + '/fTween.d.ts', encoding: 'utf8')
}
