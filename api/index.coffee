if window? then window.FTWEEN = require( '../lib/ftween.js' )

fs = require 'fs'

SupAPI.registerPlugin 'typescript', 'FTWEEN', {
  code: "declare var FTWEEN;"
  defs: fs.readFileSync(__dirname + '/../lib/ftween.d.ts', encoding: 'utf8')
}

SupAPI.registerPlugin 'typescript', 'fTween', {
  code: fs.readFileSync(__dirname + '/fTween.ts', encoding: 'utf8').replace("reference path", "");
  defs: fs.readFileSync(__dirname + '/fTween.d.ts', encoding: 'utf8')
}
