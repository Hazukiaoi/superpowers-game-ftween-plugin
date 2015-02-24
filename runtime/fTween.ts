/// <reference path="../../../tween.js/sp-tween.js.d.ts" />

import TWEEN = require("sp-tween")
import EventEmitter = require("events").EventEmitter

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
* @property {object} from - The object containing the start values. Optional only if the 'target' property is set in the parameters.
* @property {object} to - The object containing the end values.
* @property {number} duration - The time in __milliseconds__ to complete the tweener.
* @property {object} target - An object from which the values of the properties may be get, and on which auto tween the properties.
* @property {boolean} autoUpdateTarget - Tell whether to automatically update the properties on the target (true) or not (false). If set to true, the onUpdate callback can't be set.
* @property {number} delay - The time in milliseconds before the tweener's values actually starts to updates after the tweener has been started.
* @property {number} repeat - The number of times the tweener will repeat, after having completed once.
* @property {boolean} yoyo - After having completed once and when repeat is strictly positive, tell whether the tweener restart from its original state (false) (from 'from' to 'to', and repeat) or its current state (true) (from 'from' to 'to', then from 'to' to 'from', and repeat).
* @property {EasingFunction} easing - The easing function to use. If set as a string, it must contains the family and the variant, separated by a period (ie: "Linear.None", "Cubic.InOut").
* @property {InterpolationFunction} interpolation - The interpolation function to use. As a string: ie: "Linear", "Bezier".
* @property {number} start - The time at which to start the tweener. fTweens are automatically started at the time they are created, so you may set the property to false to prevent it to be started at all, or set any other time you like. 
* @property {fTweenListener} onStart - The callback when the tweener starts.
* @property {fTweenListener} onPause - The callback when the tweener pauses.
* @property {fTweenListener} onResume - The callback when the tweener resume after a pause.
* @property {fTweenUpdateListener} onUpdate - The callback when the tweener updates. Can not be set when the target is automatically updated.
* @property {fTweenListener} onComplete - The callback when the tweener completes.
* @property {fTweenListener} onStop - The callback when the tweener stops.
* @property {object} eventsContext - The context object the callbacks shoud be called on (the value of their 'this' variable).
*/
export interface fTweenParams {
  from?: Object;
  to?: Object;
  duration?: number;
  target?: Object;
  autoTweenTarget?: boolean;
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
  eventsContext?: Object;
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

/**
* Extends dest (in place) with the values found in source, based on the keys found in ref (if ref is not defined ref=source)
*/
var _extends = function( dest, source, ref ) {
  var key, nKey, value, nSource;
  for ( key in ref ) {
    if( dest[ key ] === undefined ) {
      value = source[ key ];
      if ( value === Object( value ) ) {
        nSource = value;
        value = {};
        for ( nKey in nSource ) {
          value[ nKey ] = nSource[ nKey ];
        }
      }
      dest[ key ] = value;
    }
  }
}

// replace the all the content of dest by a copy of the content of source
var _exactCopy = function( dest, source ) {
  var key, nKey, sourceValue, destValue, nObject, nDestValue;

  // add or update in dest from the values in source.
  for ( key in source ) {
    
    sourceValue = source[ key ];
    destValue = dest[ key ];
    if ( sourceValue === Object( sourceValue ) ) {
      // TODO: it's probably a Vector3 or some other similar kind of data
      // check if there is a clone() function available

      if ( destValue === undefined ) {
        destValue = {};
      }

      for ( nKey in sourceValue ) {
        nDestValue = parseFloat( sourceValue[ nKey ] );
        if ( isNaN( nDestValue ) === false ) { // true for numbers and string that convert to numbers
          destValue[ nKey ] = nDestValue;
        }
      }
    }
    else {
      destValue = sourceValue;
    }
    
    dest[ key ] = destValue;
  }

  // remove from dest the keys that are not in source
  var keys = Object.keys( dest );
  for ( var i = 0; i < keys.length; i++ ) {
    if ( source[ keys[ i ] ] === undefined ) {
      delete dest[ keys[ i ] ];
    }
  }
}

// the 'this' variable inside the callbacks is the 'from' object
var _onStart = function() { this._tweener.emit( "onStart",  this ); }
var _onPause = function() { this._tweener.emit( "onPause",  this ); }
var _onResume = function() { this._tweener.emit( "onResume", this ); }
var _onUpdate = function( progression: number ) { this._tweener.emit( "onUpdate", this, progression ); }
var _onComplete = function() { this._tweener.emit( "onComplete", this ); }
var _onStop = function() { this._tweener.emit( "onStop", this ); }

export class fTween extends EventEmitter {

  /**
  * @property {TweenEasing} Easing - Object containing the easing functionssegregated into families (ie: fTween.Easing.Cubic) and variants (ie: fTween.Easing.Cubic.In).
  */
  static Easing: TweenEasing = TWEEN.Easing;
  
  /**
  * @property {TweenInterpolation} Interpolation - Object containing the interpolation functions (ie: fTween.Interpolation.Cubic).
  */
  static Interpolation: TweenInterpolation = TWEEN.Interpolation;


  constructor( time: number, onComplete: fTweenListener, params?: fTweenParams );
  constructor( to: Object, duration: number, params?: fTweenParams );
  constructor( from: Object, to: Object, duration: number, params?: fTweenParams );
  constructor( to: Object, duration: number, target: Object, params?: fTweenParams );

  /**
  * Creates a new fTween instance. 
  * @constructor
  * @param {fTweenParams} [params={}] - The list of parameters. See the arguments list of set() for the list of its expected properties.
  * @returns {fTween} The new fTween instance.
  */
  constructor( params: fTweenParams = {} ) {
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
    if ( params.target !== undefined ) {
      this.target = params.target;
      delete params.target;
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

  // called by from() setter
  private _populateFromTarget() {
    var key, nKey, targetValue, nObject, nTargetValue;
    for ( key in this._to ) {

      if( this._from[ key ] === undefined ) {
        targetValue = this._target[ key ];

        if ( targetValue === Object( targetValue ) ) {
          // 17/02 TODO: it's probably a Vector3 or some other similar kind of data
          // check if there is a clone() function available
          // 18/02: actually if this is a vector3, it is mostlikely newly created and we don't event need to copy it

          if ( typeof targetValue.clone === "function" ) {
            targetValue = targetValue.clone();
          }
          else {
            nObject = targetValue;
            targetValue = {};
            for ( nKey in nObject ) {
              nTargetValue = nObject[ nKey ];
              if ( typeof nTargetValue === "number" ) {
                targetValue[ nKey ] = nTargetValue;
              }
            }
          }
        }

        else if ( targetValue === undefined ) {
          console.log( "Tweener._populateFromTarget(): WARNING: The value of the property '"+key+"' in the 'to' object is undefined on the 'from' object (that's fine) but also on the 'target' object (that's NOT OK). Setting a value of '0' on the 'from' object." );
          targetValue = 0;
        }

        this._from[ key ] = targetValue;
      }

    }
    this._isFromPopulated = true;
  }

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

  // keep the original values in the from object of an absolute tween
  // set in start(), used in reset()
  private _resetFrom: Object = {}; 


  private _isFromPopulated: boolean = false;

  /**
  * @property {object} from - The object containing the start values. Optional only if the 'target' property is set.
  */
  private _from: Object; // from has to exist but is completely optionnal
  set from( from: Object ) {
    if ( this._to !== undefined && this._target !== undefined ) {
      this._populateFromTarget();
    }
    from._tweener = this; // used in the callbacks
    this._from = from;  
    this._tween.from( from );
  }
  get from(): Object { return this._from; }


  private _to: Object;
  set to( to: Object ) {
    this._to = to;
    this._tween.to( to );
    if ( this._from !== undefined && this._target !== undefined ) {
      this._populateFromTarget();
    }
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
  // target

  private _autoUpdateListener: fTweenUpdateListener = function( object: Object, progression: number ) {
    // because the function has been binded to the target object,
    // the 'this' variable here is the target object
    for ( var key in object ) {
      // TODO: allow the key to be a dynamic property
      if ( key !== "_tweener" ) {
        this[ key ] = object[ key ];
      }
    }
  }

  private _autoUpdateBindedListener: fTweenUpdateListener;
  private _autoUpdateTarget: boolean = true;
  set autoUpdateTarget( autoUpdateTarget: boolean ) { 
    this._setupAutoUpdate( autoUpdateTarget );
    this._autoUpdateTarget = autoUpdateTarget; 
  }
  get autoUpdateTarget(): boolean { return this._autoUpdateTarget; }

  private _setupAutoUpdate( setup: boolean = true ) {
    if ( setup === true ) {
      if ( this._autoUpdateBindedListener !== undefined ) {
        this._setupAutoUpdate( false );
      }
      this._autoUpdateBindedListener = this._autoUpdateListener.bind( this._target );
      this.on( "onUpdate", this._autoUpdateBindedListener );
    } 
    else if ( this._autoUpdateBindedListener !== undefined ) {
      this.removeListener( "onUpdate", this._autoUpdateBindedListener );
      this._autoUpdateBindedListener = undefined;
    }
  }

  private _target: Object;
  set target( target: Object ) { 
    this._target = target;
    this._setupAutoUpdate( this._autoUpdateTarget );
    if ( this._from !== undefined && this._to !== undefined ) {
      this._populateFromTarget();
    }
  }
  get target(): Object { return this._target; }

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
    // listener = listener.bind( context || this.target || this );
    // TODO: check if it's really usefull to set an automatic context
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
    if ( this._isRelative === false ) {
      _exactCopy( this._resetFrom, this._from );
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

  /*reset() {
    this._isCompleted = false;
    if ( this._isRelative === false ) {
      _exactCopy( this._from, this._resetFrom );
    }
    this.emit( "reset", this._from );
  }*/
  
  destroy() {
    this.stop();
    this._tween.destroy();
    this._tween = null;
    this._from = null;
    this._to = null;
    this._target = null;
    this._autoUpdateBindedListener = null;
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
  animate( to: Object, duration: number, params?: Object ): fTween {
    return new fTween( to, duration, this, params );
  }
}

export class ActorComponent {
  animate( to: Object, duration: number, params?: Object ): fTween {
    return new fTween( to, duration, this, params );
  }
}
