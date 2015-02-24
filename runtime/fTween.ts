/// <reference path="../gitignore/node0.11.d.ts" />
/// <reference path="../node_modules/superpowers-tween/superpowers-tween.d.ts" />

import TWEEN = require("TWEEN");
import events = require("events");
import EventEmitter = events.EventEmitter;

/**
* @interface fTweenListener
* @this The callback's context as set via the 'params.callbacksContext' property or the 'context' argument of setCallback()
* @param {object} value - The object containing the values.
*/
export interface fTweenListener {
  ( object: Object ): void;
}

/**
* @interface fTweenUpdateListener
* @this The callback's context as set via the 'params.callbacksContext' property or the 'context' argument of setCallback()
* @param {object} value - The object containing the values.
* @param {number} progression - The tweener's percentage of progression as a number between 0 and 1.
*/
export interface fTweenUpdateListener {
  ( object: Object, progression: number ): void;
}

export interface EasingFunction {
  ( k: number ): number;
}

export interface InterpolationFunction {
  ( v: number[], k: number ): number;
}

/**
* @interface fTweenParams
* @property {object} from - The object containing the start values. Optional 
* @property {object} to - The object containing the end values.
* @property {number} duration - The time in __milliseconds__ to complete the tweener.
* @property {number} delay - The time in milliseconds before the tweener's values actually starts to updates after the tweener has been started.
* @property {number} repeat - The number of times the tweener will repeat, after having completed once.
* @property {boolean} yoyo - After having completed once and when repeat is strictly positive, tell whether the tweener restart from its original state (false) (from 'from' to 'to', and repeat) or its current state (true) (from 'from' to 'to', then from 'to' to 'from', and repeat).
* @property {EasingFunction} easing - The easing function to use. If set as a string, it must contains the family and the variant, separated by a period (ie: "Linear.None", "Cubic.InOut").
* @property {InterpolationFunction} interpolation - The interpolation function to use. As a string: ie: "Linear", "Bezier".
* @property {number} start - The time at which to start the tweener. fTweens are automatically started at the time they are created, so you may set the property to false to prevent it to be started at all, or set any other time you like. 
* @property {fTweenListener} onStart - The listener for when the tweener starts.
* @property {fTweenListener} onPause - The listener for when the tweener pauses.
* @property {fTweenListener} onResume - The listener for when the tweener resume after a pause.
* @property {fTweenUpdateListener} onUpdate - The listener for when the tweener updates. 
* @property {fTweenListener} onComplete - The listener for when the tweener completes.
* @property {fTweenListener} onStop - The listener for when the tweener stops.
*/
export interface fTweenParams {
  from?: Object;
  to?: Object;
  duration?: number;
  delay?: number;
  repeat?: number;
  yoyo?: boolean;
  easing?: EasingFunction;
  interpolation?: InterpolationFunction;
  onStart?: fTweenListener;
  onPause?: fTweenListener;
  onResume?: fTweenListener;
  onUpdate?: fTweenUpdateListener;
  onComplete?: fTweenListener;
  onStop?: fTweenListener;
  start?: number;
}


var eventNames = [
  "onStart",
  "onPause",
  "onResume",
  "onUpdate",
  "onComplete",
  "onStop"
];

var shortEventNames = [
  "start",
  "pause",
  "resume",
  "update",
  "complete",
  "stop"
];


// the 'this' variable inside the callbacks is the 'from' object
var _onStart: TWEEN.TweenCallback = function() { this._tweener.emit( "onStart",  this ); }
var _onPause: TWEEN.TweenCallback = function() { this._tweener.emit( "onPause",  this ); }
var _onResume: TWEEN.TweenCallback = function() { this._tweener.emit( "onResume", this ); }
var _onUpdate: TWEEN.TweenUpdateCallback = function( progression: number ) { this._tweener.emit( "onUpdate", this, progression ); }
var _onComplete: TWEEN.TweenCallback = function() { this._tweener.emit( "onComplete", this ); }
var _onStop: TWEEN.TweenCallback = function() { this._tweener.emit( "onStop", this ); }

export class fTween extends EventEmitter {

  /**
  * @property {TweenEasing} Easing - Object containing the easing functionssegregated into families (ie: fTween.Easing.Cubic) and variants (ie: fTween.Easing.Cubic.In).
  */
  static Easing: TweenEasing = TWEEN.Easing;
  
  /**
  * @property {TweenInterpolation} Interpolation - Object containing the interpolation functions (ie: fTween.Interpolation.Cubic).
  */
  static Interpolation: TweenInterpolation = TWEEN.Interpolation;

  constructor( from: Object, to: Object, duration: number, params?: fTweenParams );
  constructor( to: Object, duration: number, params?: fTweenParams );
  constructor( params: fTweenParams );
  constructor( time: number, onComplete: fTweenListener, params?: fTweenParams );

  /**
  * Creates a new fTween instance. 
  * @constructor
  * @param {fTweenParams} [params={}] - The list of parameters. See the arguments list of set() for the list of its expected properties.
  * @returns {fTween} The new fTween instance.
  */
  constructor( ...args ) {
    super();

    this._tween = new TWEEN.Tween()
    .onStart( _onStart )
    .onPause( _onPause )
    .onResume( _onResume )
    .onUpdate( _onUpdate )
    .onComplete( _onComplete )
    .onStop( _onStop );

    var start = params.start;
    delete params.start;
    this.set( params );

    if ( this._from !== undefined && this._to !== undefined && this._duration > 0 &&
      (start === undefined || start >= 0) ) {
      this.start( start );
    }
  }

  /**
  * Sets several of the tweener's properties at once.
  * @param {fTweenParams} params - The list of parameters.
  */
  set( params: fTweenParams ) {
    if ( params.from !== undefined ) {
      this.from = params.from;
      delete params.from;
    }
    if ( params.to !== undefined ) {
      this.to = params.to;
      delete params.to;
    }

    var start = params.start;
    delete params.start;
          
    for ( var key in params ) {
      if ( key in eventNames === true ) {
        this.on( key, params[ key ] )
      }
      else {
        this[ key ] = params[ key ];
      }
    }

    if ( typeof start === "number" && start >= 0 ) {
      this.start( start );
    }
  }

  // --------------------------------------------------------------------------------
  // some helpers

  // called by duration, delay, time setter
  private _checkMilliseconds( value: number, propName: string ) {
    if ( value >= 500 ) {
      console.log( "fTween."+propName+": WARNING: The provided value '"+value+"' is superior to 500! The value has to be expressed in seconds, not in milliseconds. Are you sure you didn't meant the value to be '"+value/1000+"' seconds instead ?" );
      /*console.log( "fTween."+propName+": WARNING: The provided value '"+value+"' is inferior to 100! The value has to be expressed in milliseconds, not in seconds. Are you sure you didn't meant the value to be '"+value*1000+"' ms instead ?" );*/
    }
  }

  // --------------------------------------------------------------------------------
  // properties

  private _tween: TWEEN.Tween;
  get _inner(): TWEEN.Tween { return this._tween; }

  /**
  * @property {object} from - The object containing the start values.
  */
  private _from: Object; // from has to exist but is completely optionnal
  set from( from: Object ) {
    from._tweener = this; // used in the callbacks
    this._from = from;  
    this._tween.from( from );
  }
  get from(): Object { return this._from; }


  private _to: Object;
  set to( to: Object ) {
    this._to = to;
    this._tween.to( to );
  }
  get to(): Object { return this._to; }


  private _isRelative: boolean = false;
  set isRelative( isRelative: boolean ) { 
    this._tween.isRelative( isRelative );
    this._isRelative = isRelative; 
  }
  get isRelative(): boolean { return this._isRelative; }


  private _duration: number = 0;
  set duration( duration: number ) {
    if ( duration < 0 ) {
      duration = 0
    }
    this._checkMilliseconds( duration, "duration" );
    this._tween.duration( duration * 1000 );
    this._duration = duration;
  } 
  get duration(): number { return this._duration; }


  set time( time: number ) {
    if ( time < 0 ) {
      time = 0
    }
    this._checkMilliseconds( time, "time" );
    this.from = { elapsedTime: 0, remainingTime: time };
    this.to = { elapsedTime: time, remainingTime: 0 };
    this.duration = time;
  }
  get time(): number { return this._duration; }


  private _delay: number = 0;
  set delay( delay: number ) { 
    if ( delay < 0 ) {
      delay = 0;
    }
    this._checkMilliseconds( delay, "delay" );
    this._tween.delay( delay * 1000 );
    this._delay = delay;
  } 
  get delay(): number { return this._delay; }


  private _repeat: number = 0;
  set repeat( repeat: number ) { 
    if ( repeat < 0 ) {
      repeat = 0;
    }
    this._tween.repeat( repeat );
    this._repeat = repeat; 
  }
  get repeat(): number { return this._repeat; }


  private _yoyo: boolean = false;
  set yoyo( yoyo: boolean ) { 
    this._tween.yoyo( yoyo );
    this._yoyo = yoyo; 
  }
  get yoyo(): boolean { return this._yoyo; }


  private _easing: EasingFunction;
  set easing( easing: EasingFunction ) { this._easing = easing; }
  get easing(): EasingFunction { return this._easing; }


  private _interpolation: InterpolationFunction;
  set interpolation( interpolation: InterpolationFunction ) { this._interpolation = interpolation; }
  get interpolation(): InterpolationFunction { return this._interpolation; }


  private _isPaused: boolean = false;
  get isPaused(): boolean { return this._isPaused; }

  private _isCompleted: boolean = false;
  get isCompleted(): boolean { return this._isCompleted; }

  // --------------------------------------------------------------------------------
  // Events

  on( eventName: string, listener: fTweenListener|fTweenUpdateListener ) {
    if ( eventName in shortEventNames === true ) {
      eventName = "on" + eventName.charAt(0).toUpperCase() + eventName.slice(1);
    }
    else if ( eventName in eventNames === false ) {
      console.log( "fTween.on(): ERROR: wrong event name: "+eventName );
      return;
    }
    super.on( eventName, listener );
  }

  // --------------------------------------------------------------------------------
  // Control functions  
  
  start( time?: number ) {
    if ( this._to === undefined || this._duration === 0  ) {
      console.log( "fTween.start(): ERROR: Can't start the tweener now because The 'to' object and/or the duration have not been set: ", this._to, this._duration );
      return;
    }

    if ( this._from === undefined ) {
      this.from = {};
    }

    this._isCompleted = false;
    if ( time !== undefined ) {
      if ( time < 0 ) {
        time = 0
      }
    }
    this._tween.start( time );
  }

  pause() { 
    this._isPaused = true;
    this._tween.pause(); 
  }
  resume() { 
    this._isPaused = false;
    this._tween.resume(); 
  }
  stop() { this._tween.stop(); }
  
  destroy() {
    this.stop();
    this._tween.destroy();
    this._tween = null;
    this._from = null;
    this._to = null;
    this.removeAllListeners();
  }

  // --------------------------------------------------------------------------------
  // Update

  static update( time: number ) {
    TWEEN.update();
    requestAnimationFrame( fTween.update );
  }
}

requestAnimationFrame( fTween.update );

// --------------------------------------------------------------------------------

export class Actor {
  animate( to: Object, duration: number, params?: fTweenParams ): fTween {
    return new fTween( this, to, duration, params );
  }
}

export class ActorComponent {
  animate( to: Object, duration: number, params?: fTweenParams ): fTween {
    return new fTween( this, to, duration, params );
  }
}
