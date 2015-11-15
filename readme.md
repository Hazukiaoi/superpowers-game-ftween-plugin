# Superpowers fTween plugin

[![Build Status](https://travis-ci.org/florentpoujol/superpowers-ftween-plugin.svg?branch=travis)](https://travis-ci.org/florentpoujol/superpowers-ftween-plugin)

This plugin for the `Sup Game` system for [Superpowers, the extensible HTML5 2D+3D game engine](http://sparklinlabs.com), exposes the `fTween` and `SUPTWEEN` modules to the runtime.

`SUPTWEEN` is the [sup-tween.js library](https://github.com/florentpoujol/sup-tween.js), a fork of the popular `tween.js` library.  
`fTween` is a nice wrapper (with mostly the `fTween.Tween` class) around it to make things a lot easier to use in your game code.

Just so that you don't get confused, be aware that the `tweenjs` plugin (by SparklinLabs, Superpowers' devs) exposes the `TWEEN` module (the original tween.js) and the `Tween` actor component.


## Documentation

[http://florentpoujol.github.io/superpowers-ftween-plugin](http://florentpoujol.github.io/superpowers-ftween-plugin)

You can also access it offline in Superpowers' client with the [docs browser](https://github.com/florentpoujol/superpowers-docs-browser-plugin) plugin, or find it directly in the plugin's `public/docs` folder.


## Installation

[Download the latest release](https://github.com/florentpoujol/superpowers-ftween-plugin/releases), unzip it, rename the folder to `ftween`, move it inside `app/systems/supGame/plugins/florentpoujol/` then restart your server.

__Advanced:__

Get it via `npm`:
		
		cd app/systems/supGame/plugins
    npm install sup-ftween-plugin

The name of the vendors or plugins in the `app/systems/supGame/plugins/` folder don't matter.  
So you can leave the plugin path as `node_modules/sup-ftween-plugin`.
