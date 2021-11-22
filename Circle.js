
class Circle{
 constructor(x,y,r){
   this.options = {
     friction:0.6,
     restitution:1,
    angle:0
   }
   this.body = Bodies.circle(x,y,r,this.options)
   World.add(world,this.body)
   this.r= r;
   this.pos = this.body.position
   this.couleur = returnColor()
   
 }
  
 isOffScreen(){
  if(this.pos.y >  height + this.r*2){
   return true;
  }
 }

  show(c=this.couleur){
    let angle
    angle =this.body.angle
  
    push()
    translate(this.pos.x,this.pos.y)
    rotate(angle)
    fill(c)
    rectMode(CENTER)
    ellipse(0,0,this.r*2) 
    pop()
  }
  
  isStatic(b){
   this.body.isStatic = b 
  }
}