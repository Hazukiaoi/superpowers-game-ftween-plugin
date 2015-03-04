declare module SPTWEEN {
  export var REVISION: string;
  export function getAll(): Tween[];
  export function removeAll(): void;
  export function add(tween:Tween): void;
  export function remove(tween:Tween): void;
  export function update(time?:number): boolean;

  export interface TweenCallback {
    (): void;
  }
  export interface TweenUpdateCallback {
    (progression:number): void;
  }

  export interface EasingFunction {
    (k:number): number;
  }
  export interface InterpolationFunction {
    (v:number[], k:number): number;
  }
  
  export class Tween {
    constructor(object?:Object);
    from(object:Object): Tween;
    to(properties:Object, duration?:number): Tween;
    duration(duration:number): Tween;
    isRelative(isRelative:boolean): Tween;
    start(time?:number): Tween;
    stop(): Tween;
    pause(): Tween;
    resume(): Tween;
    destroy(recurse?:boolean): void;
    stopChainedTweens();
    getChainedTweens(): Tween[];
    removeChainedTweens(tween?: Tween): number;
    delay(amount:number): Tween;
    repeat(times:number): Tween;
    yoyo(enable:boolean): Tween;
    easing(easing:EasingFunction): Tween;
    interpolation(interpolation:InterpolationFunction): Tween;
    chain(...tweens:Tween[]): Tween;
    onStart(callback?:TweenCallback): Tween;
    onUpdate(callback?:TweenUpdateCallback): Tween;
    onPause(callback?:TweenCallback): Tween;
    onResume(callback?:TweenCallback): Tween;
    onComplete(callback?:TweenCallback): Tween;
    onStop(callback?:TweenCallback): Tween;
    update(time:number): boolean;
  }

  export var Easing: TweenEasing;
  export var Interpolation: TweenInterpolation;

  export interface TweenEasing {
    Linear: {
      None(k:number): number;
    };
    Quadratic: {
      In(k:number): number;
      Out(k:number): number;
      InOut(k:number): number;
    };
    Cubic: {
      In(k:number): number;
      Out(k:number): number;
      InOut(k:number): number;
    };
    Quartic: {
      In(k:number): number;
      Out(k:number): number;
      InOut(k:number): number;
    };
    Quintic: {
      In(k:number): number;
      Out(k:number): number;
      InOut(k:number): number;
    };
    Sinusoidal: {
      In(k:number): number;
      Out(k:number): number;
      InOut(k:number): number;
    };
    Exponential: {
      In(k:number): number;
      Out(k:number): number;
      InOut(k:number): number;
    };
    Circular: {
      In(k:number): number;
      Out(k:number): number;
      InOut(k:number): number;
    };
    Elastic: {
      In(k:number): number;
      Out(k:number): number;
      InOut(k:number): number;
    };
    Back: {
      In(k:number): number;
      Out(k:number): number;
      InOut(k:number): number;
    };
    Bounce: {
      In(k:number): number;
      Out(k:number): number;
      InOut(k:number): number;
    };
  }

  export interface TweenInterpolation {
    Linear(v:number[], k:number): number;
    Bezier(v:number[], k:number): number;
    CatmullRom(v:number[], k:number): number;

    Utils: {
      Linear(p0:number, p1:number, t:number): number;
      Bernstein(n:number, i:number): number;
      Factorial(n): number;
    };
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
    isRelative?: boolean;
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
