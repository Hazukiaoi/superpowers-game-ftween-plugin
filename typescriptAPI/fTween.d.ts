// fTween plugin
// https://github.com/florentpoujol/superpowers-game-ftween-plugin
// Module and class for easy tweening (animation of values).
// Wrapper around ftween.js (the FTWEEN module), a fork of tween.js.

// Documentation:
// http://florentpoujol.github.io/superpowers-game-ftween-plugin

// You can also access the documentation offline in the plugin's "public/docs" folder 
// or via the "Plugins documentation" tool provided by the "Plugins documentation" plugin: https://github.com/florentpoujol/superpowers-common-pluginsdocs-plugin

declare namespace fTween {
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
    on(eventName: "onUpdate", callback?: UpdateCallback): Tween;
    on(eventName: "onLoopComplete", callback?: LoopCompleteCallback): Tween;
    on(eventName: "onComplete", callback?: Callback): Tween;
    on(eventName: "onStop", callback?: Callback): Tween;
    on(eventName: string, callback?: Function): Tween;

    start(time?: number);
    pause();
    resume();
    stop();
    destroy();

    to: Object;
    duration: number;
    time: number;
    from: Object;
    isRelative: boolean;
    delay: number;
    repeat: number;
    loops: number;
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
    loops?: number;
    yoyo?: boolean;
    easing?: EasingFunction;
    easingName?: string;
    interpolation?: InterpolationFunction;
    interpolationName?: string;
    destroyOnComplete?: boolean;
    onStart?: Callback;
    onPause?: Callback;
    onResume?: Callback;
    onUpdate?: UpdateCallback;
    onLoopComplete?: LoopCompleteCallback;
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
  interface LoopCompleteCallback {
    (remainingLoops:number): void;
  }
}
