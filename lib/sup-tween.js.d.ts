declare module SUPTWEEN {
  var REVISION: string;
  function getAll(): Tween[];
  function removeAll(): void;
  function add(tween:Tween): void;
  function remove(tween:Tween): void;
  function update(time?:number): boolean;

  interface TweenCallback {
    (): void;
  }
  interface TweenUpdateCallback {
    (progression:number): void;
  }

  interface EasingFunction {
    (k:number): number;
  }
  interface InterpolationFunction {
    (v:number[], k:number): number;
  }
  
  class Tween {
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

  var Easing: TweenEasing;
  var Interpolation: TweenInterpolation;

  interface TweenEasing {
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

  interface TweenInterpolation {
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
