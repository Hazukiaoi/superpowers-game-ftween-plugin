/// <reference path="../lib/sup-tween.js.d.ts" />
var SUPTWEEN = require("../lib/sup-tween");

var shortEventNames = ["start", "pause", "resume", "update", "complete", "stop"];
var eventNames = ["onStart", "onPause", "onResume", "onUpdate", "onComplete", "onStop"];
var fTween;
(function (fTween) {
    /**
    * The object containing the easing functions segregated into families (ie: `fTween.Easing.Cubic`) and variants (ie: `fTween.Easing.Cubic.In`).
    */
    var Easing = SUPTWEEN.Easing;
    /**
    * The object containing the interpolation functions (ie: `fTween.Interpolation.Cubic`).
    */
    var Interpolation = SUPTWEEN.Interpolation;
    /**
    * To be called from your game as often as possible (on every update).
    * Call `SUPTWEEN.update()` once to run all tweens once.
    * @param time The current timestamp in milliseconds.
    */
    function update(time) {
        SUPTWEEN.update();
    }
    var Tween = (function () {
        function Tween() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            // --------------------------------------------------------------------------------
            // properties
            this._tween = new SUPTWEEN.Tween();
            this._duration = 0;
            this._isRelative = false;
            this._delay = 0;
            this._repeat = 0;
            this._yoyo = false;
            this._isPaused = false;
            // (re)set to false in start()
            // set to true in the onComplete callback set in the constructor
            this._isComplete = false;
            this._destroyOnComplete = true;
            this._isDestroyed = false;
            var argsCount = args.length;
            var types = [];
            for (var i = 0; i < argsCount; i++) {
                types[i] = typeof args[i];
            }
            var params = {};
            if ((argsCount === 3 || argsCount === 4) && types[0] === "object" && types[1] === "object" && types[2] === "number") {
                params = args[3] || {};
                params.from = args[0];
                params.to = args[1];
                params.duration = args[2];
            }
            else if ((argsCount === 2 || argsCount === 3) && types[0] === "object" && types[1] === "number") {
                params = args[2] || {};
                params.to = args[0];
                params.duration = args[1];
            }
            else if ((argsCount === 2 || argsCount === 3) && types[0] === "number" && types[1] === "function") {
                params = args[2] || {};
                params.time = args[0];
                params.onComplete = args[1];
            }
            else if (argsCount === 1 && args[0] !== null && typeof args[0] === "object") {
                params = args[0] || {};
            }
            else if (argsCount > 0) {
                console.error("fTween.Tween(): Unknow constructor with " + argsCount + " arguments, see details below");
                for (var i = 0; i < args.length; i++) {
                    console.log("argument #" + i + ": type=" + types[i] + " value=", args[i]);
                }
            }
            var start = params.start;
            delete params.start;
            if (Object.keys(params).length > 0) {
                this.set(params);
            }
            if (this._to !== undefined && this._duration > 0 && (start === undefined || start >= 0)) {
                this.start(start);
            }
        }
        // --------------------------------------------------------------------------------
        // methods
        /**
        * Sets several of the tweener's properties at once.
        * @param params The list of parameters.
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
                if (eventNames.indexOf(key) !== -1) {
                    this.on(key, params[key]);
                }
                else {
                    // TODO FIXME: can a local property can be set this way ?
                    this[key] = params[key];
                }
            }
            if (typeof start === "number" && start >= 0) {
                this.start(start);
            }
        };
        Tween.prototype.on = function (eventName, callback) {
            var eventPos = shortEventNames.indexOf(eventName);
            eventName = eventNames[eventPos] || eventName; // transform short event name in "long" name or leave it as it is.
            if (eventNames.indexOf(eventName) === -1) {
                console.error("fTween.Tween.on(): ERROR: wrong event name: " + eventName + ". Expected values are:", shortEventNames, eventNames);
                return;
            }
            if (callback === undefined) {
                callback = null;
            }
            if (eventName === "onComplete") {
                var userCallback = callback;
                var self = this;
                callback = function () {
                    self._isComplete = true;
                    if (userCallback !== null) {
                        userCallback.call(this);
                    }
                    if (self._destroyOnComplete === true) {
                        self.destroy();
                    }
                };
            }
            this._tween[eventName](callback);
            return this;
        };
        /**
        * Starts the tween.
        * Tweens are automatically started after their creation if the duration and the `to` object are supplied. You can prevent this by setting the `start` property to a negative value in the constructor's `params` argument.
        * @param time The time (a timetamp in milliseconds) at which to start the tween.
        */
        Tween.prototype.start = function (time) {
            if (this._to === undefined || this._duration === 0) {
                console.log("fTween.Tween.start(): ERROR: Can't start the tweener now because The 'to' object and/or the duration have not been set: ", this._to, this._duration);
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
            this._isDestroyed = true;
        };
        /**
        * Check that the provided value is not too big.
        * If that's the case, suppose that it is a number of milliseconds instead of seconds and display a warning.
        * Called by duration, delay and time setters.
        * @param value The value.
        * @param propName The name of the evaluated property.
        */
        Tween.prototype._checkMilliseconds = function (value, propName) {
            if (value >= 500) {
                console.log("fTween." + propName + ": WARNING: The provided value '" + value + "' is superior to 500! The value has to be expressed in seconds, not in milliseconds. Are you sure you didn't meant the value to be '" + value / 1000 + "' seconds instead ?");
            }
        };
        Object.defineProperty(Tween.prototype, "_inner", {
            /**
            * The `SUPTWEEN.Tween` instance that actually perform the tweening.
            */
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
            /**
            * The `to` object containing the end values.
            */
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
            /**
            * The time in seconds to complete the tween.
            */
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
            * The time in seconds to complete the timer. Setting the `time` property makes the `from`, `to` and `duration` being ignored.
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
            /**
            * The `from` object containing the start values.
            */
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
            /**
            * Tell whether to consider number values in the to object as relative (true) or absolute (false).
            */
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
            /**
            * The time in milliseconds before the tween's values actually starts to updates after the tween has been started.
            */
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
            /**
            * The number of times the tween will repeat, after having completed once.
            */
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
            /**
            * After having completed once and when repeat is strictly positive, tell whether the tween restart from its original state (false) (from 'from' to 'to', and repeat) or its current state (true) (from 'from' to 'to', then from 'to' to 'from', and repeat).
            */
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
            /**
            * The easing function to use..
            */
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
            /**
            * The interpolation function to use.
            */
            set: function (interpolation) {
                this._tween.interpolation(interpolation);
                this._interpolation = interpolation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "isPaused", {
            /**
            * The tween's paused state. Use the `pause()` and `resume()` methods to control the paused state.
            */
            get: function () {
                return this._isPaused;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "isComplete", {
            /**
            * The tween's completed state.
            */
            get: function () {
                return this._isComplete;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "destroyOnComplete", {
            get: function () {
                return this._destroyOnComplete;
            },
            /**
            * Tell whether to destroy the tween once it has completed (true), or not (false).
            */
            set: function (destroyOnComplete) {
                this._destroyOnComplete = destroyOnComplete;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "isDestroyed", {
            /**
            * The tween's destroyed state. Call destroy() to destroy a tween and free some objects for GC.
            */
            get: function () {
                return this._isDestroyed;
            },
            enumerable: true,
            configurable: true
        });
        return Tween;
    })();
    fTween.Tween = Tween; // end of fTween.Tween class
})(fTween || (fTween = {})); // end of fTween module

exports.fTween = fTween;
