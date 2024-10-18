var Cell = (function () {
    function Cell(i, j, wx, wy) {
        this.row = i;
        this.column = j;
        this.wx = wx;
        this.wy = wy;
        this.x = this.row * this.wx;
        this.y = this.column * this.wy;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this._color = "black";
        this.neighbours = [];
        this.previous = undefined;
        this.wall = false;
        this.grid = null;
    }
    Object.defineProperty(Cell.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (color) {
            this._color = color;
            this.render();
        },
        enumerable: true,
        configurable: true
    });
    Cell.prototype.render = function (colorParam) {
        this._color = colorParam || this._color;
        noStroke();
        fill(this._color);
        this.rect = square(this.x, this.y, this.wx);
    };
    Cell.prototype.isEmpty = function () {
        return this._color === "black";
    };
    return Cell;
}());
var Game = (function () {
    function Game(size) {
        this.COLORSANDHSLA = { angle: 40, saturation: 75, lightness: 56 };
        this.size = size;
        this.gameBoard = new Grid(this.size);
    }
    Game.prototype.render = function () {
        this.gameBoard = new Grid(this.size);
    };
    Game.prototype.mouseClicked = function (event) {
        this.cell = this.getCellWhenClick(event);
        this._actionClick();
        this.oldCell = this.cell;
    };
    Game.prototype._actionClick = function (event) {
        if (this.cell != this.oldCell) {
            console.log("actionClick");
            this.cell.color = "white";
        }
    };
    Game.prototype.getBellowCellEmpty = function () {
        var _this = this;
        if (this.cell) {
            if (this.cell.neighbours.length > 0) {
                var bellowArray = this.cell.neighbours.filter(function (cell) {
                    if ((cell === null || cell === void 0 ? void 0 : cell.isEmpty()) && cell.column === _this.cell.column + 1 && cell.row === _this.cell.row) {
                        return true;
                    }
                });
                if (bellowArray.length > 0) {
                    var bellow = bellowArray[0];
                    return bellow;
                }
            }
        }
    };
    Game.prototype.getCellWhenClick = function (e) {
        var x = e.clientX;
        var y = e.clientY;
        var row = Math.floor(x / this.gameBoard.wx);
        var column = Math.floor(y / this.gameBoard.wy);
        return this.getCell(row, column);
    };
    Game.prototype.getCell = function (row, column) {
        if (row < 0 || row >= this.size || column < 0 || column >= this.size) {
            return null;
        }
        return this.gameBoard.gridCell[row][column];
    };
    Game.prototype.toggleColor = function (cell) {
        if (cell.color === "black") {
            var colorSand = this.getColorSandHSLA();
            cell.color = colorSand;
        }
        else {
            cell.color = "black";
        }
    };
    Game.prototype.getColorSandHSLA = function () {
        var angle = this.COLORSANDHSLA.angle;
        angle = this.COLORSANDHSLA.angle + this.randomInt(-5, 20);
        angle = Math.max(angle, 0);
        var saturation = this.COLORSANDHSLA.saturation + this.randomInt(-20, 0);
        saturation = Math.max(saturation, 0);
        var lightness = this.COLORSANDHSLA.lightness;
        lightness = this.COLORSANDHSLA.lightness + this.randomInt(-10, 0);
        lightness = Math.max(lightness, 0);
        return "hsla(" + angle + "," + saturation + "%," + lightness + "%,1)";
    };
    Game.prototype.randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    return Game;
}());
var Grid = (function () {
    function Grid(size) {
        this._size = size;
        this.wx = width / this._size;
        this.wy = height / this._size;
        this.gridCell = this._createGrid();
        this.setNeighbours();
    }
    Object.defineProperty(Grid.prototype, "size", {
        get: function () {
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    Grid.prototype._createGrid = function () {
        var grid = [];
        for (var row = 0; row < this.size; row++) {
            grid[row] = [];
            for (var column = 0; column < this.size; column++) {
                grid[row][column] = new Cell(row, column, this.wx, this.wy);
            }
        }
        return grid;
    };
    Grid.prototype.setNeighbours = function () {
        for (var row = 0; row < this.size; row++) {
            for (var column = 0; column < this.size; column++) {
                var currentCell = this.gridCell[row][column];
                if (row > 0) {
                    var gaucheHaut = this.gridCell[row - 1][column - 1];
                    var gauche = this.gridCell[row - 1][column];
                    var gaucheBas = this.gridCell[row - 1][column + 1];
                    currentCell.neighbours.push(gauche);
                    currentCell.neighbours.push(gaucheHaut);
                    currentCell.neighbours.push(gaucheBas);
                    currentCell.grid = this;
                }
                if (row < this.size - 1) {
                    currentCell.neighbours.push(this.gridCell[row + 1][column]);
                    currentCell.neighbours.push(this.gridCell[row + 1][column + 1]);
                    currentCell.neighbours.push(this.gridCell[row + 1][column - 1]);
                    currentCell.grid = this;
                }
                if (column > 0) {
                    currentCell.neighbours.push(this.gridCell[row][column - 1]);
                }
                if (column < this.size - 1) {
                    currentCell.neighbours.push(this.gridCell[row][column + 1]);
                }
            }
        }
    };
    Grid.prototype.clear = function () {
        for (var row = 0; row < this.size; row++) {
            for (var column = 0; column < this.size; column++) {
                this.gridCell[row][column].color = "black";
            }
        }
    };
    Grid.prototype.swap = function (cellA, cellB) {
        var temp = cellA;
        cellA = cellB;
        cellB = temp;
    };
    Grid.prototype.isEmpty = function (row, column) {
        return this.gridCell[row][column].color === "black";
    };
    Grid.prototype.getCell = function (row, column) {
        if (row >= 0 && row < this.size && column >= 0 && column < this.size) {
            return this.gridCell[row][column];
        }
    };
    Grid.prototype.update = function () {
        for (var row = 0; row < this.size; row++) {
            for (var column = 0; column < this.size; column++) {
                this.gridCell[row][column].render();
            }
        }
    };
    return Grid;
}());
var sliderSize;
var grid;
var nextGrid;
var mouseEvent;
var oldCell;
var initalSize = 41;
var COLORSANDHSLA = { angle: 38, saturation: 75, lightness: 56 };
function setup() {
    console.log("🚀 - Setup initialized - P5 is running");
    createCanvas(windowWidth, windowHeight);
    colorMode(HSL);
    grid = new Grid(initalSize);
    sliderSize = createSlider(initalSize, 100, initalSize, 1).position(10, 10).style("width", "100px");
    var button = createButton("Clear").position(10, 40).style("width", "100px").mouseClicked(function (e) { return grid.clear(); });
    sliderSize.mouseReleased(function (e) {
        var value = sliderSize.elt.value;
        initalSize = value;
        grid = new Grid(initalSize);
        grid.clear();
        grid.update();
    });
    console.log(grid);
}
function mousePressed(e) {
    clickAction(e);
    mouseEvent = e;
}
function getCellWhenClick(e) {
    var x = e.clientX;
    var y = e.clientY;
    var row = Math.floor(x / this.grid.wx);
    var column = Math.floor(y / this.grid.wy);
    return grid.getCell(row, column);
}
function clickAction(e) {
    if (e.target.nodeName === "CANVAS") {
        var cell = getCellWhenClick(e);
        if (cell && cell !== oldCell) {
            cell.color = getColorSandHSLA();
            oldCell = cell;
        }
    }
}
function mouseDragged(e) {
    clickAction(e);
    mouseEvent = e;
}
function getColorSandHSLA() {
    var angle = this.COLORSANDHSLA.angle;
    angle = this.COLORSANDHSLA.angle + this.randomInt(-5, 20);
    angle = Math.max(angle, 0);
    var saturation = this.COLORSANDHSLA.saturation + this.randomInt(-20, 0);
    saturation = Math.max(saturation, 0);
    var lightness = this.COLORSANDHSLA.lightness;
    lightness = this.COLORSANDHSLA.lightness + this.randomInt(-10, 0);
    lightness = Math.max(lightness, 0);
    return "hsla(" + angle + "," + saturation + "%," + lightness + "%,1)";
}
function windowResized() {
    resizeCanvas(500, 500);
    sliderSize.elt.value = initalSize;
    grid = new Grid(initalSize);
}
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function calculateNextGrid() {
    nextGrid = new Grid(initalSize);
    for (var row = 0; row < initalSize; row++) {
        for (var column = 0; column < initalSize; column++) {
            var cell = grid.getCell(row, column);
            if (!(cell === null || cell === void 0 ? void 0 : cell.isEmpty())) {
                var below = grid === null || grid === void 0 ? void 0 : grid.getCell(row, column + 1);
                var bellowLeft = grid === null || grid === void 0 ? void 0 : grid.getCell(row - 1, column + 1);
                var bellowRight = grid === null || grid === void 0 ? void 0 : grid.getCell(row + 1, column + 1);
                var nextCurrentCell = nextGrid.getCell(row, column);
                var nextBelowCell = nextGrid.getCell(row, column + 1);
                var nextBelowLeftCell = nextGrid.getCell(row - 1, column + 1);
                var nextBelowRightCell = nextGrid.getCell(row + 1, column + 1);
                if (below === null || below === void 0 ? void 0 : below.isEmpty()) {
                    nextCurrentCell.color = "black";
                    nextBelowCell.color = getColorSandHSLA();
                }
                else if (bellowLeft === null || bellowLeft === void 0 ? void 0 : bellowLeft.isEmpty()) {
                    nextGrid.getCell(row, column).color = "black";
                    nextBelowLeftCell.color = getColorSandHSLA();
                }
                else if (bellowRight === null || bellowRight === void 0 ? void 0 : bellowRight.isEmpty()) {
                    nextGrid.getCell(row, column).color = "black";
                    nextBelowRightCell.color = getColorSandHSLA();
                }
                else {
                    nextGrid.getCell(row, column).color = cell.color;
                }
            }
        }
    }
    grid = nextGrid;
}
function draw() {
    background(0);
    grid.update();
    calculateNextGrid();
    if (mouseIsPressed) {
        clickAction(mouseEvent);
    }
}
