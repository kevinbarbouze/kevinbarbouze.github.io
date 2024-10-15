
let game;
let grid;
let row = 0;
let column = 0;
let cell;
let oldCell;
let mainColor;

function setup() {
  createCanvas(420, 420);
  game = new Game(25);
  grid = game.gameBoard.grid;
  console.log(game)
  console.log(this)
}

function draw() {

}

function mouseDragged() {
  if (cell) {
    oldCell = cell;
  }
  cell = this.calculateCell();
  if (oldCell !== cell) {
    toggleCellColor();
    //fallInBoard();
  }
}



function getCell(x = row, y = column) {
  if (x >= 0 && y >= 0) {
    if (x < grid.length && y < grid[0].length) {
      cell = grid[x][y];
      if (cell) {
        return cell;
      }
    }
  }
}

function calculateCell() {
  let row = floor(mouseX / game.gameBoard.wx);
  let column = floor(mouseY / game.gameBoard.wy);
  cell = getCell(row, column);
  return cell;
}

function mouseClicked() {
  if (cell) {
    oldCell = cell;
  }
  cell = this.calculateCell();
  toggleCellColor();
  //fallInBoard();
}

function toggleCellColor() {
  let color = getCellColor();
  cell.color = color;
  cell?.render();
}

function getCellColor() {
  let colors = ["#292f56", "#1e4572", "#005c8b", "#007498", "#008ba0", "#00a3a4", "#00bca1", "#00d493", "#69e882", "#acfa70"];
  let randomNumber = Math.round(random(0, colors.length - 1));
  let color = colors[randomNumber];
  return mainColor ||color;
}

function getCoord(row, column) {
  return {
    x: row * cell.wx,
    y: column * cell.wy
  }
}

function getCellAndRowByCoord(x, y) {
  return {
    row: Math.round(x / cell.wx),
    column: Math.round(y / cell.wy)
  }
}


function fallInBoard() {
  let column = 0;
  if (cell) {
    column = cell.column
    if (cell.column <= game.size) {
      while (column < game.size) {
        column = column + 1
        let newCell = getCell(cell.row, column);
        if (newCell) {
          newCell.color = getCellColor();
          newCell.render();
        }
      }
    }
  }
}

document.addEventListener("contextmenu", (event) => {
  let target = event.target;
  if (target.classList.contains("p5Canvas")) {
    event.preventDefault();
    oldCell = cell;
    cell = this.calculateCell();
    cell.color = "black";
    cell.render();
  }

  
});

document.addEventListener("click",(event) => {
  let target = event.target;
    if(target.dataset.color){
      if(target.dataset.color !== "magic"){
        mainColor = target.dataset.color;
      }else{
        mainColor = null
      }
    }
})
