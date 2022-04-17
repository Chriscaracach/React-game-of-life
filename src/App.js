import { useEffect, useState } from "react";
import "./App.css";
import Cell from "./components/Cell";

function App() {
  const [Board, setBoard] = useState([]);
  const [boardWithNeighbours, setBoardWithNeighbours] = useState([]);
  const [newBoard, setNewBoard] = useState([]);
  const [totalRows, setTotalRows] = useState(5);
  const [totalColumns, setTotalColumns] = useState(5);
  const [playInterval, setPlayInterval] = useState(0);

  const getNeighbours = (row, column) => {
    //esquinas
    //Arriba a la izq
    if (row === 0 && column === 0) {
      return [
        Board[row][column + 1].status,
        Board[row + 1][column + 1].status,
        Board[row + 1][column].status,
      ];
    }
    //abajo izq
    if (row === totalRows - 1 && column === 0) {
      return [
        Board[row - 1][column].status,
        Board[row - 1][column + 1].status,
        Board[row][column + 1].status,
      ];
    }
    //Arriba a la derecha
    if (row === 0 && column === totalColumns - 1) {
      return [
        Board[row][column - 1].status,
        Board[row + 1][column - 1].status,
        Board[row + 1][column].status,
      ];
    }
    //abajo der
    if (row === totalRows - 1 && column === totalColumns - 1) {
      return [
        Board[row][column - 1].status,
        Board[row - 1][column - 1].status,
        Board[row - 1][column].status,
      ];
    }
    //lineas
    //top
    if (row === 0 && column > 0 && column < totalColumns) {
      return [
        Board[row][column - 1].status,
        Board[row + 1][column - 1].status,
        Board[row + 1][column].status,
        Board[row + 1][column + 1].status,
        Board[row][column + 1].status,
      ];
    }
    //right
    if (column === totalColumns - 1 && row > 0 && row < totalRows) {
      return [
        Board[row - 1][column].status,
        Board[row - 1][column - 1].status,
        Board[row][column - 1].status,
        Board[row + 1][column - 1].status,
        Board[row + 1][column].status,
      ];
    }
    //bottom
    if (row === totalRows - 1 && column > 0 && column < totalColumns) {
      return [
        Board[row][column - 1].status,
        Board[row - 1][column - 1].status,
        Board[row - 1][column].status,
        Board[row - 1][column + 1].status,
        Board[row][column + 1].status,
      ];
    }
    //left
    if (column === 0 && row > 0 && row < totalRows) {
      return [
        Board[row - 1][column].status,
        Board[row - 1][column + 1].status,
        Board[row][column + 1].status,
        Board[row + 1][column + 1].status,
        Board[row - 1][column].status,
      ];
    }
    //default
    return [
      Board[row - 1][column].status,
      Board[row - 1][column + 1].status,
      Board[row][column + 1].status,
      Board[row + 1][column + 1].status,
      Board[row + 1][column].status,
      Board[row + 1][column - 1].status,
      Board[row][column - 1].status,
      Board[row - 1][column - 1].status,
    ];
  };

  const initializeBoard = () => {
    let arrBoard = [];
    for (let x = 0; x < totalRows; x++) {
      arrBoard.push([]);
      for (let y = 0; y < totalColumns; y++) {
        arrBoard[x].push({
          status: "dead",
          row: x,
          column: y,
          neighbours: [],
        });
      }
    }
    setBoard(arrBoard);
  };

  const setNeighbours = () => {
    //!ESTA FUNCIÖN LA TENGO QUE LLAMAR JUSTO ANTES DE JUGAR
    let boardWithNeighbours = [];
    for (let x = 0; x < totalRows; x++) {
      boardWithNeighbours.push([]);
      for (let y = 0; y < totalColumns; y++) {
        let neighbours = getNeighbours(x, y);
        boardWithNeighbours[x].push({
          status: "dead",
          row: x,
          column: y,
          neighbours: neighbours,
        });
      }
    }
    //!Cuando se hace éste set, no se llega a cambiar el estado en la primera vez, a partir de la segunda si
    setBoardWithNeighbours([...boardWithNeighbours]);
  };

  useEffect(() => {
    setBoard([...boardWithNeighbours]);
  }, [boardWithNeighbours]);

  useEffect(() => {
    //Inicializar tablero
    initializeBoard();
  }, []); //eslint-disable-line

  const createNewBoard = () => {
    let newBoard = [];
    for (let x = 0; x < totalRows; x++) {
      newBoard.push([]);
      for (let y = 0; y < totalColumns; y++) {
        // let newStatus = checkCellCondition(Board[x][y]);
        // console.log(newStatus);
        newBoard[x].push({
          status: "",
          x: x,
          y: y,
          neighbours: [],
        });
      }
    }
    setBoard(newBoard);
    // console.log(newBoard);
    // console.log(Board);
  };

  const logBoard = () => {
    console.log(Board);
  };

  const changeCellInNewBoard = (x, y) => {
    let newBoard = Board;
    if (newBoard[x][y].status === "alive") {
      newBoard[x][y].status = "dead";
    }
    if (newBoard[x][y].status === "dead") {
      newBoard[x][y].status = "alive";
    }
    setBoard(newBoard);
  };

  const checkCellCondition = (cell) => {
    if (cell.status === "alive") {
      console.log("is alive");
      let count = 0;
      cell.neighbours.forEach((status) => {
        if (status === "alive") {
          count++;
        }
      });
      if (count < 2) {
        return "dead";
      }
      if (count < 4) {
        return "alive";
      }
      if (count > 3) {
        return "dead";
      }
    }
    if (cell.status === "dead") {
      // console.log(cell);
      let count = 0;
      for (let i = 0; i < cell.neighbours.length; i++) {
        // console.log("for" + i);
        if (cell.neighbours[i].status === "alive") {
          count++;
          // console.log(count);
        }
      }
      // cell.neighbours.forEach((status) => {
      //   if (status === "alive") {
      //     count++;
      //     console.log(count);
      //   }
      // });
      // if (count > 2) {
      //   console.log("will live");
      //   return "alive";
      // } else {
      //   console.log("will die");
      //   return "dead";
      // }
    }
  };

  const playGame = () => {
    setNeighbours();
    console.log(Board);
    // console.log(checkCellCondition(Board[0][0]));
    if (playInterval) {
      clearInterval(playInterval);
      setPlayInterval(0);
      return;
    }

    let interval = setInterval(() => {
      // console.log("intervalo");
      // console.log(Board);
      // createNewBoard();
      // console.log(setNeighbours());
      // console.log(Board);
    }, 1000);

    setPlayInterval(interval);
  };

  return (
    <div className="App">
      <table>
        <tbody>
          {Board.map((row, i) => {
            return (
              <tr id={i} key={i}>
                {row.map((cell, i) => {
                  return (
                    <Cell
                      key={i}
                      cell={cell}
                      changeCellInNewBoard={changeCellInNewBoard}
                      getNeighbours={getNeighbours}
                      id={cell.row.toString() + cell.column.toString()}
                    ></Cell>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={() => logBoard()}>a ver el tablero</button>
      <button onClick={() => playGame()}>play</button>
    </div>
  );
}

export default App;
