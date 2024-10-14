class Grid {
    constructor(size) {
        this.size = size;
        this.wx = width/this.size;
        this.wy = height/this.size;
        this.grid = this._createGrid();
         
    }

    _createGrid() {
        let grid = [];
        for (let row = 0; row < this.size; row++) {
            grid[row] = [];
            for (let column = 0; column < this.size; column++) {
                grid[row][column] = new Cell(row, column, this.wx,this.wy);
            }
        }
        return grid;
    }
}