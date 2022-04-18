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
