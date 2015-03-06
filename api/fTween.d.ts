
declare module fTween {
  var Easing: SPTWEEN.TweenEasing;
  var Interpolation: SPTWEEN.TweenInterpolation;
  
  function update(time?: number): void;

  class Tween {
    constructor(from: Object, to: Object, duration: number, params?: Params);
    constructor(to: Object, duration: number, params?: Params);
    constructor(time: number, onComplete: Listener, params?: Params);
    constructor(params?: Params);
    
    set(params: Params);
    on(eventName: string, listener: Listener): Tween;
    on(eventName: string, listener: UpdateListener): Tween;
    off(eventName: string, listener: Function): Tween;
    start(time?: number);
    pause();
    resume();
    stop();
    destroy();

    emitter: any;
    _inner: SPTWEEN.Tween;
    to: Object;
    duration: number;
    time: number;
    from: Object;
    isRelative: boolean;
    delay: number;
    repeat: number;
    yoyo: boolean;
    easing: SPTWEEN.EasingFunction;
    interpolation: SPTWEEN.InterpolationFunction;
    isPaused: boolean;
    isCompleted: boolean;
    isDestroyed: boolean;
  } 

  interface Listener {
    (object: Object): void;
  }
  
  interface UpdateListener {
    (object: Object, progression: number): void;
  }
  
  interface Params {
    from?: Object;
    to?: Object;
    duration?: number;
    time?: number;
    isRelative?: boolean;
    delay?: number;
    repeat?: number;
    yoyo?: boolean;
    easing?: SPTWEEN.EasingFunction;
    interpolation?: SPTWEEN.InterpolationFunction;
    destroyOnComplete?: boolean;
    onStart?: Listener;
    onPause?: Listener;
    onResume?: Listener;
    onUpdate?: UpdateListener;
    onComplete?: Listener;
    onStop?: Listener;
    start?: number;
  }

  interface EasingFunction {
    (k:number): number;
  }
  interface InterpolationFunction {
    (v:number[], k:number): number;
  }
}
