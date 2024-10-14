let game;
let grid;
let row = 0;
let column = 0;
let cell;
let oldCell;

function setup() {
  createCanvas(420, 420);
  game = new Game(25);
  grid = game.gameBoard.grid;
  console.log(game)
}

function draw() {
  if (cell !== oldCell && cell != undefined) {
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
  console.log("toggleColor")
  toggleCellColor();

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
  while (color == cell.color) {
    randomNumber = Math.round(random(0, colors.length - 1));
    color = colors[randomNumber];
  };
  return color;
}


function fallInBoard() {
  if (cell.column < game.size) {

    cell.column = cell.column + 1
    let coord = cell.getCoord(cell.row, cell.column);
    cell.color = getCellColor();
    cell.x = coord.x;
    cell.y = coord.y;
    cell?.render();

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
})