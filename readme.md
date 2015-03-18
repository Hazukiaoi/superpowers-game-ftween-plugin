# Superpowers fTween plugin

[![Build Status](https://travis-ci.org/florentpoujol/superpowers-ftween-plugin.svg?branch=travis)](https://travis-ci.org/florentpoujol/superpowers-ftween-plugin)

This plugin for [Superpowers, the extensible HTML5 2D+3D game engine](http://sparklinlabs.com), exposes the `fTween` and `SUPTWEEN` modules to the runtime.

`SUPTWEEN` is the [sup-tween.js library](https://github.com/florentpoujol/sup-tween.js), a fork of the popular `tween.js` library.  
`fTween` is a nice wrapper (with mostly the `fTween.Tween` class) around it to make things a lot easier to use in your game code.

Just so that you don't get confused, be aware that the `tweenjs` plugin (by SparklinLabs, Superpowers' devs) exposes the `TWEEN` module (the original tween.js) and the `Tween` actor component.

## Documentation

[http://florentpoujol.github.io/superpowers-ftween-plugin](http://florentpoujol.github.io/superpowers-ftween-plugin)

## Installation

[Download the latest release](https://github.com/florentpoujol/superpowers-ftween-plugin/releases) then unzip it.

Rename the folder if you want then move it inside `app/plugins/florentpoujol/`.

Finally restart your server.

__Advanced:__

plugin is published as an npm package so you can get any version of it via `npm`:

    npm install sup-ftween-plugin

Note that the name of the vendors in the `app/plugins/` folder actually don't matter, it can be `node_modules`.
