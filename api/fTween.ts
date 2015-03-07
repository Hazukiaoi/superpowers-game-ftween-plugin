
var shortEventNames = [ "start", "pause", "resume", "update", "complete", "stop" ];
var eventNames = [ "onStart", "onPause", "onResume", "onUpdate", "onComplete", "onStop" ];

module fTween  {

  /**
  * The object containing the easing functions segregated into families (ie: `fTween.Easing.Cubic`) and variants (ie: `fTween.Easing.Cubic.In`).
  */
  var Easing = SUPTWEEN.Easing;
  
  /**
  * The object containing the interpolation functions (ie: `fTween.Interpolation.Cubic`).
  */
  var Interpolation = SUPTWEEN.Interpolation;

  /**
  * To be called from your game as often as possible (on every update).
  * Call `SUPTWEEN.update()` once to run all tweens once.
  * @param time The current timestamp in milliseconds.
  */
  function update( time?: number ) {
    SUPTWEEN.update();
  }

  export class Tween {
    /**
    * Returns an instance of `fTween.Tween`.
    * @param from The object containing the start values.
    * @param to The object containing the end values.
    * @param duration The time in seconds to complete the tween.
    * @param params An object containing parameters.
    * @returns The tween instance.
    */
    constructor( from: Object, to: Object, duration: number, params?: Params );
    constructor( to: Object, duration: number, params?: Params );
    constructor( params: Params );
    constructor();
    
    /**
    * @param time The time in seconds to complete the timer. Setting the `time` property makes the `from`, `to` and `duration` being ignored.
    * @param onComplete The listener for the `onComplete` event.
    */
    constructor( time: number, onComplete: Listener, params?: Params );

    constructor( ...args: any[] ) {
      var argsCount = args.length;
      var types: string[] = [];
      for ( var i=0; i<argsCount; i++ ) {
        types[i] = typeof args[i];
      }
      var params: any = {};

      if ( (argsCount === 3 || argsCount === 4) && types[0] === "object" && types[1] === "object" && types[2] === "number" ) {
        params = args[3] || {};
        params.from = args[0];
        params.to = args[1];
        params.duration = args[2];
      }
      else if ( (argsCount === 2 || argsCount === 3) && types[0] === "object" && types[1] === "number" ) {
        params = args[2] || {};
        params.to = args[0];
        params.duration = args[1];
      }
      else if ( (argsCount === 2 || argsCount === 3) && types[0] === "number" && types[1] === "function" ) {
        params = args[2] || {};
        params.time = args[0];
        params.onComplete = args[1];
      }
      else if ( argsCount === 1 && args[0] !== null && typeof args[0] === "object") {
        params = args[0] || {};
      }
      else if (argsCount > 0) {
        console.error( "fTween.Tween(): Unknow constructor with "+argsCount+" arguments, see details below" );
        for (var i = 0; i < args.length; i++) {
          console.log( "argument #"+i+": type="+types[i]+" value=", args[i]);
        }
      }
      
      var start = params.start;
      delete params.start;
      if ( Object.keys( params ).length > 0 ) {
        this.set( params );
      }

      if ( this._to !== undefined && this._duration > 0 &&
        (start === undefined || start >= 0) ) {
        this.start( start );
      }
    }

    // --------------------------------------------------------------------------------
    // methods

    /**
    * Sets several of the tweener's properties at once.
    * @param params The list of parameters.
    */
    set( params: Params ) {
      if ( this._isDestroyed === true ) {
        console.error("fTween.Tween(): This tween instance has been destroyed. It can not be used anymore. Create a new instance.");
        return;
      }

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
        if ( eventNames.indexOf( key ) !== -1 || shortEventNames.indexOf( key ) !== -1 ) {
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


    /**
    * Make the provided listener function listen for the specified event.
    * @param eventName The event name.
    * @param listener The listener function.
    * @returns The tween instance.
    */
    on( eventName: string, callback?: TweenCallback ): Tween;
    
    /**
    * @param listener The listener function for the `onUpdate` event.
    */
    on( eventName: string, callback?: TweenUpdateCallback ): Tween;

    on( eventName: string, callback?: Function ): Tween {
      var eventPos = shortEventNames.indexOf( eventName );
      eventName = eventNames[ enventPos ] || eventName; // transform short event name in "long" name or leave it as it is.
      if ( eventNames.indexOf( eventName ) === -1 ) {
        console.error( "fTween.Tween.on(): ERROR: wrong event name: "+eventName+". Expected values are:", shortEventNames, eventNames );
        return;
      }
      if ( callback === undefined ) {
        callback = null;
      }
      if ( eventName === "onComplete" ) {
        var userCallback = callback;
        var self = this;
        callback = function() {
          self._isComplete = true;
          if ( userCallback !== null ) {
            userCallback.call( this );
          }
          if ( self._destroyOnComplete === true ) {
            self.destroy();
          }
        }
      }
      this._tween[ eventName ]( callback );
      return this;
    }

    /**
    * Starts the tween.
    * Tweens are automatically started after their creation if the duration and the `to` object are supplied. You can prevent this by setting the `start` property to a negative value in the constructor's `params` argument. 
    * @param time The time (a timetamp in milliseconds) at which to start the tween.
    */
    start( time?: number ) {
      if ( this._to === undefined || this._duration === 0  ) {
        console.log( "fTween.Tween.start(): ERROR: Can't start the tweener now because The 'to' object and/or the duration have not been set: ", this._to, this._duration );
        return;
      }

      if ( this._from === undefined ) {
        this.from = {};
      }

      this._isComplete = false;
      if ( time !== undefined ) {
        if ( time < 0 ) {
          time = 0
        }
      }
      this._tween.start( time );
    }

    /**
    * Pause the tween, stopping the update of its values.
    */
    pause() { 
      this._isPaused = true;
      this._tween.pause(); 
    }

    /**
    * Resume the tween after it has been paused, resuming the update of its values where they have been paused.
    */
    resume() { 
      this._isPaused = false;
      this._tween.resume(); 
    }

    /**
    * Stop the tween, stopping the update of its values. 
    * A stopped tween can not be resumed, but can be restarted by calling start() again, with unpredictable results.
    */
    stop() { this._tween.stop(); }
    
    /**
    * Stop the tween and all its chained tweens then remove all its listeners and de-reference as much objects as possible to let them be garbage collected.
    */
    destroy() {
      this._tween.destroy();
      this._tween = null;
      this._from = null;
      this._to = null;
      this._isDestroyed = true;
    }

    /**
    * Check that the provided value is not too big.
    * If that's the case, suppose that it is a number of milliseconds instead of seconds and display a warning.
    * Called by duration, delay and time setters.
    * @param value The value.
    * @param propName The name of the evaluated property.
    */
    private _checkMilliseconds( value: number, propName: string ) {
      if ( value >= 500 ) {
        console.log( "fTween."+propName+": WARNING: The provided value '"+value+"' is superior to 500! The value has to be expressed in seconds, not in milliseconds. Are you sure you didn't meant the value to be '"+value/1000+"' seconds instead ?" );
      }
    }

    // --------------------------------------------------------------------------------
    // properties

    private _tween = new SUPTWEEN.Tween();
    /**
    * The `SUPTWEEN.Tween` instance that actually perform the tweening.
    */
    get _inner() { return this._tween; }


    private _to: Object;
    /**
    * The `to` object containing the end values.
    */
    set to( to: Object ) {
      this._to = to;
      this._tween.to( to );
    }
    get to(): Object { return this._to; }


    private _duration: number = 0;
    /**
    * The time in seconds to complete the tween.
    */
    set duration( duration: number ) {
      if ( duration < 0 ) {
        duration = 0
      }
      this._checkMilliseconds( duration, "duration" );
      this._tween.duration( duration * 1000 );
      this._duration = duration;
    } 
    get duration(): number { return this._duration; }


    /**
    * The time in seconds to complete the timer. Setting the `time` property makes the `from`, `to` and `duration` being ignored.
    */
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


    private _from: Object; // from has to exist but is completely optionnal
    /**
    * The `from` object containing the start values.
    */
    set from( from: Object ) {
      this._from = from;  
      this._tween.from( from );
    }
    get from(): Object { return this._from; }


    private _isRelative: boolean = false;
    /**
    * Tell whether to consider number values in the to object as relative (true) or absolute (false).
    */
    set isRelative( isRelative: boolean ) { 
      this._tween.isRelative( isRelative );
      this._isRelative = isRelative; 
    }
    get isRelative(): boolean { return this._isRelative; }


    private _delay: number = 0;
    /**
    * The time in milliseconds before the tween's values actually starts to updates after the tween has been started.
    */
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
    /**
    * The number of times the tween will repeat, after having completed once.
    */
    set repeat( repeat: number ) { 
      if ( repeat < 0 ) {
        repeat = 0;
      }
      this._tween.repeat( repeat );
      this._repeat = repeat; 
    }
    get repeat(): number { return this._repeat; }


    private _yoyo: boolean = false;
    /**
    * After having completed once and when repeat is strictly positive, tell whether the tween restart from its original state (false) (from 'from' to 'to', and repeat) or its current state (true) (from 'from' to 'to', then from 'to' to 'from', and repeat).
    */
    set yoyo( yoyo: boolean ) { 
      this._tween.yoyo( yoyo );
      this._yoyo = yoyo; 
    }
    get yoyo(): boolean { return this._yoyo; }


    private _easing: EasingFunction;
    /**
    * The easing function to use..
    */
    set easing( easing : EasingFunction ) { 
      this._tween.easing( easing );
      this._easing = easing; 
    }
    get easing(): EasingFunction { return this._easing; }


    private _interpolation: InterpolationFunction;
    /**
    * The interpolation function to use.
    */
    set interpolation( interpolation: InterpolationFunction ) {
      this._tween.interpolation( interpolation );
      this._interpolation = interpolation; 
    }
    get interpolation(): InterpolationFunction { return this._interpolation; }


    private _isPaused: boolean = false;
    /**
    * The tween's paused state. Use the `pause()` and `resume()` methods to control the paused state.
    */
    get isPaused(): boolean { return this._isPaused; }


    // (re)set to false in start()
    // set to true in the onComplete callback set in the constructor
    private _isComplete: boolean = false; 
    /**
    * The tween's completed state.
    */
    get isComplete(): boolean { return this._isComplete; }


    private _destroyOnComplete: boolean = true;
    /**
    * Tell whether to destroy the tween once it has completed (true), or not (false).
    */
    set destroyOnComplete( destroyOnComplete: boolean ) {
      this._destroyOnComplete = destroyOnComplete;
    }
    get destroyOnComplete(): boolean { return this._destroyOnComplete; }


    private _isDestroyed: boolean = false; 
    /**
    * The tween's destroyed state.
    */
    get isDestroyed(): boolean { return this._isDestroyed; }

  } // end of fTween.Tween class

  // --------------------------------------------------------------------------------

  export interface EasingFunction {
    (k:number): number;
  }
  export interface InterpolationFunction {
    (v:number[], k:number): number;
  }

  export interface TweenCallback {
    (): void;
  }
  export interface TweenUpdateCallback {
    (progression:number): void;
  }

  /**
  * Interface for the `params` argument of `fTween.Tween`'s constructors and `set()` function.
  */
  export interface Params {
    /**
    * The object containing the start values.
    */
    from?: Object;
    /** 
    * The object containing the end values.
    */
    to?: Object;
    /**
    * The time in seconds to complete the tween.
    */
    duration?: number;
    /**
    * The time in seconds to complete the timer. Setting the `time` property makes the `from`, `to` and `duration` being ignored.
    */
    time?: number;
    /**
    * Tell whether to consider number values in the to object as relative (true) or absolute (false).
    */
    isRelative?: boolean;
    /**
    * The time in seconds before the tween's values actually starts to updates after the tween has been started.
    */
    delay?: number;
    /**
    * The number of times the tween will repeat, after having completed once.
    */
    repeat?: number;
    /**
    * After having completed once and when repeat is strictly positive, tell whether the tween restart from its original state (false) (from 'from' to 'to', and repeat) or its current state (true) (from 'from' to 'to', then from 'to' to 'from', and repeat).
    */
    yoyo?: boolean;
    /**
    * The easing function to use.
    */
    easing?: EasingFunction;
    /**
    * The interpolation function to use.
    */
    interpolation?: InterpolationFunction;
    /**
    * Tell whether to destroy the tween once it has completed (true), or not (false).
    */
    destroyOnComplete?: boolean;
    /**
    * The callback for the `onStart` event.
    */
    onStart?: TweenCallback;
    /**
    * The callback for the `onPause` event.
    */
    onPause?: TweenCallback;
    /**
    * The callback for the `onResume` event.
    */
    onResume?: TweenCallback;
    /**
    * The callback for the `onUpdate` event.
    */
    onUpdate?: TweenUpdateCallback;
    /**
    * The callback for the `onComple` event.
    */
    onComplete?: TweenCallback;
    /**
    * The callback for the `onStop` event.
    */
    onStop?: TweenCallback;
    /**
    * The time (a timetamp in milliseconds) at which to start the tween. Tweens are automatically started at the time they are created, so you may set the property to a negative value to prevent it to be started at all, or set any other time you like. 
    */
    start?: number;
  }
} // end of fTween module

var fAnimate: typeof fTween.Tween = fTween.Tween;

/*
var proto: any = Sup.Actor.prototype;
var proto2 = Sup.Actor.prototype;
// storing the prototype in a variable of type any is necessary
// doing otherwise cause an error of type "'animate' does not exist on type 'Actor'"
proto.animate = function( to:Object, duration:number, params?:fTween.Params ) {
  return new fTween.Tween( this, to, duration, params );
};

var proto: any = Sup.ActorComponent.prototype;
proto.animate = function( to:Object, duration:number, params?:fTween.Params ) {
  return new fTween.Tween( this, to, duration, params );
};
*/
