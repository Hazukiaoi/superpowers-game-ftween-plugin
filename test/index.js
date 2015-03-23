var assert = require("assert");
var SUPTWEEN = require("../lib/sup-tween");
var fTween = require("./fTween").fTween;
var Tween = fTween.Tween;


describe("", function(){
  describe("", function(){
    var from = { value: 0 };
    var to = { value: 10 };

    var onStartCalled = false;
    var onStart = function() {
      onStartCalled = true;
    };

    var onUpdateCalled = 0;
    var onUpdate = function(prog) {
      onUpdateCalled++;
    };

    var onCompleteCalled = false;
    var onComplete = function() {
      onCompleteCalled = true;
    };

    var tween = new Tween( from, to, 10, { start: 0, onStart: onStart, onUpdate: onUpdate, onComplete: onComplete } );
    //tween._tween.test = true;


    it("tween.from = from", function() {
      assert.equal( tween.from, from );
    });
    it( "tween.to = to", function() {
      assert.equal( tween.to, to );
    });
    it( "tween.duration = duration", function() {
      assert.equal( tween.duration, 10 );
    });

    it("tween._tween.start() has been called (tween._tween is added to SUPTWEEN._tweens)", function() {
      assert.notEqual( SUPTWEEN.getAll().indexOf( tween._tween ), -1 );
    });
    

    it("tween._tween.update() returns true because the tween has not completed yet", function() {
      assert.equal( tween._tween.update( 1000 ), true );
    });
    it("tween._tween is started (onStart callback has been called)", function() {
      assert.equal( onStartCalled, true );
    });
    it("the tween has updated once (onUpdate callback has been called once)", function() {
      assert( onUpdateCalled > 0 );
    });

    it( "at t = 1000 from.value = 1", function() {
      assert.equal( from.value, 1 );
    });


    tween._tween.update( 5000 );
    it( "at t = 5000 from.value = 5", function() {
      assert.equal( from.value, 5 );
    });

    tween._tween.update( 10000 );
    it( "at t = 5000 from.value = 5", function() {
      assert.equal( from.value, 10 );
    }); 

/*
    it("tween._tween.update() returns false because the tween has completed", function() {
      assert.equal( tween._tween.update( 10000 ), false );
    });
    it("tween._tween has completed (onComplete callback has been called)", function() {
      assert.equal( onCompleteCalled, true );
    });

    it( "at t = duration from.value = to.value", function() {
      assert.equal( from.value, to.value );
    });    */
  });
});
