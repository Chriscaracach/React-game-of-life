//Éste archivo contiene las funciones que modifican al tablero
//initializeBoard() para crear un tablero "vacío"
//createRandomFilledBoard() para crear un tablero con células vivas y muertas de manera aleatoria
//patterBoard() para crear un tablero con los patrones más conocidos

export const initializeBoard = (rows, columns) => {
  let arrBoard = [];
  for (let x = 0; x < rows; x++) {
    arrBoard.push([]);
    for (let y = 0; y < columns; y++) {
      arrBoard[x].push(0);
    }
  }
  return arrBoard;
};

export const createRandomFilledBoard = (rows, columns) => {
  let arrBoard = [];
  for (let x = 0; x < rows; x++) {
    arrBoard.push([]);
    for (let y = 0; y < columns; y++) {
      arrBoard[x].push(Math.random() > 0.5 ? 1 : 0);
    }
  }
  return arrBoard;
};

export const patternBoard = (rows, columns, pattern) => {
  let arrBoard = [];
  for (let x = 0; x < rows; x++) {
    arrBoard.push([]);
    for (let y = 0; y < columns; y++) {
      arrBoard[x].push(0);
    }
  }
  let rowCentre = Math.floor(rows / 2);
  let colCenter = Math.floor(columns / 2);
  if (pattern === "blinker") {
    arrBoard[rowCentre][colCenter] = 1;
    arrBoard[rowCentre][colCenter + 1] = 1;
    arrBoard[rowCentre][colCenter + 2] = 1;
  }
  if (pattern === "glider") {
    arrBoard[rowCentre][colCenter] = 1;
    arrBoard[rowCentre + 1][colCenter + 1] = 1;
    arrBoard[rowCentre + 2][colCenter + 1] = 1;
    arrBoard[rowCentre + 2][colCenter] = 1;
    arrBoard[rowCentre + 2][colCenter - 1] = 1;
  }
  if (pattern === "toad") {
    arrBoard[rowCentre][colCenter] = 1;
    arrBoard[rowCentre][colCenter + 1] = 1;
    arrBoard[rowCentre][colCenter + 2] = 1;
    arrBoard[rowCentre + 1][colCenter - 1] = 1;
    arrBoard[rowCentre + 1][colCenter] = 1;
    arrBoard[rowCentre + 1][colCenter + 1] = 1;
  }
  return arrBoard;
};
