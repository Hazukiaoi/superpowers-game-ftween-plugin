/// <reference path="../../../tweenjs/typescript/superpowers-tween.js.d.ts" />
/// <reference path="../gitignore/node0.11.d.ts" />

module Sup {
  export class Actor {
    /**
    * Animate the specified properties of the actor to the specified end values during the duration.
    * @param {Object} to - The object containing the end values.
    * @param {number} duration - The time in __second__ to complete the animation.
    * @returns {fTween.Tween} The tween instance.
    */
    animate( to: Object, duration: number, params?: fTween.Params ): fTween.Tween {
      return new fTween.Tween( this, to, duration, params );
    }
  }

  export class ActorComponent {
    /**
    * Animate the specified properties of the actor component to the specified end values during the duration.
    * @param {Object} to - The object containing the end values.
    * @param {number} duration - The time in __second__ to complete the animation.
    * @returns {fTween.Tween} The tween instance.
    */
    animate( to: Object, duration: number, params?: fTween.Params ): fTween.Tween {
      return new fTween.Tween( this, to, duration, params );
    }
  }
}

import events = require("events");

requestAnimationFrame( fTween.Tween.update );

var eventNames = [ "onStart", "onPause", "onResume", "onUpdate", "onComplete", "onStop" ];
var shortEventNames = [ "start", "pause", "resume", "update", "complete", "stop" ];

module fTween  {

  export class Tween extends events.EventEmitter {

    /**
    * @static
    * @property {SPTWEEN.TweenEasing} Easing - Object containing the easing functionssegregated into families (ie: fTween.Easing.Cubic) and variants (ie: fTween.Easing.Cubic.In).
    */
    static Easing: SPTWEEN.TweenEasing = SPTWEEN.Easing;
    
    /**
    * @static
    * @property {TweenTweenInterpolation} Interpolation - Object containing the interpolation functions (ie: fTween.Interpolation.Cubic).
    */
    static Interpolation: SPTWEEN.TweenInterpolation = SPTWEEN.Interpolation;

    /**
    * @static
    * @params {number} [time] - The current timestamp in milliseconds.
    */
    static update( time?: number ) {
      SPTWEEN.update();
      requestAnimationFrame( fTween.Tween.update );
    }

    // --------------------------------------------------------------------------------
    // constructors
    
    /**
    * Creates a new fTween.Tween instance. 
    * @constructor
    * @param {Object} from - The object containing the start values.
    * @param {Object} to - The object containing the end values.
    * @param {number} duration - The time in seconds to complete the tween.
    * @param {fTween.Params} [params] - An object containing additional parameters.
    * @returns {fTween.Tween} The tween instance.
    */
    constructor( from: Object, to: Object, duration: number, params?: Params );
    
    /**
    * Creates a new fTween.Tween instance. 
    * @constructor
    * @param {Object} to - The object containing the end values.
    * @param {number} duration - The time in seconds to complete the tween.
    * @param {fTween.Params} [params] - An object containing additional parameters.
    * @returns {fTween.Tween} The tween instance.
    */
    constructor( to: Object, duration: number, params?: Params );

    /**
    * Creates a new fTween.Tween instance. 
    * @constructor
    * @param {time} time - The time in seconds to complete the timer. Setting the `time` property makes the `from`, `to` and `duration` being ignored.
    * @param {fTween.Listener} - The listener for the `onComplete` event.
    * @param {fTween.Params} [params] - An object containing additional parameters.
    * @returns {fTween.Tween} The tween instance.
    */
    constructor( time: number, onComplete: Listener, params?: Params );
    /**
    * Creates a new fTween.Tween instance. 
    * @constructor
    * @param {fTween.Params} params - An object containing parameters.
    * @returns {fTween.Tween} The tween instance.
    */
    constructor( params: Params );

    // constructor( from: any, to?: any, duration?: any, params?: Params ) {
    constructor( ...args: any[] ) {
      super();

      var argsCount = args.length;
      var types: string[] = [];
      for ( var i=0; i<argsCount; i++ ) {
        types[i] = typeof args[i];
      }
      var params: fTween.Params;

      if ( argsCount === 4 && types[0] === "object" && types[1] === "object" && types[2] === "number" ) {
        // n°1
        params = args[3] || {};
        params.from = args[0];
        params.to = args[1];
        params.duration = args[2];
      }
      else if ( argsCount === 3 && types[0] === "object" && types[1] === "number" ) {
        // n°2
        params = args[2] || {};
        params.to = args[0];
        params.duration = args[1];
      }
      else if ( argsCount === 3 && types[0] === "number" && types[1] === "Listener" ) {
        // n°3
        params = args[2] || {};
        params.time = args[0];
        params.onComplete = args[1];
      }
      else if ( argsCount === 1 && args[0] !== null && typeof args[1] === "fTween.Params") {
        // n°4
        params = args[0] || {};
      }
      else {
        throw "unknow constructor";
      }


      this._tween = new SPTWEEN.Tween( {} );

      var self = this;
      // the 'this' variable inside the callbacks is the 'from' object
      // TODO: only register a callback when a function listen for the event (especially onUpdate)
      this._tween.onStart( function() { self.emit( "onStart", this ); } )
      .onPause( function() { self.emit( "onPause", this ); } )
      .onResume( function() { self.emit( "onResume", this ); } )
      .onUpdate( function(progression:number) { self.emit( "onUpdate", this, progression ); } )
      .onComplete( function() { self.emit( "onComplete", this ); } )
      .onStop( function() { self.emit( "onStop", this ); } );

      var start = params.start;
      delete params.start;
      this.set( params );

      if ( this._from !== undefined && this._to !== undefined && this._duration > 0 &&
        (start === undefined || start >= 0) ) {
        this.start( start );
      }
    }

    // --------------------------------------------------------------------------------
    // methods
    /**
    * Sets several of the tweener's properties at once.
    * @param {fTween.Params} params - The list of parameters.
    */
    set( params: fTween.Params ) {
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

    on( eventName: string, listener: Listener ): any;
    on( eventName: string, listener: fTween.UpdateListener ): any;
    on( eventName: string, listener: Function ): Tween {
      if ( eventName in shortEventNames === true ) {
        eventName = "on" + eventName.charAt(0).toUpperCase() + eventName.slice(1);
      }
      else if ( eventName in eventNames === false ) {
        console.log( "fTween.on(): ERROR: wrong event name: "+eventName );
        return;
      }
      super.on( eventName, listener );
      return this;
    }
   
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


    // called by duration, delay, time setter
    private _checkMilliseconds( value: number, propName: string ) {
      if ( value >= 500 ) {
        console.log( "fTween."+propName+": WARNING: The provided value '"+value+"' is superior to 500! The value has to be expressed in seconds, not in milliseconds. Are you sure you didn't meant the value to be '"+value/1000+"' seconds instead ?" );
      }
    }

    // --------------------------------------------------------------------------------
    // properties

    private _tween: SPTWEEN.Tween;
    get _inner(): SPTWEEN.Tween { return this._tween; }

    private _to: Object;
    set to( to: Object ) {
      this._to = to;
      this._tween.to( to );
    }
    get to(): Object { return this._to; }

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


    /**
    * @property {object} from - The object containing the start values.
    */
    private _from: Object; // from has to exist but is completely optionnal
    set from( from: Object ) {
      this._from = from;  
      this._tween.from( from );
    }
    get from(): Object { return this._from; }

    private _isRelative: boolean = false;
    set isRelative( isRelative: boolean ) { 
      this._tween.isRelative( isRelative );
      this._isRelative = isRelative; 
    }
    get isRelative(): boolean { return this._isRelative; }

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

    private _easing: SPTWEEN.EasingFunction;
    set easing( easing: SPTWEEN.EasingFunction ) { this._easing = easing; }
    get easing(): SPTWEEN.EasingFunction { return this._easing; }

    private _interpolation: SPTWEEN.InterpolationFunction;
    set interpolation( interpolation: SPTWEEN.InterpolationFunction ) { this._interpolation = interpolation; }
    get interpolation(): SPTWEEN.InterpolationFunction { return this._interpolation; }

    private _isPaused: boolean = false;
    get isPaused(): boolean { return this._isPaused; }

    private _isCompleted: boolean = false;
    get isCompleted(): boolean { return this._isCompleted; }
  } // end class fTween.Tween

  /**
  * @interface fTween.UpdateListener
  * Interface for fTween.Tween's listener functions.
  * @param {object} value - The 'from' object containing the values.
  */
  export interface Listener {
    (object: Object): void;
  }

  /**
  * @interface fTween.UpdateListener
  * Interface for fTween.Tween's onUpdate listener functions.
  * @param {object} value - The 'from' object containing the values.
  * @param {number} progression - The tween's percentage of progression as a number between 0 and 1.
  */
  export interface UpdateListener {
    (object: Object, progression: number): void;
  }

  /**
  * @interface fTween.Params
  * Interface for the 'params' object argument of the fTween.Tween's constructors and set() function.
  * @property {Object} [from] - The object containing the start values.
  * @property {Object} to - The object containing the end values.
  * @property {number} duration - The time in seconds to complete the tween.
  * @property {number} time - The time in seconds to complete the timer. Setting the `time` property makes the `from`, `to` and `duration` being ignored.
  * @property {boolean} isRelative - Tell whether to consider number values in the to object as relative (true) or absolute (false).
  * @property {number} delay - The time in milliseconds before the tween's values actually starts to updates after the tween has been started.
  * @property {number} repeat - The number of times the tween will repeat, after having completed once.
  * @property {boolean} yoyo - After having completed once and when repeat is strictly positive, tell whether the tween restart from its original state (false) (from 'from' to 'to', and repeat) or its current state (true) (from 'from' to 'to', then from 'to' to 'from', and repeat).
  * @property {SPTWEEN.EasingFunction} easing - The easing function to use..
  * @property {SPTWEEN.InterpolationFunction} interpolation - The interpolation function to use.
  * @property {fTween.Listener} onStart - The listener for the `onStart` event.
  * @property {fTween.Listener} onPause - The listener for the `onPause` event.
  * @property {fTween.Listener} onResume - The listener for the `onResume` event.
  * @property {fTween.UpdateListener} onUpdate - The listener for the `onUpdate` event. 
  * @property {fTween.Listener} onComplete - The listener for the `onComplete` event.
  * @property {fTween.Listener} onStop - The listener for the `onStop` event.
  * @property {number} start - The time at which to start the tween. Tweens are automatically started at the time they are created, so you may set the property to a negative value to prevent it to be started at all, or set any other time you like. 
  */
  export interface Params {
    from?: Object;
    to?: Object;
    duration?: number;
    time?: number;
    isRelative: boolean;
    delay?: number;
    repeat?: number;
    yoyo?: boolean;
    easing?: SPTWEEN.EasingFunction;
    interpolation?: SPTWEEN.InterpolationFunction;
    onStart?: Listener;
    onPause?: Listener;
    onResume?: Listener;
    onUpdate?: UpdateListener;
    onComplete?: Listener;
    onStop?: Listener;
    start?: number;
  }
}// end module fTween
