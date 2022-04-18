import React, { useState, useEffect, useRef } from "react";

//Componentes
import Cell from "./Cell";
import Patterns from "./Patterns";

//Utilidades
import { useInterval } from "../utils/useInterval";
import { positions } from "../constants/positions";
import {
  initializeBoard,
  createRandomFilledBoard,
  patternBoard,
} from "../utils/boardFunction";

//Componentes e íconos Material UI
import Tooltip from "@mui/material/Tooltip";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";

const Board = ({
  totalRows,
  totalColumns,
  intervalTime,
  handleGeneration,
  resetGeneration,
  generation,
}) => {
  const [playing, setPlaying] = useState(false);
  const [board, setBoard] = useState(initializeBoard(totalRows, totalColumns));

  //Creamos una referencia hacia playing para que se mantenga su valor con cada render nuevo
  const ref = useRef(playing);
  ref.current = playing;

  const randomFill = () => {
    //Ésta funcion sirve para crear tableros con celulas vivas y muertas aleatoriamente
    setBoard(createRandomFilledBoard(totalRows, totalColumns));
  };

  const resetBoard = () => {
    //Función para limpiar el tablero
    setBoard(initializeBoard(totalRows, totalColumns));
    resetGeneration();
    //También se limpia la información del localStorage
    localStorage.removeItem("board");
    localStorage.removeItem("generation");
  };

  const stepByStep = () => {
    //Ésta función sirve para correr el juego "paso a paso", es decir una generación a la vez
    //Para que funcione es necesario "engañar" la referencia que creamos anteriormente
    ref.current = true;
    createNewBoard(board);
    handleGeneration();
    ref.current = playing;
  };

  const fillWithPattern = (pattern) => {
    //Ésta funcion sirve para cargar los patrones habituales del game-of-life (toad, blinker, glider)
    setBoard(patternBoard(totalRows, totalColumns, pattern));
  };

  useEffect(() => {
    //Efecto que se ejecuta cuando se modifican las cantidades de columnas o filas
    setBoard(initializeBoard(totalRows, totalColumns));
  }, [totalRows, totalColumns]);

  useEffect(() => {
    //En el primer render, chequeamos si hay información en localStorage (board)
    if (localStorage.getItem("board") !== null) {
      setBoard(JSON.parse(localStorage.getItem("board")));
    }
  }, []);

  const createNewBoard = (board) => {
    //Función que se repite en bucle durante el juego
    //Primero, chequeamos el estado de la referencia
    if (!ref.current) {
      return;
    }

    //Creamos un tablero nuevo
    let newBoard = JSON.parse(JSON.stringify(board));

    //Iteramos por cada célula
    for (let i = 0; i < totalRows; i++) {
      for (let j = 0; j < totalColumns; j++) {
        let neighborsAlive = 0;

        //Iteramos por todas las posiciones que rodean a la célula
        positions.forEach((pos) => {
          let x = i + pos[0];
          let y = j + pos[1];

          //Chequeamos si las células vecinas están vivas o muertas
          if (x >= 0 && x < totalRows && y >= 0 && y < totalColumns) {
            neighborsAlive += board[x][y];
          }
        });

        //Revisamos cuantas células vecinas están vivas y cuántas muertas
        //De acuerdo a eso, devolvemos 0 o 1
        if (neighborsAlive < 2 || neighborsAlive > 3) {
          newBoard[i][j] = 0;
        } else if (board[i][j] === 0 && neighborsAlive === 3) {
          newBoard[i][j] = 1;
        }
      }
    }

    //Creamos tablero nuevo y lo guardamos en localStorage
    setBoard(newBoard);
    localStorage.setItem("board", JSON.stringify(Board));
    localStorage.setItem("generation", generation);
  };

  //Intervalo que usamos para el juego, más información en ../utils/useInterval.js
  useInterval(
    () => {
      createNewBoard(Board);
      handleGeneration();
    },
    //Operador ternario porque sino el setInterval arranca con el primer render
    playing ? intervalTime : null
  );

  return (
    <div className="board">
      <Patterns
        fillWithPattern={fillWithPattern}
        totalRows={totalRows}
        totalColumns={totalColumns}
      ></Patterns>
      <table>
        <tbody>
          {/* Iteramos para mostrar el tablero */}
          {board &&
            board.map((row, i) => {
              return (
                <tr id={i} key={i}>
                  {row.map((cell, j) => {
                    return (
                      <Cell
                        key={j}
                        // El prop "id" es muy importante (y su formato también) para poder realizar acciones sobre cada célula
                        id={i.toString() + "_" + j.toString()}
                        status={cell}
                        board={board}
                        setBoard={setBoard}
                      ></Cell>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="board__controls">
        <Tooltip title="Run Step-by-step" placement="right">
          <button className="board__buttons" onClick={() => stepByStep()}>
            <UpdateOutlinedIcon fontSize="large" />
          </button>
        </Tooltip>
        <Tooltip title="Run" placement="right">
          <button
            className="board__buttons"
            onClick={() => {
              //Cambiamos el estado de playing y la referencia
              setPlaying(!playing);
              if (!playing) {
                ref.current = true;
              }
            }}
          >
            {!playing ? (
              <PlayCircleOutlineIcon fontSize="large" />
            ) : (
              <PauseCircleOutlineIcon fontSize="large" />
            )}
          </button>
        </Tooltip>
        <Tooltip title="Random" placement="right">
          <button className="board__buttons" onClick={() => randomFill()}>
            <ShuffleIcon fontSize="large" />
          </button>
        </Tooltip>
        <Tooltip title="Reset" placement="right">
          <button className="board__buttons" onClick={() => resetBoard()}>
            <RestartAltIcon fontSize="large" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Board;
