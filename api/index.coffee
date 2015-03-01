if window? then window.SPTWEEN = require( 'superpowers-tween.js' )

fs = require 'fs'
SupAPI.addPlugin 'typescript', 'fTween', {
  code: fs.readFileSync(__dirname + '/fTween.d.ts', encoding: 'utf8')
  defs: fs.readFileSync(__dirname + '/fTween.d.ts', encoding: 'utf8')
}
