class Cell{
    constructor(i, j, wx,wy){
        this.row = i;
        this.column = j;
        this.wx = wx;
        this.wy = wy;
        this.x = this.row * this.wx;
        this.y = this.column * this.wy;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.color = "black";
        this.neighbours = [];
        this.previous = undefined;
        this.wall = false;
        this.grid = null;
        this.render();    
    }

    getCoord(row,column){
        return {
            x: row * this.wx,
            y: column * this.wy
        }
    }

    render(color){
        stroke(255);
        fill(color || this.color);
        this.rect = rect(this.x,this.y,this.wx,this.wy);
    }
}