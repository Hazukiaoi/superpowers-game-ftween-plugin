/// <reference path="../lib/sup-tween.js.d.ts" />
var eventNames = ["onStart", "onPause", "onResume", "onUpdate", "onComplete", "onStop"];
var shortEventNames = ["start", "pause", "resume", "update", "complete", "stop"];
var fTween;
(function (fTween) {
    var Tween = (function () {
        // constructor( from: any, to?: any, duration?: any, params?: Params ) {
        function Tween() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            // --------------------------------------------------------------------------------
            // properties
            this._emitter = new EventEmitter3();
            /**
            * @readonly
            * @property {SPTWEEN.Tween} _inner - The SPTWEEN.Tween instance that actually perform the tweening.
            */
            this._tween = new SPTWEEN.Tween({});
            /**
            * @property {number} duration - The time in seconds to complete the tween.
            */
            this._duration = 0;
            /**
            * @property {boolean} isRelative - Tell whether to consider number values in the to object as relative (true) or absolute (false).
            */
            this._isRelative = false;
            /**
            * @property {number} delay - The time in milliseconds before the tween's values actually starts to updates after the tween has been started.
            */
            this._delay = 0;
            /**
            * @property {number} repeat - The number of times the tween will repeat, after having completed once.
            */
            this._repeat = 0;
            /**
            * @property {boolean} yoyo - After having completed once and when repeat is strictly positive, tell whether the tween restart from its original state (false) (from 'from' to 'to', and repeat) or its current state (true) (from 'from' to 'to', then from 'to' to 'from', and repeat).
            */
            this._yoyo = false;
            /**
            * @readonly
            * @property {boolean} isPaused - The tween's paused state. Use the `pause()` and `resume()` methods to control the paused state.
            */
            this._isPaused = false;
            /**
            * @readonly
            * @property {boolean} isComplete - The tween's copleted state.
            */
            this._isComplete = false;
            var argsCount = args.length;
            var types = [];
            for (var i = 0; i < argsCount; i++) {
                types[i] = typeof args[i];
            }
            var params;
            if (argsCount === 4 && types[0] === "object" && types[1] === "object" && types[2] === "number") {
                params = args[3] || {};
                params.from = args[0];
                params.to = args[1];
                params.duration = args[2];
            }
            else if (argsCount === 3 && types[0] === "object" && types[1] === "number") {
                params = args[2] || {};
                params.to = args[0];
                params.duration = args[1];
            }
            else if (argsCount === 3 && types[0] === "number" && types[1] === "Listener") {
                params = args[2] || {};
                params.time = args[0];
                params.onComplete = args[1];
            }
            else if (argsCount === 1 && args[0] !== null && typeof args[0] === "object") {
                params = args[0] || {};
            }
            else {
                throw "fTween.Tween(): Unknow constructor";
            }
            // this._emitter = new EventEmitter3();
            // this._tween = new SPTWEEN.Tween( {} );
            var self = this;
            // the 'this' variable inside the callbacks is the 'from' object
            // TODO: only register a callback when a function listen for the event (especially onUpdate)
            this._tween.onStart(function () {
                console.log("inner onstart", this, self);
                self.emitter.emit("onStart", this);
            }).onPause(function () {
                self.emitter.emit("onPause", this);
            }).onResume(function () {
                self.emitter.emit("onResume", this);
            }).onUpdate(function (progression) {
                self.emitter.emit("onUpdate", this, progression);
            }).onComplete(function () {
                self._isComplete = true;
                self.emitter.emit("onComplete", this);
            }).onStop(function () {
                self.emitter.emit("onStop", this);
            });
            var start = params.start;
            delete params.start;
            this.set(params);
            if (this._to !== undefined && this._duration > 0 && (start === undefined || start >= 0)) {
                this.start(start);
            }
        }
        /**
        * To be called from your game, or direcrtly call SPTWEEN.update();
        * Call SPTWEEN.update() to run all tween once.
        * @static
        * @param {number} [time] - The current timestamp in milliseconds.
        */
        Tween.update = function (time) {
            SPTWEEN.update();
        };
        // --------------------------------------------------------------------------------
        // methods
        /**
        * Sets several of the tweener's properties at once.
        * @param {fTween.Params} params - The list of parameters.
        */
        Tween.prototype.set = function (params) {
            if (params.from !== undefined) {
                this.from = params.from;
                delete params.from;
            }
            if (params.to !== undefined) {
                this.to = params.to;
                delete params.to;
            }
            var start = params.start;
            delete params.start;
            for (var key in params) {
                if (eventNames.indexOf(key) !== -1 || shortEventNames.indexOf(key) !== -1) {
                    this.on(key, params[key]);
                }
                else {
                    this[key] = params[key];
                }
            }
            if (typeof start === "number" && start >= 0) {
                this.start(start);
            }
        };
        /**
        * Make the provided listener function listen for the specified event.
        * @param {string} eventName - The event name.
        * @param {Function} listener - The listener function.
        * @param {fTween.Tween} The tween instance.
        */
        Tween.prototype.on = function (eventName, listener) {
            if (shortEventNames.indexOf(eventName) !== -1) {
                eventName = "on" + eventName.charAt(0).toUpperCase() + eventName.slice(1);
            }
            else if (eventNames.indexOf(eventName) === -1) {
                console.error("fTween.Tween.on(): ERROR: wrong event name: " + eventName);
                return;
            }
            console.log("on new listener", eventName, listener);
            this._emitter.on(eventName, listener);
            return this;
        };
        /**
        * Starts the tween.
        * Tweens are automatically started after their creation if the duration and the `to` object are supplied. You can prevent this by setting the `start` property to a negative value in the constructor's `params` argument.
        * @param {number} [time] - The time (a timetamp in milliseconds) at which to start the tween.
        */
        Tween.prototype.start = function (time) {
            if (this._to === undefined || this._duration === 0) {
                console.log("fTween.start(): ERROR: Can't start the tweener now because The 'to' object and/or the duration have not been set: ", this._to, this._duration);
                return;
            }
            if (this._from === undefined) {
                this.from = {};
            }
            this._isComplete = false;
            if (time !== undefined) {
                if (time < 0) {
                    time = 0;
                }
            }
            this._tween.start(time);
        };
        /**
        * Pause the tween, stopping the update of its values.
        */
        Tween.prototype.pause = function () {
            this._isPaused = true;
            this._tween.pause();
        };
        /**
        * Resume the tween after it has been paused, resuming the update of its values where they have been paused.
        */
        Tween.prototype.resume = function () {
            this._isPaused = false;
            this._tween.resume();
        };
        /**
        * Stop the tween, stopping the update of its values.
        * A stopped tween can not be resumed, but can be restarted by calling start() again, with unpredictable results.
        */
        Tween.prototype.stop = function () {
            this._tween.stop();
        };
        /**
        * Stop the tween and all its chained tweens then remove all its listeners and de-reference as much objects as possible to let them be garbage collected.
        */
        Tween.prototype.destroy = function () {
            this._tween.destroy();
            this._tween = null;
            this._from = null;
            this._to = null;
            this._emitter.removeAllListeners();
            this._emitter = null;
        };
        /**
        * Check that the provided value is not too big.
        * If that's the case, suppose that it is a number of milliseconds instead of seconds and display a warning.
        * Called by duration, delay and time setters.
        * @param {number} value - The value.
        * @param {string} propName - The name of the evaluated property.
        */
        Tween.prototype._checkMilliseconds = function (value, propName) {
            if (value >= 500) {
                console.log("fTween." + propName + ": WARNING: The provided value '" + value + "' is superior to 500! The value has to be expressed in seconds, not in milliseconds. Are you sure you didn't meant the value to be '" + value / 1000 + "' seconds instead ?");
            }
        };
        Object.defineProperty(Tween.prototype, "emitter", {
            get: function () {
                return this._emitter;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "_inner", {
            get: function () {
                return this._tween;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "to", {
            get: function () {
                return this._to;
            },
            set: function (to) {
                this._to = to;
                this._tween.to(to);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "duration", {
            get: function () {
                return this._duration;
            },
            set: function (duration) {
                if (duration < 0) {
                    duration = 0;
                }
                this._checkMilliseconds(duration, "duration");
                this._tween.duration(duration * 1000);
                this._duration = duration;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "time", {
            get: function () {
                return this._duration;
            },
            /**
            * @property {number} time - The time in seconds to complete the timer. Setting the `time` property makes the `from`, `to` and `duration` being ignored.
            */
            set: function (time) {
                if (time < 0) {
                    time = 0;
                }
                this._checkMilliseconds(time, "time");
                this.from = { elapsedTime: 0, remainingTime: time };
                this.to = { elapsedTime: time, remainingTime: 0 };
                this.duration = time;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "from", {
            get: function () {
                return this._from;
            },
            set: function (from) {
                this._from = from;
                this._tween.from(from);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "isRelative", {
            get: function () {
                return this._isRelative;
            },
            set: function (isRelative) {
                this._tween.isRelative(isRelative);
                this._isRelative = isRelative;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "delay", {
            get: function () {
                return this._delay;
            },
            set: function (delay) {
                if (delay < 0) {
                    delay = 0;
                }
                this._checkMilliseconds(delay, "delay");
                this._tween.delay(delay * 1000);
                this._delay = delay;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "repeat", {
            get: function () {
                return this._repeat;
            },
            set: function (repeat) {
                if (repeat < 0) {
                    repeat = 0;
                }
                this._tween.repeat(repeat);
                this._repeat = repeat;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "yoyo", {
            get: function () {
                return this._yoyo;
            },
            set: function (yoyo) {
                this._tween.yoyo(yoyo);
                this._yoyo = yoyo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "easing", {
            get: function () {
                return this._easing;
            },
            set: function (easing) {
                this._tween.easing(easing);
                this._easing = easing;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "interpolation", {
            get: function () {
                return this._interpolation;
            },
            set: function (interpolation) {
                this._tween.interpolation(interpolation);
                this._interpolation = interpolation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "isPaused", {
            get: function () {
                return this._isPaused;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "isComplete", {
            // (re)set to false in start()
            // set to true in the onComplete callback set in the constructor
            get: function () {
                return this._isComplete;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @static
        * @property {SPTWEEN.TweenEasing} Easing - Object containing the easing functions segregated into families (ie: fTween.Tween.Easing.Cubic) and variants (ie: fTween.Tween.Easing.Cubic.In).
        */
        Tween.Easing = SPTWEEN.Easing;
        /**
        * @static
        * @property {TweenTweenInterpolation} Interpolation - Object containing the interpolation functions (ie: fTween.Tween.Interpolation.Cubic).
        */
        Tween.Interpolation = SPTWEEN.Interpolation;
        return Tween;
    })();
    fTween.Tween = Tween; // end of fTween.Tween class
})(fTween || (fTween = {})); // end of fTween module
/*
var proto: any = Sup.Actor.prototype;
var proto2 = Sup.Actor.prototype;
// storing the prototype in a variable of type any is necessary
// doing otherwise cause an error of type "'animate' does not exist on type 'Actor'"
proto.animate = function( to:Object, duration:number, params?:fTween.Params ) {
  return new fTween.Tween( this, to, duration, params );
};

var proto: any = Sup.ActorComponent.prototype;
proto.animate = function( to:Object, duration:number, params?:fTween.Params ) {
  return new fTween.Tween( this, to, duration, params );
};
*/
