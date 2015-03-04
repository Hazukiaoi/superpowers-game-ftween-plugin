// this script takes the "superpowers/node_modules/[plugin package name]/public/" folder
// and copy it in "superpowers/plugins/[autor name]/[plugin name]/"

var superpowersRelPath = process.argv[2] || ".."; // suppose the plugin repo is installed in "superpowers/node_modules"

var fsextra = require("fs-extra");
fsextra.stat( superpowersRelPath+"/plugins", function(err, stats) {
  if ( err || (stats !== undefined && stats.isDirectory() === false) ) {
    console.error( "Superpowers' plugins directory not found!", err);
    return;
  }

  var packageName = require("./package.json").name;
  var regex = /^superpowers-([^-]+)-(.+)-plugin$/i; // dashes are forbidden in author names
  var result = regex.exec( packageName );
  var destination = superpowersRelPath+"/plugins/"+result[1]+"/"+result[2]+"/public";

  fsextra.mkdirs( destination, function(err) {
    if (err) return console.error(err);

    fsextra.copy( "./public", destination, function (err) {
      if (err) return console.error(err);
      console.log("Plugin '"+result[2]+"' copied in '"+destination+"'");
    } );
  } );
});
