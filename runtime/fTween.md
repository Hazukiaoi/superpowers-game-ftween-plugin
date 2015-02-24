# Animations with fTween

The fTween plugin allows to easily create tweens that animate properties on objects.
This enables you to create fade or slide effects, or simple timer for instance, in no time and no hassle.


## Animate actors and components

The easiest way to animate properties on actors and components is to use the `animate()` function like so:
  
  // suppose we are inside a scripted behavior
  // the  animate() function has this signature : ( to: Object, duration: number, params?: Object ): fTween

  this.actor.animate( { localPosition: Math.Vector3(10,0,0) }, 5 );
  // this animate the actor's local position form its current position to {10,0,0} in 5 seconds

  // animate() is also available on any ActorComponent children
  this.actor.spriteRenderer.animate( { opacity: 0 }, 0.5 );
  // this fades out the renderer in 0.5 seconds

You can animate several properties at the same time as long as its value is a number or an object that only contains number (typically Vector3 and the likes):

  this.actor.animate( {
    localPosition: Math.Vector3(10,0,0),
    localEulerAngles: Math.Vector3(0,180,0),
  }, 5, { isRelative: true } );
  // this animate the actor's local position as well as its local euler angles.

Note the third argument in the last example. It's a table of parameters that allows you to better control the ways the values are animated.  
For instance you can set an easing function so that the values ar not tween linearly, or you can setup listeners to be notified when the animation is completed.  
See below for the full list of its properties and values.

In the above case the values in the `to` object have been marked as relative.  
That means that the current values will be animated __by__ the amount set in the 'to' object instead of __to__ this amount.
So instead of being moved __to__ {10,0,0} as in the first example, the actor will be moved __by__ 10 units toward the positive X.


## Tweens and the fTween class

As you may have noticed in the examples above, the `animate()` function returns an instance of type `fTween`.

The fTween class is the go-to way to create any animations 
The animate() function is just a shortcut for one of its constructors.

Simply speaking, a tween is an object that updates the properties of an object __from__ a start value (the `from` object) __to__ an end value (the `to` object) during a __duration__, optionally using an __easing__ (or interpolation) function and some other optional parameters.

  ( to, duration, params? )
  ( from, to, duration, params? )
  ( params? )



## Timer

Just want to do something after some time ?
Just create a tween with this signature: `( time: number, onComplete: fTweenListener, params?: Object ): fTween`

  new fTween( 2, function() {
    console.log( "timer is up!" );
    doSomething();
  } );
  // this prints the message and calls doSomething() after 2 seconds

In the case of "timer", the object you may get via the listeners contains the `elapsedTime` and `remainingTime`properties.


## Properties

- `to` (object): the object containing the end values. The end values (as well as the values nested in objects) may be array (for interpolation) or string (the value is considered as relative, even if the tween itself is not marked as relative), in addition to numbers.
- `duration` (number): the time __in second__ it takes for the tween to complete.
- `from` (object) [optional]: the object containing the properties to tween, which values are considered as their start values. It is optional. Values found in the `to` object and not in the `from` object will be defaulted to 0. Only number values or objects that contains numbers will be tweened.
- `delay` (number) [default=0] : the time __in second__ it takes for the tween to actually start after the `start()` function has been called.
- `repeat` (number) [default=0]: the number of times the tween will repeat after having run at least once.
- `yoyo` (boolean) [default=false]: when repeat > 0, tell whether 
- `isRelative` (boolean) [default=false]: tell whether to consider number values in the to object as relative (true) or absolute (false). Note that string values in the `to` object are always considered as relative.
- `easing` (EasingFunction) [default=fTween.Easing.Linear.None]: The easing function to use while tweening. 
- `interpolation` (InterpolationFunction) [default=fTween.Interpolation.Linear]: The interpolation function to use while tweening the properties set as array in the `to` object. 



## Playback control

When you create a new fTween instance and pass (at least) the 'to' object and a positive duration, __the tween will automatically start__.  
You can prevent this behavior by setting the start property with a negative number.

  new fTween( { value: 10 }, 2 ); // starts right away

  var tween = new fTween( { value: 10 }, 2, { start: -1 } ); 
  // don't automatically starts, wait for the start() function to be called:
  tween.start();

You can start, pause, resume and stop the tween whenever you call the function of the same name.
  
  var tween = new fTween( { value: 10 }, 2, { start: -1 } ); 
  tween.start();
  tween.pause();
  // tweener.isPaused is now true;
  tween.resume();
  tween.stop();
  tween.destroy();

Note that there is a difference between:
  
  var tween = new fTween( { value: 10 }, 2, { start: -1 } ); 
  // and
  var tween = new fTween( { value: 10 }, 2 ); 
  tween.pause(); // or tween.stop();

In this last case, tween has been started _before_ being paused or stopped. Some operations have been done on the `from` object and setting the target or a new `from` object will result in unexpected behaviors and maybe errors.

__As a rule of tumb, your shouldn't modify any of your tween's property while it is started.__


## Listeners

The fTween class extends node's EventEmitter and emit the following events : `onStart`, `onPause`, `onResume`, `onUpdate`, `onComplete` and `onStop`.

You can set a function to listen for the event as with any event emitter via the `addListener()`, or `on()`.

The functions' signature must respect the `fTweenListener` (or `fTweenUpdateListener` for the onUpdate event).  
They receive a reference of the 'from' object as their first argument.  
The onUpdate listeners also receive a second argument: the progression of the tween as a percentage between 0 and 1.

  var tween = new fTween( ... )
  tween.addListener( "onUpdate", function( object: Object, progression: number ) { ... } )

  // the on() function does the same thing:
  tween.on( "onComplete", function( object: Object ) { ... } )

  // but it also allows you to use the "short" event name
  tween.on( "complete", function( object: Object ) { ... } )

  // you can also set a listener via the params object passed to the constructor or the set() function:
  tween.set( {
    onStop: function( object: Object ) { ... }
  } );

Remove a listener via the `removeListener( "onStart")` function. 
  
  var onUpdate = function( ... ) { ... }
  tween.on( "update", onUpdate );
  ...
  tween.removeListener( "onUpdate", onUpdate );


## Easing functions

Easing functions impact how the values in the `from` object change over time.
They can be divided into several big families:

- `Linear` is the default easing. It’s the simplest easing function.
- `Quad`, `Cubic`, `Quart`, `Quint`, `Expo`, `Sine` and `Circ` are all "smooth" curves that will make transitions look natural.
- The `Elastic` family simulates inertia in the easing, like an elastic gum.
- The `Back` family starts by moving the easing slightly "backwards" before moving it forward.
- The `Bounce` family simulates the motion of an object bouncing.

Each family (except `Linear`) has 4 variants:

- `In` starts slow, and accelerates at the end
- `Out` starts fast, and decelerates at the end
- `InOut` starts and ends slow, but it’s fast in the middle
- `OutIn` starts and ends fast, but it’s slow in the middle

The `Linear` family as a single variant named `None`. `fTween.Easing.Linear.None` is the default easing function.

[See the easing examples](http://sole.github.io/tween.js/examples/03_graphs.html) of the Tween.js library to get a isual clue at how the value schange over time.


## Interpolation

Interpolations functions are used instead of the easing function for the values in the 'to' object that are set to an array of at least two values.

The value will be animated to all the values set in the array successively, optionally using an interpolation equation which allow for the movement to be smoothed or curved.

[See the interpolation examples](http://sole.github.io/tween.js/examples/06_array_interpolation.html) on the Tween.js library.




