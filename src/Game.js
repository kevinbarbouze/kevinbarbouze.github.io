
class Game{
    constructor(size){
        background(195)
        this.size = size;
        this.gameBoard = new Grid(this.size);
        //console.log(this.gameBoard)
    }

    render(){
        this.gameBoard = new Grid(this.size);
    }
}
