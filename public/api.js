(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var fs;

if (typeof window !== "undefined" && window !== null) {
  window.SPTWEEN = require('../lib/sup-tween.js');
  window.EventEmitter3 = require('../lib/EventEmitter3.js');
}



SupAPI.addPlugin('typescript', 'SPTWEEN', {
  code: "declare var SPTWEEN;",
  defs: "declare module SPTWEEN {\r\n  var REVISION: string;\r\n  function getAll(): Tween[];\r\n  function removeAll(): void;\r\n  function add(tween:Tween): void;\r\n  function remove(tween:Tween): void;\r\n  function update(time?:number): boolean;\r\n\r\n  interface TweenCallback {\r\n    (): void;\r\n  }\r\n  interface TweenUpdateCallback {\r\n    (progression:number): void;\r\n  }\r\n\r\n  interface EasingFunction {\r\n    (k:number): number;\r\n  }\r\n  interface InterpolationFunction {\r\n    (v:number[], k:number): number;\r\n  }\r\n  \r\n  class Tween {\r\n    constructor(object?:Object);\r\n    from(object:Object): Tween;\r\n    to(properties:Object, duration?:number): Tween;\r\n    duration(duration:number): Tween;\r\n    isRelative(isRelative:boolean): Tween;\r\n    start(time?:number): Tween;\r\n    stop(): Tween;\r\n    pause(): Tween;\r\n    resume(): Tween;\r\n    destroy(recurse?:boolean): void;\r\n    stopChainedTweens();\r\n    getChainedTweens(): Tween[];\r\n    removeChainedTweens(tween?: Tween): number;\r\n    delay(amount:number): Tween;\r\n    repeat(times:number): Tween;\r\n    yoyo(enable:boolean): Tween;\r\n    easing(easing:EasingFunction): Tween;\r\n    interpolation(interpolation:InterpolationFunction): Tween;\r\n    chain(...tweens:Tween[]): Tween;\r\n    onStart(callback?:TweenCallback): Tween;\r\n    onUpdate(callback?:TweenUpdateCallback): Tween;\r\n    onPause(callback?:TweenCallback): Tween;\r\n    onResume(callback?:TweenCallback): Tween;\r\n    onComplete(callback?:TweenCallback): Tween;\r\n    onStop(callback?:TweenCallback): Tween;\r\n    update(time:number): boolean;\r\n  }\r\n\r\n  var Easing: TweenEasing;\r\n  var Interpolation: TweenInterpolation;\r\n\r\n  interface TweenEasing {\r\n    Linear: {\r\n      None(k:number): number;\r\n    };\r\n    Quadratic: {\r\n      In(k:number): number;\r\n      Out(k:number): number;\r\n      InOut(k:number): number;\r\n    };\r\n    Cubic: {\r\n      In(k:number): number;\r\n      Out(k:number): number;\r\n      InOut(k:number): number;\r\n    };\r\n    Quartic: {\r\n      In(k:number): number;\r\n      Out(k:number): number;\r\n      InOut(k:number): number;\r\n    };\r\n    Quintic: {\r\n      In(k:number): number;\r\n      Out(k:number): number;\r\n      InOut(k:number): number;\r\n    };\r\n    Sinusoidal: {\r\n      In(k:number): number;\r\n      Out(k:number): number;\r\n      InOut(k:number): number;\r\n    };\r\n    Exponential: {\r\n      In(k:number): number;\r\n      Out(k:number): number;\r\n      InOut(k:number): number;\r\n    };\r\n    Circular: {\r\n      In(k:number): number;\r\n      Out(k:number): number;\r\n      InOut(k:number): number;\r\n    };\r\n    Elastic: {\r\n      In(k:number): number;\r\n      Out(k:number): number;\r\n      InOut(k:number): number;\r\n    };\r\n    Back: {\r\n      In(k:number): number;\r\n      Out(k:number): number;\r\n      InOut(k:number): number;\r\n    };\r\n    Bounce: {\r\n      In(k:number): number;\r\n      Out(k:number): number;\r\n      InOut(k:number): number;\r\n    };\r\n  }\r\n\r\n  interface TweenInterpolation {\r\n    Linear(v:number[], k:number): number;\r\n    Bezier(v:number[], k:number): number;\r\n    CatmullRom(v:number[], k:number): number;\r\n\r\n    Utils: {\r\n      Linear(p0:number, p1:number, t:number): number;\r\n      Bernstein(n:number, i:number): number;\r\n      Factorial(n): number;\r\n    };\r\n  }\r\n}\r\n"
});

SupAPI.addPlugin('typescript', 'fTween', {
  code: "/// <reference path=\"../lib/sup-tween.js.d.ts\" />\r\n\r\ndeclare var EventEmitter3;\r\nvar eventNames = [ \"onStart\", \"onPause\", \"onResume\", \"onUpdate\", \"onComplete\", \"onStop\" ];\r\nvar shortEventNames = [ \"start\", \"pause\", \"resume\", \"update\", \"complete\", \"stop\" ];\r\n\r\nmodule fTween  {\r\n\r\n  /**\r\n  * To be called from your game as often as possible (on every update).\r\n  * Call `SPTWEEN.update()` once to run all tweens once.\r\n  * @param time The current timestamp in milliseconds.\r\n  */\r\n  function update( time?: number ) {\r\n    SPTWEEN.update();\r\n  }\r\n\r\n  /**\r\n  * The object containing the easing functions segregated into families (ie: `fTween.Easing.Cubic`) and variants (ie: `fTween.Easing.Cubic.In`).\r\n  */\r\n  var Easing = SPTWEEN.Easing;\r\n  \r\n  /**\r\n  * The object containing the interpolation functions (ie: `fTween.Interpolation.Cubic`).\r\n  */\r\n  var Interpolation = SPTWEEN.Interpolation;\r\n\r\n\r\n  export class Tween {\r\n    /**\r\n    * Returns an instance of `fTween.Tween`.\r\n    * @param from The object containing the start values.\r\n    * @param to The object containing the end values.\r\n    * @param duration The time in seconds to complete the tween.\r\n    * @param params An object containing parameters.\r\n    * @returns The tween instance.\r\n    */\r\n    constructor( from: Object, to: Object, duration: number, params?: Params );\r\n    constructor( to: Object, duration: number, params?: Params );\r\n    constructor( params?: fTween.Params );\r\n    \r\n    /**\r\n    * @param time The time in seconds to complete the timer. Setting the `time` property makes the `from`, `to` and `duration` being ignored.\r\n    * @param onComplete The listener for the `onComplete` event.\r\n    */\r\n    constructor( time: number, onComplete: Listener, params?: Params );\r\n\r\n    constructor( ...args: any[] ) {\r\n      var argsCount = args.length;\r\n      var types: string[] = [];\r\n      for ( var i=0; i<argsCount; i++ ) {\r\n        types[i] = typeof args[i];\r\n      }\r\n      var params: any = {};\r\n\r\n      if ( (argsCount === 3 || argsCount === 4) && types[0] === \"object\" && types[1] === \"object\" && types[2] === \"number\" ) {\r\n        params = args[3] || {};\r\n        params.from = args[0];\r\n        params.to = args[1];\r\n        params.duration = args[2];\r\n      }\r\n      else if ( (argsCount === 2 || argsCount === 3) && types[0] === \"object\" && types[1] === \"number\" ) {\r\n        params = args[2] || {};\r\n        params.to = args[0];\r\n        params.duration = args[1];\r\n      }\r\n      else if ( (argsCount === 2 || argsCount === 3) && types[0] === \"number\" && types[1] === \"function\" ) {\r\n        params = args[2] || {};\r\n        params.time = args[0];\r\n        params.onComplete = args[1];\r\n      }\r\n      else if ( argsCount === 1 && args[0] !== null && typeof args[0] === \"object\") {\r\n        params = args[0] || {};\r\n      }\r\n      else if (argsCount > 0) {\r\n        console.error( \"fTween.Tween(): Unknow constructor with \"+argsCount+\" arguments, see details below\" );\r\n        for (var i = 0; i < args.length; i++) {\r\n          console.log( \"argument #\"+i+\": type=\"+types[i]+\" value=\", args[i]);\r\n        }\r\n      }\r\n      \r\n      var start = params.start;\r\n      delete params.start;\r\n      if ( Object.keys( params ).length > 0 ) {\r\n        this.set( params );\r\n      }\r\n\r\n      if ( this._to !== undefined && this._duration > 0 &&\r\n        (start === undefined || start >= 0) ) {\r\n        this.start( start );\r\n      }\r\n    }\r\n\r\n    // --------------------------------------------------------------------------------\r\n    // methods\r\n\r\n    /**\r\n    * Sets several of the tweener's properties at once.\r\n    * @param params The list of parameters.\r\n    */\r\n    set( params: fTween.Params ) {\r\n      if ( this._isDestroyed === true ) {\r\n        console.error(\"fTween.Tween(): This tween instance has been destroyed. It can not be used anymore. Create a new instance.\");\r\n        return;\r\n      }\r\n\r\n      if ( params.from !== undefined ) {\r\n        this.from = params.from;\r\n        delete params.from;\r\n      }\r\n      if ( params.to !== undefined ) {\r\n        this.to = params.to;\r\n        delete params.to;\r\n      }\r\n\r\n      var start = params.start;\r\n      delete params.start;\r\n            \r\n      for ( var key in params ) {\r\n        if ( eventNames.indexOf( key ) !== -1 || shortEventNames.indexOf( key ) !== -1 ) {\r\n          this.on( key, params[ key ] )\r\n        }\r\n        else {\r\n          this[ key ] = params[ key ];\r\n        }\r\n      }\r\n\r\n      if ( typeof start === \"number\" && start >= 0 ) {\r\n        this.start( start );\r\n      }\r\n    }\r\n\r\n\r\n    /**\r\n    * Make the provided listener function listen for the specified event.\r\n    * @param eventName The event name.\r\n    * @param listener The listener function.\r\n    * @returns The tween instance.\r\n    */\r\n    on( eventName: string, listener: Listener ): Tween;\r\n    \r\n    /**\r\n    * @param listener The listener function for the `onUpdate` event.\r\n    */\r\n    on( eventName: string, listener: UpdateListener ): Tween;\r\n\r\n    on( eventName: string, listener: Function ): Tween {\r\n      if ( shortEventNames.indexOf( eventName ) !== -1 ) {\r\n        eventName = \"on\" + eventName.charAt(0).toUpperCase() + eventName.slice(1);\r\n      }\r\n      else if ( eventNames.indexOf( eventName ) === -1 ) {\r\n        console.error( \"fTween.Tween.on(): ERROR: wrong event name: \"+eventName );\r\n        return;\r\n      }\r\n      this._emitter.on( eventName, listener );\r\n\r\n      if ( this._emitter.listeners( eventName ).length === 1 ) { // first listener for this event\r\n        var ftween = this;\r\n        var func: any;\r\n        // the 'this' variable inside the callbacks is the 'from' object\r\n        if ( eventName === \"onUpdate\" ) {\r\n          func = function( progression: number ) {\r\n            ftween._emitter.emit( eventName, this, progression );\r\n          };\r\n        }\r\n        else if ( eventName === \"onComplete\" ) {\r\n          func = function() {\r\n            ftween._isComplete = true;\r\n            ftween._emitter.emit( \"onComplete\", this );\r\n            if ( ftween._destroyOnComplete === true ) {\r\n              ftween.destroy();\r\n            }\r\n          };\r\n        }\r\n        else {\r\n          func = function() { ftween._emitter.emit( eventName, this ); };\r\n        }\r\n        this._tween[ eventName ]( func );\r\n      }\r\n      return this;\r\n    }\r\n\r\n\r\n    /**\r\n    * Remove the provided listener function from listening for the specified event.\r\n    * @param eventName The event name.\r\n    * @param listener The listener function.\r\n    * @returns The tween instance.\r\n    */\r\n    off( eventName: string, listener: Function ): Tween {\r\n      if ( shortEventNames.indexOf( eventName ) !== -1 ) {\r\n        eventName = \"on\" + eventName.charAt(0).toUpperCase() + eventName.slice(1);\r\n      }\r\n      else if ( eventNames.indexOf( eventName ) === -1 ) {\r\n        console.error( \"fTween.Tween.off(): ERROR: wrong event name: \"+eventName );\r\n        return;\r\n      }\r\n      this._emitter.removeListener( eventName, listener );\r\n\r\n      if ( this._emitter.listeners( eventName ).length === 0 ) {\r\n        this._tween[ eventName ]( null );\r\n      }\r\n      return this;\r\n    }\r\n\r\n    /**\r\n    * Starts the tween.\r\n    * Tweens are automatically started after their creation if the duration and the `to` object are supplied. You can prevent this by setting the `start` property to a negative value in the constructor's `params` argument. \r\n    * @param time The time (a timetamp in milliseconds) at which to start the tween.\r\n    */\r\n    start( time?: number ) {\r\n      if ( this._to === undefined || this._duration === 0  ) {\r\n        console.log( \"fTween.start(): ERROR: Can't start the tweener now because The 'to' object and/or the duration have not been set: \", this._to, this._duration );\r\n        return;\r\n      }\r\n\r\n      if ( this._from === undefined ) {\r\n        this.from = {};\r\n      }\r\n\r\n      this._isComplete = false;\r\n      if ( time !== undefined ) {\r\n        if ( time < 0 ) {\r\n          time = 0\r\n        }\r\n      }\r\n      this._tween.start( time );\r\n    }\r\n\r\n    /**\r\n    * Pause the tween, stopping the update of its values.\r\n    */\r\n    pause() { \r\n      this._isPaused = true;\r\n      this._tween.pause(); \r\n    }\r\n\r\n    /**\r\n    * Resume the tween after it has been paused, resuming the update of its values where they have been paused.\r\n    */\r\n    resume() { \r\n      this._isPaused = false;\r\n      this._tween.resume(); \r\n    }\r\n\r\n    /**\r\n    * Stop the tween, stopping the update of its values. \r\n    * A stopped tween can not be resumed, but can be restarted by calling start() again, with unpredictable results.\r\n    */\r\n    stop() { this._tween.stop(); }\r\n    \r\n    /**\r\n    * Stop the tween and all its chained tweens then remove all its listeners and de-reference as much objects as possible to let them be garbage collected.\r\n    */\r\n    destroy() {\r\n      this._tween.destroy();\r\n      this._tween = null;\r\n      this._from = null;\r\n      this._to = null;\r\n      this._emitter.removeAllListeners();\r\n      this._emitter = null;\r\n      this._isDestroyed = true;\r\n    }\r\n\r\n    /**\r\n    * Check that the provided value is not too big.\r\n    * If that's the case, suppose that it is a number of milliseconds instead of seconds and display a warning.\r\n    * Called by duration, delay and time setters.\r\n    * @param value The value.\r\n    * @param propName The name of the evaluated property.\r\n    */\r\n    private _checkMilliseconds( value: number, propName: string ) {\r\n      if ( value >= 500 ) {\r\n        console.log( \"fTween.\"+propName+\": WARNING: The provided value '\"+value+\"' is superior to 500! The value has to be expressed in seconds, not in milliseconds. Are you sure you didn't meant the value to be '\"+value/1000+\"' seconds instead ?\" );\r\n      }\r\n    }\r\n\r\n    // --------------------------------------------------------------------------------\r\n    // properties\r\n\r\n    // Ideally, I would have made the Tween calss extends EventEmitter\r\n    // but it doesn't seem to be possible with the current state of Superpowers\r\n    // used by the SPTWEEN callbacks (set in the constructor) and by on() and off()\r\n    private _emitter = new EventEmitter3();\r\n\r\n\r\n    private _tween = new SPTWEEN.Tween();\r\n    /**\r\n    * The `SPTWEEN.Tween` instance that actually perform the tweening.\r\n    */\r\n    get _inner() { return this._tween; }\r\n\r\n\r\n    private _to: Object;\r\n    /**\r\n    * The `to` object containing the end values.\r\n    */\r\n    set to( to: Object ) {\r\n      this._to = to;\r\n      this._tween.to( to );\r\n    }\r\n    get to(): Object { return this._to; }\r\n\r\n\r\n    private _duration: number = 0;\r\n    /**\r\n    * The time in seconds to complete the tween.\r\n    */\r\n    set duration( duration: number ) {\r\n      if ( duration < 0 ) {\r\n        duration = 0\r\n      }\r\n      this._checkMilliseconds( duration, \"duration\" );\r\n      this._tween.duration( duration * 1000 );\r\n      this._duration = duration;\r\n    } \r\n    get duration(): number { return this._duration; }\r\n\r\n\r\n    /**\r\n    * The time in seconds to complete the timer. Setting the `time` property makes the `from`, `to` and `duration` being ignored.\r\n    */\r\n    set time( time: number ) {\r\n      if ( time < 0 ) {\r\n        time = 0\r\n      }\r\n      this._checkMilliseconds( time, \"time\" );\r\n      this.from = { elapsedTime: 0, remainingTime: time };\r\n      this.to = { elapsedTime: time, remainingTime: 0 };\r\n      this.duration = time;\r\n    }\r\n    get time(): number { return this._duration; }\r\n\r\n\r\n    private _from: Object; // from has to exist but is completely optionnal\r\n    /**\r\n    * The `from` object containing the start values.\r\n    */\r\n    set from( from: Object ) {\r\n      this._from = from;  \r\n      this._tween.from( from );\r\n    }\r\n    get from(): Object { return this._from; }\r\n\r\n\r\n    private _isRelative: boolean = false;\r\n    /**\r\n    * Tell whether to consider number values in the to object as relative (true) or absolute (false).\r\n    */\r\n    set isRelative( isRelative: boolean ) { \r\n      this._tween.isRelative( isRelative );\r\n      this._isRelative = isRelative; \r\n    }\r\n    get isRelative(): boolean { return this._isRelative; }\r\n\r\n\r\n    private _delay: number = 0;\r\n    /**\r\n    * The time in milliseconds before the tween's values actually starts to updates after the tween has been started.\r\n    */\r\n    set delay( delay: number ) { \r\n      if ( delay < 0 ) {\r\n        delay = 0;\r\n      }\r\n      this._checkMilliseconds( delay, \"delay\" );\r\n      this._tween.delay( delay * 1000 );\r\n      this._delay = delay;\r\n    } \r\n    get delay(): number { return this._delay; }\r\n\r\n\r\n    private _repeat: number = 0;\r\n    /**\r\n    * The number of times the tween will repeat, after having completed once.\r\n    */\r\n    set repeat( repeat: number ) { \r\n      if ( repeat < 0 ) {\r\n        repeat = 0;\r\n      }\r\n      this._tween.repeat( repeat );\r\n      this._repeat = repeat; \r\n    }\r\n    get repeat(): number { return this._repeat; }\r\n\r\n\r\n    private _yoyo: boolean = false;\r\n    /**\r\n    * After having completed once and when repeat is strictly positive, tell whether the tween restart from its original state (false) (from 'from' to 'to', and repeat) or its current state (true) (from 'from' to 'to', then from 'to' to 'from', and repeat).\r\n    */\r\n    set yoyo( yoyo: boolean ) { \r\n      this._tween.yoyo( yoyo );\r\n      this._yoyo = yoyo; \r\n    }\r\n    get yoyo(): boolean { return this._yoyo; }\r\n\r\n\r\n    private _easing: EasingFunction;\r\n    /**\r\n    * The easing function to use..\r\n    */\r\n    set easing( easing : EasingFunction ) { \r\n      this._tween.easing( easing );\r\n      this._easing = easing; \r\n    }\r\n    get easing(): EasingFunction { return this._easing; }\r\n\r\n\r\n    private _interpolation: InterpolationFunction;\r\n    /**\r\n    * The interpolation function to use.\r\n    */\r\n    set interpolation( interpolation: InterpolationFunction ) {\r\n      this._tween.interpolation( interpolation );\r\n      this._interpolation = interpolation; \r\n    }\r\n    get interpolation(): InterpolationFunction { return this._interpolation; }\r\n\r\n\r\n    private _isPaused: boolean = false;\r\n    /**\r\n    * The tween's paused state. Use the `pause()` and `resume()` methods to control the paused state.\r\n    */\r\n    get isPaused(): boolean { return this._isPaused; }\r\n\r\n\r\n    // (re)set to false in start()\r\n    // set to true in the onComplete callback set in the constructor\r\n    private _isComplete: boolean = false; \r\n    /**\r\n    * The tween's completed state.\r\n    */\r\n    get isComplete(): boolean { return this._isComplete; }\r\n\r\n\r\n    private _destroyOnComplete: boolean = true;\r\n    /**\r\n    * Tell whether to destroy the tween once it has completed (true), or not (false).\r\n    */\r\n    set destroyOnComplete( destroyOnComplete: boolean ) {\r\n      this._destroyOnComplete = destroyOnComplete;\r\n    }\r\n    get destroyOnComplete(): boolean { return this._destroyOnComplete; }\r\n\r\n\r\n    private _isDestroyed: boolean = false; \r\n    /**\r\n    * The tween's destroyed state.\r\n    */\r\n    get isDestroyed(): boolean { return this._isDestroyed; }\r\n\r\n  } // end of fTween.Tween class\r\n\r\n  // --------------------------------------------------------------------------------\r\n\r\n  /**\r\n  * Signature for `fTween.Tween`'s listener functions.\r\n  * @param object The `from` object containing the values.\r\n  */\r\n  export interface Listener {\r\n    (object?: Object): void;\r\n  }\r\n\r\n  \r\n  /**\r\n  * Signature for `fTween.Tween`'s `onUpdate` listener function.\r\n  * @param object The `from` object containing the values.\r\n  * @param progression The tween's percentage of progression as a number between 0 and 1.\r\n  */\r\n  export interface UpdateListener {\r\n    (object?: Object, progression?: number): void;\r\n  }\r\n\r\n  export interface EasingFunction {\r\n    (k:number): number;\r\n  }\r\n  export interface InterpolationFunction {\r\n    (v:number[], k:number): number;\r\n  }\r\n\r\n  /**\r\n  * Interface for the `params` argument of `fTween.Tween`'s constructors and `set()` function.\r\n  */\r\n  export interface Params {\r\n    /**\r\n    * The object containing the start values.\r\n    */\r\n    from?: Object;\r\n    /** \r\n    * The object containing the end values.\r\n    */\r\n    to?: Object;\r\n    /**\r\n    * The time in seconds to complete the tween.\r\n    */\r\n    duration?: number;\r\n    /**\r\n    * The time in seconds to complete the timer. Setting the `time` property makes the `from`, `to` and `duration` being ignored.\r\n    */\r\n    time?: number;\r\n    /**\r\n    * Tell whether to consider number values in the to object as relative (true) or absolute (false).\r\n    */\r\n    isRelative?: boolean;\r\n    /**\r\n    * The time in seconds before the tween's values actually starts to updates after the tween has been started.\r\n    */\r\n    delay?: number;\r\n    /**\r\n    * The number of times the tween will repeat, after having completed once.\r\n    */\r\n    repeat?: number;\r\n    /**\r\n    * After having completed once and when repeat is strictly positive, tell whether the tween restart from its original state (false) (from 'from' to 'to', and repeat) or its current state (true) (from 'from' to 'to', then from 'to' to 'from', and repeat).\r\n    */\r\n    yoyo?: boolean;\r\n    /**\r\n    * The easing function to use.\r\n    */\r\n    easing?: EasingFunction;\r\n    /**\r\n    * The interpolation function to use.\r\n    */\r\n    interpolation?: InterpolationFunction;\r\n    /**\r\n    * Tell whether to destroy the tween once it has completed (true), or not (false).\r\n    */\r\n    destroyOnComplete?: boolean;\r\n    /**\r\n    * The listener for the `onStart` event.\r\n    */\r\n    onStart?: Listener;\r\n    /**\r\n    * The listener for the `onPause` event.\r\n    */\r\n    onPause?: Listener;\r\n    /**\r\n    * The listener for the `onResume` event.\r\n    */\r\n    onResume?: Listener;\r\n    /**\r\n    * The listener for the `onUpdate` event.\r\n    */\r\n    onUpdate?: UpdateListener;\r\n    /**\r\n    * The listener for the `onComple` event.\r\n    */\r\n    onComplete?: Listener;\r\n    /**\r\n    * The listener for the `onStop` event.\r\n    */\r\n    onStop?: Listener;\r\n    /**\r\n    * The time (a timetamp in milliseconds) at which to start the tween. Tweens are automatically started at the time they are created, so you may set the property to a negative value to prevent it to be started at all, or set any other time you like. \r\n    */\r\n    start?: number;\r\n  }\r\n} // end of fTween module\r\n\r\nvar fAnimate: typeof fTween.Tween = fTween.Tween;\r\n\r\n/*\r\nvar proto: any = Sup.Actor.prototype;\r\nvar proto2 = Sup.Actor.prototype;\r\n// storing the prototype in a variable of type any is necessary\r\n// doing otherwise cause an error of type \"'animate' does not exist on type 'Actor'\"\r\nproto.animate = function( to:Object, duration:number, params?:fTween.Params ) {\r\n  return new fTween.Tween( this, to, duration, params );\r\n};\r\n\r\nvar proto: any = Sup.ActorComponent.prototype;\r\nproto.animate = function( to:Object, duration:number, params?:fTween.Params ) {\r\n  return new fTween.Tween( this, to, duration, params );\r\n};\r\n*/\r\n".replace("reference path", ""),
  defs: "\r\ndeclare module fTween {\r\n  var Easing: SPTWEEN.TweenEasing;\r\n  var Interpolation: SPTWEEN.TweenInterpolation;\r\n  \r\n  function update(time?: number): void;\r\n\r\n  class Tween {\r\n    constructor(from: Object, to: Object, duration: number, params?: Params);\r\n    constructor(to: Object, duration: number, params?: Params);\r\n    constructor(time: number, onComplete: Listener, params?: Params);\r\n    constructor(params?: Params);\r\n    \r\n    set(params: Params);\r\n    on(eventName: string, listener: Listener): Tween;\r\n    on(eventName: string, listener: UpdateListener): Tween;\r\n    off(eventName: string, listener: Function): Tween;\r\n    start(time?: number);\r\n    pause();\r\n    resume();\r\n    stop();\r\n    destroy();\r\n\r\n    emitter: any;\r\n    _inner: SPTWEEN.Tween;\r\n    to: Object;\r\n    duration: number;\r\n    time: number;\r\n    from: Object;\r\n    isRelative: boolean;\r\n    delay: number;\r\n    repeat: number;\r\n    yoyo: boolean;\r\n    easing: SPTWEEN.EasingFunction;\r\n    interpolation: SPTWEEN.InterpolationFunction;\r\n    isPaused: boolean;\r\n    isCompleted: boolean;\r\n    isDestroyed: boolean;\r\n  } \r\n\r\n  interface Listener {\r\n    (object: Object): void;\r\n  }\r\n  \r\n  interface UpdateListener {\r\n    (object: Object, progression: number): void;\r\n  }\r\n  \r\n  interface Params {\r\n    from?: Object;\r\n    to?: Object;\r\n    duration?: number;\r\n    time?: number;\r\n    isRelative?: boolean;\r\n    delay?: number;\r\n    repeat?: number;\r\n    yoyo?: boolean;\r\n    easing?: SPTWEEN.EasingFunction;\r\n    interpolation?: SPTWEEN.InterpolationFunction;\r\n    destroyOnComplete?: boolean;\r\n    onStart?: Listener;\r\n    onPause?: Listener;\r\n    onResume?: Listener;\r\n    onUpdate?: UpdateListener;\r\n    onComplete?: Listener;\r\n    onStop?: Listener;\r\n    start?: number;\r\n  }\r\n\r\n  interface EasingFunction {\r\n    (k:number): number;\r\n  }\r\n  interface InterpolationFunction {\r\n    (v:number[], k:number): number;\r\n  }\r\n}\r\n"
});



},{"../lib/EventEmitter3.js":2,"../lib/sup-tween.js":3}],2:[function(require,module,exports){
// https://github.com/primus/eventemitter3   v0.1.16
'use strict';

/**
 * Representation of a single EventEmitter function.
 *
 * @param {Function} fn Event handler to be called.
 * @param {Mixed} context Context for function execution.
 * @param {Boolean} once Only emit once
 * @api private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Minimal EventEmitter interface that is molded against the Node.js
 * EventEmitter interface.
 *
 * @constructor
 * @api public
 */
function EventEmitter() { /* Nothing to set */ }

/**
 * Holds the assigned EventEmitters by name.
 *
 * @type {Object}
 * @private
 */
EventEmitter.prototype._events = undefined;

/**
 * Return a list of assigned event listeners.
 *
 * @param {String} event The events that should be listed.
 * @returns {Array}
 * @api public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  if (!this._events || !this._events[event]) return [];
  if (this._events[event].fn) return [this._events[event].fn];

  for (var i = 0, l = this._events[event].length, ee = new Array(l); i < l; i++) {
    ee[i] = this._events[event][i].fn;
  }

  return ee;
};

/**
 * Emit an event to all registered event listeners.
 *
 * @param {String} event The name of the event.
 * @returns {Boolean} Indication if we've emitted an event.
 * @api public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  if (!this._events || !this._events[event]) return false;

  var listeners = this._events[event]
    , len = arguments.length
    , args
    , i;

  if ('function' === typeof listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Register a new EventListener for the given event.
 *
 * @param {String} event Name of the event.
 * @param {Functon} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @api public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  var listener = new EE(fn, context || this);

  if (!this._events) this._events = {};
  if (!this._events[event]) this._events[event] = listener;
  else {
    if (!this._events[event].fn) this._events[event].push(listener);
    else this._events[event] = [
      this._events[event], listener
    ];
  }

  return this;
};

/**
 * Add an EventListener that's only called once.
 *
 * @param {String} event Name of the event.
 * @param {Function} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @api public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  var listener = new EE(fn, context || this, true);

  if (!this._events) this._events = {};
  if (!this._events[event]) this._events[event] = listener;
  else {
    if (!this._events[event].fn) this._events[event].push(listener);
    else this._events[event] = [
      this._events[event], listener
    ];
  }

  return this;
};

/**
 * Remove event listeners.
 *
 * @param {String} event The event we want to remove.
 * @param {Function} fn The listener that we need to find.
 * @param {Boolean} once Only remove once listeners.
 * @api public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, once) {
  if (!this._events || !this._events[event]) return this;

  var listeners = this._events[event]
    , events = [];

  if (fn) {
    if (listeners.fn && (listeners.fn !== fn || (once && !listeners.once))) {
      events.push(listeners);
    }
    if (!listeners.fn) for (var i = 0, length = listeners.length; i < length; i++) {
      if (listeners[i].fn !== fn || (once && !listeners[i].once)) {
        events.push(listeners[i]);
      }
    }
  }

  //
  // Reset the array, or remove it completely if we have no more listeners.
  //
  if (events.length) {
    this._events[event] = events.length === 1 ? events[0] : events;
  } else {
    delete this._events[event];
  }

  return this;
};

/**
 * Remove all listeners or only the listeners for the specified event.
 *
 * @param {String} event The event want to remove all listeners for.
 * @api public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  if (!this._events) return this;

  if (event) delete this._events[event];
  else this._events = {};

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// This function doesn't apply anymore.
//
EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
  return this;
};

//
// Expose the module.
//
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.EventEmitter2 = EventEmitter;
EventEmitter.EventEmitter3 = EventEmitter;

//
// Expose the module.
//
module.exports = EventEmitter;

},{}],3:[function(require,module,exports){
/**
 * sp-tween.js - Licensed under the MIT license
 * https://github.com/florentpoujol/superpowers-tween.js
 * ----------------------------------------------
 *
 * A fork of Soledad Penadés' tween.js library : https://github.com/tweenjs/tween.js
 * Thank you all, you're awesome!
 */

// Date.now shim for (ahem) Internet Explo(d|r)er
if ( Date.now === undefined ) {

	Date.now = function () {

		return new Date().valueOf();

	};

}

var SPTWEEN = SPTWEEN || ( function () {

	var _tweens = [];

	return {

		REVISION: '1',

		getAll: function () {

			return _tweens;

		},

		removeAll: function () {

			_tweens = [];

		},

		add: function ( tween ) {

			_tweens.push( tween );

		},

		remove: function ( tween ) {

			var i = _tweens.indexOf( tween );

			if ( i !== -1 ) {

				_tweens.splice( i, 1 );

			}

		},

		update: function ( time ) {

			if ( _tweens.length === 0 ) return false;

			var i = 0;

			time = time !== undefined ? time : ( typeof window !== 'undefined' && window.performance !== undefined && window.performance.now !== undefined ? window.performance.now() : Date.now() );

			while ( i < _tweens.length ) {

				if ( _tweens[ i ].update( time ) ) {

					i++;

				} else {

					_tweens.splice( i, 1 );

				}

			}

			return true;

		}
	};

} )();

SPTWEEN.Tween = function ( object ) {

  var _object = object || {};
  var _valuesStart = {};
  var _valuesEnd = {};
  var _duration = 1000;
  var _isRelative = false;
  var _repeat = 0;
  var _yoyo = false;
  var _isPlaying = false;
  var _delayTime = 0;
  var _startTime = null;
  var _isPaused = false;
  var _pauseDuration = 0;
  var _pauseStartTime = 0;
  var _easingFunction = SPTWEEN.Easing.Linear.None;
  var _interpolationFunction = SPTWEEN.Interpolation.Linear;
  var _chainedTweens = [];
  var _onStartCallback = null;
  var _onStartCallbackFired = false;
  var _onPauseCallback = null;
  var _onResumeCallback = null;
  var _onUpdateCallback = null;
  var _onCompleteCallback = null;
  var _onStopCallback = null;

  this.test = false;

  // Keys are property name, values are object with getter and setter properties.
  // Filled in _setupDynamicProperty().
  // Reset in start().
  var _accessorsByProperties = {};

  /**
  * Check if the provided property is "dynamic" on _object, that is if _object[property] === undefined but the property name match the name of a couple of getter/setter : get[Property]()/set[Property]().
  * Called from start().
  * @param {string} property - The property name.
  */
  var _setupDynamicProperty = function( property ) {

    if ( _object[ property ] === undefined ) {
      
      var ucProperty = property.charAt(0).toUpperCase() + property.slice(1);
      var getter = _object[ "get"+ucProperty ];
      var setter = _object[ "set"+ucProperty ];

      if ( typeof getter === "function" && typeof setter === "function" ) {
        _accessorsByProperties[ property ] = { getter: getter, setter: setter };
      }

    }

  };

  /**
  * Get the provided property's value on the _object.
  * Called from start() and update().
  * @param {string} property - The property name.
  * @return {any} 
  */
  var _getObjectValue = function( property ) {
    if (this.test) console.log("getobjectvalue", property, _accessorsByProperties[ property ]);

    if ( _accessorsByProperties[ property ] !== undefined ) {
      return _accessorsByProperties[ property ].getter.call( _object );
    }
    return _object[ property ];

  };
  
  /**
  * Get the provided property's value on the _object.
  * Called from start() and update().
  * @param {string} property - The property name.
  * @param value {any}
  */
  var _setObjectValue = function( property, value ) {
    if (this.test) console.log("setobjectvalue", property, value, _accessorsByProperties[ property ]);

    if ( _accessorsByProperties[ property ] !== undefined ) {
      if (this.test) console.log("set", property, value);
      _accessorsByProperties[ property ].setter.call( _object, value );
    }
    _object[ property ] = value;

  };

  this.from = function ( object ) {

    _object = object;
    return this;

  };

  this.to = function ( object, duration ) {

    if ( duration !== undefined ) {

      _duration = duration;

    }

    _valuesEnd = object;

    return this;

  };

  this.duration = function ( duration ) {

    _duration = duration;
    return this;

  };

  this.isRelative = function ( isRelative ) {

    _isRelative = isRelative;
    return this;

  };

  this.start = function ( time ) {
    if ( ! ( this in SPTWEEN.getAll() ) ) {
      SPTWEEN.add( this );
    }

    _isPlaying = true;
    _onStartCallbackFired = false;

    _startTime = time !== undefined ? time : ( typeof window !== 'undefined' && window.performance !== undefined && window.performance.now !== undefined ? window.performance.now() : Date.now() );
    _startTime += _delayTime;
    _pauseDuration = 0;

    if (this.test) console.log("start tweener",_valuesStart, _object, _valuesEnd);
    var endValue, objectValue, property, endValueType, nEndValue, nObjectValue, nProperty; // n for "nested"
    var allowedTypes = [ "number", "string", "object" ]; // type object is for objects, arrays and null
    _accessorsByProperties = {};

    // loop on _valuesEnd to fill _valuesStart
    // except for object values in _valuesEnd that are undefined in _object, _object doesn't need to be filled or fixed because it will be updated from update().
    for ( property in _valuesEnd ) {

      endValue = _valuesEnd[ property ];
      endValueType = typeof endValue;

      // discard null and not allowed types
      if ( endValue === null || allowedTypes.indexOf( endValueType ) === -1 ) {
        continue;
      }

      _setupDynamicProperty( property );

      // check if an Array was provided as property value
      if ( Array.isArray( endValueType ) ) {
        if ( endValue.length === 0 ) {
          continue;
        }

        // create a local copy of the Array with the start value at the front
        _valuesEnd[ property ] = [ _getObjectValue( property ) || 0 ].concat( endValue );
        _valuesStart[ property ] = _getObjectValue( property ) || 0;

      }
      else if ( endValueType === "object" ) { // never null or array at this point

        // create object in _valuesStart and _object if one don't exist yet
        if ( _valuesStart[ property ] === undefined ) {
          _valuesStart[ property ] = {};
        }

        objectValue = _getObjectValue( property );
        if ( objectValue === undefined ) {
          objectValue = {};
          _setObjectValue( property, objectValue ); 
          // could directly do _object[property] = {} as this case is unlikely to ever happens with dynamic properties ?
        }

        for ( nProperty in endValue ) { // endValue is the object, nested in _valuesEnd, that contains the values to tween
          
          nEndValue = endValue[ nProperty ];
          nObjectValue = objectValue[ nProperty ] || 0;

          if ( Array.isArray( nEndValue ) ) {

            _valuesEnd[ property ][ nProperty ] = [ nObjectValue ].concat( nEndValue );
            _valuesStart[ property ][ nProperty ] = nObjectValue;

          }
          else { // string or number
            _valuesStart[ property ][ nProperty ] = parseFloat( nObjectValue ) || 0;
          }
        }

      }
      else { 
        _valuesStart[ property ] = parseFloat( _getObjectValue( property ) ) || 0;
      }

    }
    
    if (this.test) console.log("start tweener end",_valuesStart, _object, _valuesEnd);

    return this;

  };

  this.pause = function () {

    if ( _isPaused ) {
      return;
    }

    _isPaused = true;

    if ( _onPauseCallback !== null ) {
      _onPauseCallback.call( _object );
    }

    return this;

  };

  this.isPaused = function () {
    return _isPaused;
  };

  this.resume = function () {

    if ( !_isPaused ) {
      return;
    }

    _isPaused = false;

    if ( _onResumeCallback !== null ) {
      _onResumeCallback.call( _object );
    }

    return this;

  };

  this.stop = function () {

    if ( !_isPlaying ) {
      return this;
    }

    SPTWEEN.remove( this );
    _isPlaying = false;

    if ( _onStopCallback !== null ) {

      _onStopCallback.call( _object );

    }

    this.stopChainedTweens();
    return this;

  };

  /**
  * Free as much stuff as possible for garbage collection.
  * @param {boolean=false} recurse If the tween has one or more chained tweens, tell whether to recursively destro them all (true) or just leave them be (false).
  */
  this.destroy = function ( recurse ) {
    
    if ( _isPlaying === true ) {
      SPTWEEN.remove( this );
      _isPlaying = false;
    }

    this.stopChainedTweens();

    if ( recurse === true ) {
      for ( var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++ ) {
        _chainedTweens[ i ].destroy( true );
      }
    }

    _object = null;
    _valuesStart = null;
    _valuesEnd = null;
    _chainedTweens = null;
    _onStartCallback = null;
    _onPauseCallback = null;
    _onResumeCallback = null;
    _onUpdateCallback = null;
    _onCompleteCallback = null;
    _onStopCallback = null;

  };

  this.stopChainedTweens = function () {

    for ( var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++ ) {

      _chainedTweens[ i ].stop();

    }

  };


  /**
  * Return all chained tweens
  * @returns {Array}
  */
  this.getChainedTweens = function () {

    return _chainedTweens;

  };

  /**
  * Remove one or several chained tweens.
  * @param {SPTWEEN.Tween} [tween] The tween to remove. If null or undefined, all chained tweens will be removed.
  * @returns {boolean} True if at least one tween has been removed, false otherwise.
  */
  this.removeChainedTweens = function ( tween ) {

    if ( tween !== null || tween !== undefined ) {
      
      var index = _chainedTweens.indexOf( tween );
      if ( index !== -1 ) {

        _chainedTweens.splice( index, 1 );
        return true;

      }

      return false;

    }

    var count = _chainedTweens.length;
    _chainedTweens = [];
    return ( count > 0 );

  };

  this.delay = function ( amount ) {

    _delayTime = amount;
    return this;

  };

  this.repeat = function ( times ) {

    _repeat = times;
    return this;

  };

  this.yoyo = function( yoyo ) {

    _yoyo = yoyo;
    return this;

  };

  this.easing = function ( easing ) {

    _easingFunction = easing;
    return this;

  };

  this.interpolation = function ( interpolation ) {

    _interpolationFunction = interpolation;
    return this;

  };

  this.chain = function () {

    _chainedTweens = arguments;
    return this;

  };

  this.onStart = function ( callback ) {
    _onStartCallback = callback;
    return this;

  };

  this.onUpdate = function ( callback ) {

    _onUpdateCallback = callback;
    return this;

  };

  this.onPause = function ( callback ) {

    _onPauseCallback = callback;
    return this;

  };

  this.onResume = function ( callback ) {

    _onResumeCallback = callback;
    return this;

  };

  this.onComplete = function ( callback ) {

    _onCompleteCallback = callback;
    return this;

  };

  this.onStop = function ( callback ) {

    _onStopCallback = callback;
    return this;

  };

  // returns true when the tween must be kept in the list of tweens to update
  this.update = function ( time ) {
    if (this.test) console.log("update tweener", time);
    if ( _isPaused === true ) {
      if ( _pauseStartTime === 0 ) {
        // first update after tween is paused
        _pauseStartTime = time;
      }
      return true;
    } 
    else if ( _pauseStartTime > 0 ) {
      // first update after tween is resumed
      _pauseDuration += ( time - _pauseStartTime );
      _pauseStartTime = 0;
      return true;
    }
    
    if ( time < _startTime ) {

      return true;

    }

    if ( _onStartCallbackFired === false ) {

      if ( _onStartCallback !== null ) {

        _onStartCallback.call( _object );

      }

      _onStartCallbackFired = true;

    }

    var elapsed = ( time - ( _startTime + _pauseDuration ) ) / _duration;
    elapsed = elapsed > 1 ? 1 : elapsed;

    var progression = _easingFunction( elapsed ); // % between 0 and 1

    /**
    * @param {number} start - The value from _valuesStart.
    * @param {number|string} end - The value from _valuesEnd.
    * @param {string} endValueType - The type of 'end' param.
    */
    var getCurrentValue = function( start, end, endValueType ) {

      if ( _isRelative === true || endValueType === "string" ) {
        // Parses relative end values with start as base (e.g.: +10, -3)
        end = start + parseFloat( end, 10 );
      }
      
      return start + ( end - start ) * progression;

    };

    var property, start, end, valueType, nProperty, nStart, nEnd, nObject;
    if (this.test) console.log("update tweener", _valuesStart, _object, _valuesEnd, progression, elapsed);

    for ( property in _valuesEnd ) {

      start = _valuesStart[ property ];
      end = _valuesEnd[ property ];
      valueType = typeof end;

      if (this.test) console.log("update property", property, end, _object);
      if ( Array.isArray( end ) ) {
        _object[ property ] = _interpolationFunction( end, progression );
      }

      else if ( end !== null && valueType === "object") {

        nObject = _getObjectValue( property );
        // Keeping a reference to the nObject may be useful when getting/setting the property actually calls a getter/setter.
        
        // if the reference is meaningfull, updating it will actually update the data but,
        // typically, the getter returns a new object instance every time (like a Vector3 for get/setPosition())
        // so updating the reference (nObject) doesn't actually update the data in the object
        // unless the setter is called with the new value (as it is done below)

        for ( nProperty in end ) {

          nStart = start[ nProperty ]; 
          // console.log("end", end, nProperty, end[ nProperty ]);
          nEnd = end[ nProperty ];

          if ( Array.isArray( nEnd ) ) {
            nObject[ nProperty ] = _interpolationFunction( nEnd, progression );
          }
          else {
            nObject[ nProperty ] = getCurrentValue( nStart, nEnd, typeof nEnd );
          }
          if (this.test) console.log( "object value", property, nProperty, nStart, _valuesStart, nEnd, _valuesEnd);

        }
        
        if (this.test) console.log("set object value1", property, nObject, _object);
        _setObjectValue( property, nObject );       

      }

      else if ( valueType === "number" || valueType === "string" ) {
        _setObjectValue( property, getCurrentValue( start, end, valueType ) );
        if (this.test) console.log( "num value", property, start, end, progression, getCurrentValue( start, end ));
      }

    }
    if (this.test) console.log("update tweener 2", _object);


    if ( _onUpdateCallback !== null ) {

      _onUpdateCallback.call( _object, progression );

    }

    if ( elapsed == 1 ) {

      if ( _repeat > 0 ) {

        if( isFinite( _repeat ) ) {
          _repeat--;
        }

        if (this.test) console.log("before repeat", _valuesStart, _object, _valuesEnd, _isRelative);
        // reassign starting values, restart by making startTime = now
        // console.log( "repeat", _valuesStart, _object, _valuesEnd );
        for( property in _valuesStart ) {

          // set startValue = currentValue if endValue (or whole tween) is relative
          endValue = _valuesEnd[ property ];
          endValueType = typeof endValue;
          currentValue = _getObjectValue( property );
          
          if ( _yoyo ) {
            
            _valuesEnd[ property ] = _valuesStart[ property ];
            _valuesStart[ property ] = currentValue;

            // if endValue/currentValue is an object, copy it so that _valuesStart doesn't keep a reference to currentValue which would be updated in update()
            if ( endValue !== null && Array.isArray( endValue ) === false && endValueType === "object" ) { 

              _valuesStart[ property ] = {};
              for ( nProperty in endValue ) {
                _valuesStart[ property ][ nProperty ] = currentValue[ nProperty ];
              }

            }
            if (this.test) console.log("property after yoyo", property, _valuesStart[ property ], _object[ property ], _valuesEnd[ property ]);

          }
          else { // not yoyo
            // do nothing unless the tween or some of its values are relative
            // in this case, assign currentValue as the new start value

            if ( ( _isRelative === true && endValueType === "number" ) || endValueType === "string" ) {
              _valuesStart[ property ] = currentValue;
              // if (this.test) console.log("update start value with current value", property, currentValue);
            }

            else if ( endValue !== null && Array.isArray( endValue ) === false && endValueType === "object" ) { 

              for ( nProperty in endValue ) {

                var nEndValueType = typeof endValue[ nProperty ]; 
                if ( ( _isRelative === true && nEndValueType === "number" ) || nEndValueType === "string" ) {
                  _valuesStart[ property ][ nProperty ] = currentValue[ nProperty ];
                }

              }

            }

          }
          // what about arrays ?
          if (this.test) console.log("property", property, _valuesStart[ property ], _object[ property ], _valuesEnd[ property ]);

        }
        if (this.test) console.log("after repeat", _valuesStart, _object, _valuesEnd);
        
        if ( _yoyo ) {
          _isRelative = false;
        }

        _startTime = time + _delayTime;
        _pauseDuration = 0;

        return true;

      } else {

        if ( _onCompleteCallback !== null ) {

          _onCompleteCallback.call( _object );

        }

        for ( var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++ ) {

          _chainedTweens[ i ].start( time );

        }

        return false;

      }

    }

    return true;

  };

};


SPTWEEN.Easing = {

  Linear: {

    None: function ( k ) {

      return k;

    }

  },

  Quadratic: {

    In: function ( k ) {

      return k * k;

    },

    Out: function ( k ) {

      return k * ( 2 - k );

    },

    InOut: function ( k ) {

      if ( ( k *= 2 ) < 1 ) return 0.5 * k * k;
      return - 0.5 * ( --k * ( k - 2 ) - 1 );

    }

  },

  Cubic: {

    In: function ( k ) {

      return k * k * k;

    },

    Out: function ( k ) {

      return --k * k * k + 1;

    },

    InOut: function ( k ) {

      if ( ( k *= 2 ) < 1 ) return 0.5 * k * k * k;
      return 0.5 * ( ( k -= 2 ) * k * k + 2 );

    }

  },

  Quartic: {

    In: function ( k ) {

      return k * k * k * k;

    },

    Out: function ( k ) {

      return 1 - ( --k * k * k * k );

    },

    InOut: function ( k ) {

      if ( ( k *= 2 ) < 1) return 0.5 * k * k * k * k;
      return - 0.5 * ( ( k -= 2 ) * k * k * k - 2 );

    }

  },

  Quintic: {

    In: function ( k ) {

      return k * k * k * k * k;

    },

    Out: function ( k ) {

      return --k * k * k * k * k + 1;

    },

    InOut: function ( k ) {

      if ( ( k *= 2 ) < 1 ) return 0.5 * k * k * k * k * k;
      return 0.5 * ( ( k -= 2 ) * k * k * k * k + 2 );

    }

  },

  Sinusoidal: {

    In: function ( k ) {

      return 1 - Math.cos( k * Math.PI / 2 );

    },

    Out: function ( k ) {

      return Math.sin( k * Math.PI / 2 );

    },

    InOut: function ( k ) {

      return 0.5 * ( 1 - Math.cos( Math.PI * k ) );

    }

  },

  Exponential: {

    In: function ( k ) {

      return k === 0 ? 0 : Math.pow( 1024, k - 1 );

    },

    Out: function ( k ) {

      return k === 1 ? 1 : 1 - Math.pow( 2, - 10 * k );

    },

    InOut: function ( k ) {

      if ( k === 0 ) return 0;
      if ( k === 1 ) return 1;
      if ( ( k *= 2 ) < 1 ) return 0.5 * Math.pow( 1024, k - 1 );
      return 0.5 * ( - Math.pow( 2, - 10 * ( k - 1 ) ) + 2 );

    }

  },

  Circular: {

    In: function ( k ) {

      return 1 - Math.sqrt( 1 - k * k );

    },

    Out: function ( k ) {

      return Math.sqrt( 1 - ( --k * k ) );

    },

    InOut: function ( k ) {

      if ( ( k *= 2 ) < 1) return - 0.5 * ( Math.sqrt( 1 - k * k) - 1);
      return 0.5 * ( Math.sqrt( 1 - ( k -= 2) * k) + 1);

    }

  },

  Elastic: {

    In: function ( k ) {

      var s, a = 0.1, p = 0.4;
      if ( k === 0 ) return 0;
      if ( k === 1 ) return 1;
      if ( !a || a < 1 ) { a = 1; s = p / 4; }
      else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
      return - ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );

    },

    Out: function ( k ) {

      var s, a = 0.1, p = 0.4;
      if ( k === 0 ) return 0;
      if ( k === 1 ) return 1;
      if ( !a || a < 1 ) { a = 1; s = p / 4; }
      else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
      return ( a * Math.pow( 2, - 10 * k) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) + 1 );

    },

    InOut: function ( k ) {

      var s, a = 0.1, p = 0.4;
      if ( k === 0 ) return 0;
      if ( k === 1 ) return 1;
      if ( !a || a < 1 ) { a = 1; s = p / 4; }
      else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
      if ( ( k *= 2 ) < 1 ) return - 0.5 * ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );
      return a * Math.pow( 2, -10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) * 0.5 + 1;

    }

  },

  Back: {

    In: function ( k ) {

      var s = 1.70158;
      return k * k * ( ( s + 1 ) * k - s );

    },

    Out: function ( k ) {

      var s = 1.70158;
      return --k * k * ( ( s + 1 ) * k + s ) + 1;

    },

    InOut: function ( k ) {

      var s = 1.70158 * 1.525;
      if ( ( k *= 2 ) < 1 ) return 0.5 * ( k * k * ( ( s + 1 ) * k - s ) );
      return 0.5 * ( ( k -= 2 ) * k * ( ( s + 1 ) * k + s ) + 2 );

    }

  },

  Bounce: {

    In: function ( k ) {

      return 1 - SPTWEEN.Easing.Bounce.Out( 1 - k );

    },

    Out: function ( k ) {

      if ( k < ( 1 / 2.75 ) ) {

        return 7.5625 * k * k;

      } else if ( k < ( 2 / 2.75 ) ) {

        return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;

      } else if ( k < ( 2.5 / 2.75 ) ) {

        return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;

      } else {

        return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;

      }

    },

    InOut: function ( k ) {

      if ( k < 0.5 ) return SPTWEEN.Easing.Bounce.In( k * 2 ) * 0.5;
      return SPTWEEN.Easing.Bounce.Out( k * 2 - 1 ) * 0.5 + 0.5;

    }

  }

};

SPTWEEN.Interpolation = {

  Linear: function ( v, k ) {

    var m = v.length - 1, f = m * k, i = Math.floor( f ), fn = SPTWEEN.Interpolation.Utils.Linear;

    if ( k < 0 ) return fn( v[ 0 ], v[ 1 ], f );
    if ( k > 1 ) return fn( v[ m ], v[ m - 1 ], m - f );

    return fn( v[ i ], v[ i + 1 > m ? m : i + 1 ], f - i );

  },

  Bezier: function ( v, k ) {

    var b = 0, n = v.length - 1, pw = Math.pow, bn = SPTWEEN.Interpolation.Utils.Bernstein, i;

    for ( i = 0; i <= n; i++ ) {
      b += pw( 1 - k, n - i ) * pw( k, i ) * v[ i ] * bn( n, i );
    }

    return b;

  },

  CatmullRom: function ( v, k ) {

    var m = v.length - 1, f = m * k, i = Math.floor( f ), fn = SPTWEEN.Interpolation.Utils.CatmullRom;

    if ( v[ 0 ] === v[ m ] ) {

      if ( k < 0 ) i = Math.floor( f = m * ( 1 + k ) );

      return fn( v[ ( i - 1 + m ) % m ], v[ i ], v[ ( i + 1 ) % m ], v[ ( i + 2 ) % m ], f - i );

    } else {

      if ( k < 0 ) return v[ 0 ] - ( fn( v[ 0 ], v[ 0 ], v[ 1 ], v[ 1 ], -f ) - v[ 0 ] );
      if ( k > 1 ) return v[ m ] - ( fn( v[ m ], v[ m ], v[ m - 1 ], v[ m - 1 ], f - m ) - v[ m ] );

      return fn( v[ i ? i - 1 : 0 ], v[ i ], v[ m < i + 1 ? m : i + 1 ], v[ m < i + 2 ? m : i + 2 ], f - i );

    }

  },

  Utils: {

    Linear: function ( p0, p1, t ) {

      return ( p1 - p0 ) * t + p0;

    },

    Bernstein: function ( n , i ) {

      var fc = SPTWEEN.Interpolation.Utils.Factorial;
      return fc( n ) / fc( i ) / fc( n - i );

    },

    Factorial: ( function () {

      var a = [ 1 ];

      return function ( n ) {

        var s = 1, i;
        if ( a[ n ] ) return a[ n ];
        for ( i = n; i > 1; i-- ) s *= i;
        a[ n ] = s;
        return s;
        // return a[ n ] = s;

      };

    } )(),

    CatmullRom: function ( p0, p1, p2, p3, t ) {

      var v0 = ( p2 - p0 ) * 0.5, v1 = ( p3 - p1 ) * 0.5, t2 = t * t, t3 = t * t2;
      return ( 2 * p1 - 2 * p2 + v0 + v1 ) * t3 + ( - 3 * p1 + 3 * p2 - 2 * v0 - v1 ) * t2 + v0 * t + p1;

    }

  }

};

if(typeof module !== 'undefined' && module.exports) {
  module.exports = SPTWEEN;
}

},{}]},{},[1]);
