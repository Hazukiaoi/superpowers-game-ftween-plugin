# Superpowers fTween plugin

[![Build Status](https://travis-ci.org/florentpoujol/superpowers-ftween-plugin.svg?branch=travis)](https://travis-ci.org/florentpoujol/superpowers-ftween-plugin)

This plugin for [Superpowers, the extensible HTML5 2D+3D game engine](http://sparklinlabs.com), exposes the `fTween` and `SUPTWEEN` modules to the runtime.

`SUPTWEEN` is the [sup-tween.js library](https://github.com/florentpoujol/sup-tween.js), a fork of the popular `tween.js` library.  
`fTween` is a nice wrapper (with mostly the `fTween.Tween` class) around it to make things a lot easier to use in your game code.

Just so that you don't get confused, be aware that the `tweenjs` plugin (by SparklinLabs, Superpowers' devs) exposes the `TWEEN` module (the original tween.js) and the `Tween` actor component.

## Documentation

[http://florentpoujol.github.io/superpowers-ftween-plugin](http://florentpoujol.github.io/superpowers-ftween-plugin)

## Installation

- [Get the last release from GitHub](https://github.com/florentpoujol/superpowers-ftween-plugin/releases/tag/v0.1.0),
- unzip and rename the folder if you want (its name doesn't matter),
- move the folder inside `app/plugins/florentpoujol/`,
- restart your server.

If you know how to do it, you can also `npm install` it:

    npm install sup-ftween-plugin

Be sure to move the `sup-ftween-plugin` folder from the `node_modules/` where it has been created to `app/plugins/florentpoujol/`.
