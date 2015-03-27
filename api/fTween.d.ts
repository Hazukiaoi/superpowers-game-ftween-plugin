
declare module fTween {
  var Easing: SUPTWEEN.TweenEasing;
  var Interpolation: SUPTWEEN.TweenInterpolation;
  
  function update(time?: number);
  
  class Tween {
    constructor(from: Object, to: Object, duration: number, params?: Params);
    constructor(to: Object, duration: number, params?: Params);
    constructor(time: number, onComplete: TweenCallback, params?: Params);
    constructor(params: Params);
    constructor();
    
    set(params: Params);

    on(eventName: "onStart", callback?: TweenCallback): Tween;
    on(eventName: "onUpdate", callback?: TweenCallback): Tween;
    on(eventName: "onPause", callback?: TweenCallback): Tween;
    on(eventName: "onResume", callback?: TweenCallback): Tween;
    on(eventName: "onComplete", callback?: TweenCallback): Tween;
    on(eventName: "onStop", callback?: TweenCallback): Tween;
    on(eventName: string, callback?: TweenCallback): Tween;

    on(eventName: "onStart", callback?: TweenUpdateCallback): Tween;
    on(eventName: "onUpdate", callback?: TweenUpdateCallback): Tween;
    on(eventName: "onPause", callback?: TweenUpdateCallback): Tween;
    on(eventName: "onResume", callback?: TweenUpdateCallback): Tween;
    on(eventName: "onComplete", callback?: TweenUpdateCallback): Tween;
    on(eventName: "onStop", callback?: TweenUpdateCallback): Tween;
    on(eventName: string, callback?: TweenUpdateCallback): Tween;

    start(time?: number);
    pause();
    resume();
    stop();
    destroy();

    _inner: SUPTWEEN.Tween;
    to: Object;
    duration: number;
    time: number;
    from: Object;
    isRelative: boolean;
    delay: number;
    repeat: number;
    yoyo: boolean;
    easing: EasingFunction;
    interpolation: InterpolationFunction;
    isPaused: boolean;
    isCompleted: boolean;
    isDestroyed: boolean;
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
    easing?: EasingFunction;
    interpolation?: InterpolationFunction;
    destroyOnComplete?: boolean;
    onStart?: TweenCallback;
    onPause?: TweenCallback;
    onResume?: TweenCallback;
    onUpdate?: TweenUpdateCallback;
    onComplete?: TweenCallback;
    onStop?: TweenCallback;
    start?: number;
  }

  interface EasingFunction {
    (k:number): number;
  }
  interface InterpolationFunction {
    (v:number[], k:number): number;
  }

  interface TweenCallback {
    (): void;
  }
  interface TweenUpdateCallback {
    (progression:number): void;
  }
}
