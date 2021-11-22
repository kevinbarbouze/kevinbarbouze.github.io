class Rect{
 constructor(x,y,w,h,a){
 this.options = {
   angle:a,
   friction:0.6
 }
   this.body = Bodies.rectangle(x,y,w,h,this.options)
   World.add(world,this.body)
   this.w = w;
   this.h = h;
   this.pos = this.body.position
 
 }
  

  show(c=color(255,0,0)){
    push()
    translate(this.pos.x,this.pos.y)
    rectMode(CENTER)
    fill(c)
    angleMode(RADIANS)
    rotate(this.body.angle)
    rect(0,0,this.w,this.h) 
    pop()
     
  }
  
 
  
  isStatic(b){
   this.body.isStatic = b 
  }
  
}