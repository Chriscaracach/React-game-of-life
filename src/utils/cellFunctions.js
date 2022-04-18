//Éste archivo contiene las funciones que modifican a las células
//changeCellInNewBoard() "da o quita" la vida de una célula
//classStatus() Devuelve un className para que la célula modifique su estilo de acuerdo a su estado

export const changeCellInNewBoard = (row, col, board, setBoard) => {
  let newBoard = JSON.parse(JSON.stringify(board));
  if (!newBoard[row][col]) {
    newBoard[row][col] = 1;
  } else if (newBoard[row][col]) {
    newBoard[row][col] = 0;
  }
  setBoard(newBoard);
};

export const classStatus = (status) => {
  if (status === 0) {
    return "dead";
  } else {
    return "alive";
  }
};
