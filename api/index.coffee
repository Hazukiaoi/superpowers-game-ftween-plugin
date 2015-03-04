if window? 
  window.SPTWEEN = require( '../lib/sup-tween.js' )
  window.EventEmitter3 = require( '../lib/EventEmitter3.js' )

fs = require 'fs'

SupAPI.addPlugin 'typescript', 'SPTWEEN', {
  code: "declare var SPTWEEN;"
  defs: fs.readFileSync(__dirname + '/../lib/sup-tween.js.d.ts', encoding: 'utf8')
}

SupAPI.addPlugin 'typescript', 'fTween', {
  code: fs.readFileSync(__dirname + '/fTween.ts', encoding: 'utf8').replace("reference path", "");
  defs: fs.readFileSync(__dirname + '/fTween.d.ts', encoding: 'utf8')
}
