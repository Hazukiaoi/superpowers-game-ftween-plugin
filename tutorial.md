# Animations with the fTween module

The `fTween` plugin for Superpowers allows to easily create tweens that animate properties on objects.  
This enables you to create fade or slide effects, or simple timer for instance, in no time and no hassle.

## Tweens and the fTween.Tween class

The `fTween` module mostly brings the `fTween.Tween` class and some interfaces.  
The `fTween.Tween` class is the go-to way to create any animations, aka __tweens__ (which are instances of `fTween.Tween`).

Simply speaking, a tween is an object that updates the properties of an object __from__ a start value (the values in the `from` object) __to__ an end value (the values in the `to` object) during a __duration__, optionally using an __easing__ (or interpolation) function and some other optional parameters.

Here is three of `fTween.Tween` constructors:

    ( from: Object, to: Object, duration: number, params?: fTween.Params ): fTween.Tween
    ( to: Object, duration: number, params?: fTween.Params ): fTween.Tween
    ( params?: fTween.Params ): fTween.Tween

## Examples

Let's start right away with examples :

### 1/
    
    // the values in the from object may be numbers or objects that contains numbers (like Vector3)
    var from = {
        opacity: 1,
        position: { x: 0, y: 0, z: 0 }
    };
    var to = {
        opacity: 0,
        position: { x: 10, y: -5, z: 0 }
    };
    var tween = new fTween.Tween( from, to, 3 );

This tween will animate the opacity from 1 to 0 and the postion from `{0,0,0}` to `{10,-5,0}` in 3 seconds.
    
### 2/
    
    var to = {
        opacity: 0,
        position: { x: 10, y: -5, z: 0 }
    };
    var tween = new fTween.Tween( to, 3 );

As you can see, the `from` object has not been supplied because it is completely optional.  
Even if you supply an incomplete `from` object, the missing properties will be created on it with `0` (or an object that contains zeros) as value.

### 3/

The `from` object can also be instances like an actor:

    class TweenBehavior extends Sup.Behavior {
        awake() {
            var tween = new fTween.Tween( this.actor, { position: { x: 10, y: -5, z: 0 } }, 3 );
        }
    }

In this case, there is a catch, because actors don't have a `position` property.  
But they have two functions named `setPosition()` and `getPosition()` that are used to set and get its position.

So when the name of a property in the `to` object match the name of a couple of setter/getter functions (the functions that begin by `set` or `get`) in the `from` object, the property is not created on it as in the second example: the value of the property is set/get via the functions instead.

It means that this example would effectively move the actor from its current position to `{10,-5,0}` because its position is automatically set on each update of the tween.  
Pretty handy!

### 4/

So far we have used two constructors
    
    ( from: Object, to: Object, duration: number, params?: fTween.Params ): fTween.Tween
    ( to: Object, duration: number, params?: fTween.Params ): fTween.Tween

Let's use a third one :  
`( params?: fTween.Params ): fTween.Tween`

    var tween = new fTween.Tween( {
        to: { opacity: 1 },
        duration: 0.5,
        delay: 1,
        isRelative: true,
        easing: fTween.Easing.Quadratic.Out
    } );


## Tween properties and params argument

As you have seen in the examples above the tween may have quite many properties to control how the values gets animated.

[Find all these properties](/classes/ftween.tween.html#_inner) in the __Accessors__ sections of the class' page.

Also, all the constructors, as well as the `set()` function share a `params` argument which is an object in which you can set the tween's properties (and more) in mass.  
[Check out the `fTween.Params` interface](/interfaces/ftween.params.html) for more informations about the keys you can set in the `params` argument.






## Creating aliases of fTween.Tween

If you are not happy about the name `fTween.Tween`, feel free to create an alias like this:

    var Tween = fTween.Tween;
    // or
    var Anim = fTween.Tween;

Now you can write:

    var tween = new Anim( [...] );

## Timer

Just want to do something after some time ?
Just create a tween with this constructor:  
`( time: number, onComplete: fTween.Listener, params?: fTween.Params ): fTween.Tween`

    new fTween.Tween( 2, function() {
      console.log( "Time's up!" );
      doSomething();
    } );
    // this prints the message and calls doSomething() after 2 seconds

In the case of such timer, the `from` object you may get via the listeners contains the `elapsedTime` and `remainingTime`properties.


## Properties



## Playback control

When you create a new tween instance and pass (at least) the 'to' object and a positive duration, __the tween will automatically start__.  
You can prevent this behavior by setting the start property with a negative number in the `params` argument.

    new fTween.Tween( { value: 10 }, 2 ); // starts right away

    var tween = new fTween.Tween( { value: 10 }, 2, { start: -1 } ); 
    // don't automatically starts, wait for the start() function to be called:
    tween.start();

You can start, pause, resume and stop the tween whenever you call the function of the same name.
  
    var tween = new fTween.Tween( { value: 10 }, 2, { start: -1 } ); 
    tween.start();
    tween.pause();
    // tweener.isPaused is now true;
    tween.resume();
    tween.stop();
    tween.destroy();

Note that there is a difference between:
  
    var tween = new fTween.Tween( { value: 10 }, 2, { start: -1 } ); 
    // and
    var tween = new fTween.Tween( { value: 10 }, 2 ); 
    tween.pause(); // or tween.stop();

In this last case, tween has been started _before_ being paused or stopped. Some operations have been done on the `from` object and setting a new `from` object will result in unexpected behaviors and maybe errors.

__As a rule of thumbs, your shouldn't modify any of your tween's property while it is started.__


## Listeners

The fTween class extends node's EventEmitter and emit the following events : `onStart`, `onPause`, `onResume`, `onUpdate`, `onComplete` and `onStop`.

You can set a function to listen for the event as with any event emitter via the `addListener()`, or `on()` function.

The functions must respect the `fTweenListener` signature (or `fTweenUpdateListener` for the `onUpdate` event).  
They receive a reference of the `from` object as their first argument.  
The `onUpdate` listeners also receive a second argument: the progression of the tween as a percentage between 0 and 1.

    var tween = new fTween.Tween( ... )
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

[See the easing examples](http://tweenjs.github.io/tween.js/examples/03_graphs.html) of the Tween.js library to get a visual clue at how the value schange over time.


## Interpolation

Interpolations functions are used instead of the easing function for the values in the `to` object that are set to an array of at least two values.

The value will be animated to all the values set in the array successively, optionally using an interpolation equation which allow for the movement to be smoothed or curved.

[See the interpolation examples](http://tweenjs.github.io/tween.js/examples/06_array_interpolation.html) on the Tween.js library.




