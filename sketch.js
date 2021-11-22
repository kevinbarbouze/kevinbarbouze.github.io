var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();
var world;
var boxes =[];
var ground;
var ground1;
var options

 
 

function setup() {
  createCanvas(400,400);
   options = {
     width:400,
     height:400
   }

  world = engine.world;

  var render = Render.create({
    //element: document.body,
    engine: engine,
   options: options
  });


  Engine.run(engine);
  Render.run(render)
 
  ground = new Rect((width/1)/2,(height/3)-10,width/2,20,0.5)
  ground1 = new Rect((width-width/4),(height/1.2)-10,width/2,20,-0.5)

 
}


function mousePressed(){
  boxes.push( new Circle(mouseX,mouseY,random(5,25)))
}

 function returnColor(){
 return color(random(255), random(255), random(255)); 
}



function draw() {
  background(220);
    Engine.update(engine)
   

  boxes.forEach(function(e, index){ 
  e.show()
    if(e.isOffScreen()){
    World.remove(world,e.body)
      boxes.splice(index,1)
    }
})
  
   
  ground1.isStatic(true)
  ground1.show(color(255,0,0))
  
  ground.isStatic(true)
  ground.show(color(0,255,0))


}