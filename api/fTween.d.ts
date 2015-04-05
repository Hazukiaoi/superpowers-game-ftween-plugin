// fTween plugin
// https://github.com/florentpoujol/superpowers-ftween-plugin
// Module and class for easy tweening (animation of values).
// Wrapper around FTWEEN.js, a fork of TWEEN.js.

// Documentation:
// http://florentpoujol.github.io/superpowers-ftween-plugin

// You can also access the documentation offline in the plugin's "public/docs" folder 
// or via the "Plugins docs browser" tool provided by the "Docs browser" plugin: https://github.com/florentpoujol/superpowers-docs-browser-plugin

declare module fTween {
  var Easing: FTWEEN.TweenEasing;
  var Interpolation: FTWEEN.TweenInterpolation;
  
  class Tween {
    constructor(from: Object, to: Object, duration: number, params?: Params);
    constructor(to: Object, duration: number, params?: Params);
    constructor(time: number, onComplete: TweenCallback, params?: Params);
    constructor(params: Params);
    constructor();
    
    set(params: Params);

    on(eventName: "onStart", callback?: TweenCallback): Tween;
    on(eventName: "onPause", callback?: TweenCallback): Tween;
    on(eventName: "onResume", callback?: TweenCallback): Tween;
    on(eventName: "onComplete", callback?: TweenCallback): Tween;
    on(eventName: "onStop", callback?: TweenCallback): Tween;

    on(eventName: "onUpdate", callback?: TweenUpdateCallback): Tween;
    on(eventName: string, callback?: Function): Tween;

    start(time?: number);
    pause();
    resume();
    stop();
    destroy();

    _inner: FTWEEN.Tween;
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
