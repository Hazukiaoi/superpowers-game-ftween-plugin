// fTween plugin
// https://github.com/florentpoujol/superpowers-ftween-plugin
// Module and class for easy tweening (animation of values).
// Wrapper around ftween.js, a fork of tween.js.

// Documentation:
// http://florentpoujol.github.io/superpowers-ftween-plugin

// You can also access the documentation offline in the plugin's "public/docs" folder 
// or via the "Plugins docs browser" tool provided by the "Docs browser" plugin: https://github.com/florentpoujol/superpowers-docs-browser-plugin

declare module fTween {
  var Easing: FTWEEN.Easings;
  var Interpolation: FTWEEN.Interpolations;
  
  class Tween {
    constructor(from: Object, to: Object, duration: number, params?: Params);
    constructor(to: Object, duration: number, params?: Params);
    constructor(time: number, onComplete: Callback, params?: Params);
    constructor(params: Params);
    constructor();
    
    set(params: Params);

    on(eventName: "onStart", callback?: Callback): Tween;
    on(eventName: "onPause", callback?: Callback): Tween;
    on(eventName: "onResume", callback?: Callback): Tween;
    on(eventName: "onComplete", callback?: Callback): Tween;
    on(eventName: "onStop", callback?: Callback): Tween;

    on(eventName: "onUpdate", callback?: UpdateCallback): Tween;
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
    onStart?: Callback;
    onPause?: Callback;
    onResume?: Callback;
    onUpdate?: UpdateCallback;
    onComplete?: Callback;
    onStop?: Callback;
    start?: number;
  }

  interface EasingFunction {
    (k:number): number;
  }
  interface InterpolationFunction {
    (v:number[], k:number): number;
  }

  interface Callback {
    (): void;
  }
  interface UpdateCallback {
    (progression:number): void;
  }
}
