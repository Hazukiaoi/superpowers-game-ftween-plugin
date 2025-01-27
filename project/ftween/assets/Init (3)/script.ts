var Vector3 = Sup.Math.Vector3;

Sup.loadScene( Sup.get('Scene', Sup.Scene ) );
var actor = Sup.getActor("Actor1");
var actorStartPos = actor.getPosition();
var activeTween: fTween.Tween = null;

var tests = Sup.get("test1.cson", fText).parse();
var gui = new dat.GUI();
var menu: any = {};

var onStart = function() {
  console.log("onStart", this);
}
var onUpdate = function() {
  console.log("onUpdate", this);
}
var onComplete = function() {
  console.log("onComplete", this);
}
var onLoopComplete = function( remainingLoops: number ) {
  console.log("onLoopComplete", remainingLoops, this);
}

// add test title to html
var titleElt = document.createElement("p");
titleElt.className = "testtitle";
titleElt.innerHTML = "testtitle";
document.body.appendChild( titleElt );



var style = document.createElement("style");
style.innerHTML = ".testtitle { color: white; position:absolute; left:10px; }"
document.head.appendChild( style );


function createTestLauncher(test, i) {
  return function() {      
    if (activeTween != null && activeTween.isDestroyed === false) {
      activeTween.destroy();
    }
    
    actor.setEulerAngles( new Vector3() );
    actor.setLocalScale( new Vector3(1,1,1) );
    actor.spriteRenderer.setColor(1,1,1);
    
    var params = test.params;
    
    if (params.isRelative == undefined || params.isRelative == false)
      actor.setPosition( actorStartPos );
    
    if (params.from == undefined) 
      params.from = actor;
    
    params.onStart = onStart;
//     params.onUpdate = onUpdate;
    params.onComplete = onComplete;
    if (params.onLoopComplete)
      params.onLoopComplete = onLoopComplete;
    
    titleElt.innerHTML = test.name;
    activeTween = new fTween.Tween( params );
    
    if (params.test)
      (<any>(<any>activeTween).__inner).test = true;
    
//     console.log("launch test:", i, test.name, params );
    
    
  };
}

for (var i=0; i<tests.length; i++) {
  var test = tests[i];
  var name = <string>test.name;
  menu[ name ] = createTestLauncher( test, i );
  
  gui.add( menu, name );
}

