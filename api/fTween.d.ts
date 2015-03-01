declare module Sup {
  class Actor {
    animate(to: Object, duration: number, params?: fTween.Params): fTween.Tween;
  }

  class ActorComponent {
    animate(to: Object, duration: number, params?: fTween.Params): fTween.Tween;
  }
}

declare module fTween {
  class Tween {
    static Easing: SPTWEEN.TweenEasing;
    static Interpolation: SPTWEEN.TweenInterpolation;
    static update(time?: number): void;

    constructor(from: Object, to: Object, duration: number, params?: Params);
    constructor(to: Object, duration: number, params?: Params);
    constructor(time: number, onComplete: Listener, params?: Params);
    constructor(params: Params);
    
    set(params: Params): void;
    addListener(event: string, listener: Function): Tween;
    on(eventName: string, listener: Function): Tween;
    start(time?: number): Tween;
    pause(): Tween;
    resume(): Tween;
    stop(): Tween;
    destroy();

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
}
