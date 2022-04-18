import React, { useState, useEffect, useRef } from "react";
import Cell from "./Cell";
import { useInterval } from "../utils/useInterval";
import { positions } from "../constants/positions";
import {
  initializeBoard,
  createRandomFilledBoard,
  patternBoard,
} from "../utils/boardFunction";
import Patterns from "./Patterns";
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
  const [Board, setBoard] = useState(initializeBoard(totalRows, totalColumns));

  const ref = useRef(playing);
  ref.current = playing;

  const randomFill = () => {
    setBoard(createRandomFilledBoard(totalRows, totalColumns));
  };

  const resetBoard = () => {
    setBoard(initializeBoard(totalRows, totalColumns));
    resetGeneration();
    localStorage.removeItem("board");
    localStorage.removeItem("generation");
  };

  const stepByStep = () => {
    ref.current = true;
    createNewBoard(Board);
    handleGeneration();
    ref.current = playing;
  };

  const fillWithPattern = (pattern) => {
    setBoard(patternBoard(totalRows, totalColumns, pattern));
  };

  useEffect(() => {
    setBoard(initializeBoard(totalRows, totalColumns));
  }, [totalRows, totalColumns]); //eslint-disable-line

  useEffect(() => {
    if (localStorage.getItem("board") !== null) {
      setBoard(JSON.parse(localStorage.getItem("board")));
    }
  }, []);

  const createNewBoard = (Board) => {
    if (!ref.current) {
      return;
    }
    let newBoard = JSON.parse(JSON.stringify(Board));
    for (let i = 0; i < totalRows; i++) {
      for (let j = 0; j < totalColumns; j++) {
        let neighbours = 0;

        positions.forEach((pos) => {
          let x = i + pos[0];
          let y = j + pos[1];
          if (x >= 0 && x < totalRows && y >= 0 && y < totalColumns) {
            neighbours += Board[x][y];
          }
        });
        if (neighbours < 2 || neighbours > 3) {
          newBoard[i][j] = 0;
        } else if (Board[i][j] === 0 && neighbours === 3) {
          newBoard[i][j] = 1;
        }
      }
    }
    setBoard(newBoard);
    localStorage.setItem("board", JSON.stringify(Board));
    localStorage.setItem("generation", generation);
  };

  useInterval(
    () => {
      createNewBoard(Board);
      handleGeneration();
    },
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
          {Board &&
            Board.map((row, i) => {
              return (
                <tr id={i} key={i}>
                  {row.map((cell, j) => {
                    return (
                      <Cell
                        key={j}
                        id={i.toString() + "_" + j.toString()}
                        status={cell}
                        board={Board}
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
        <button className="board__buttons" onClick={() => stepByStep()}>
          <UpdateOutlinedIcon fontSize="large" />
        </button>
        <button
          className="board__buttons"
          onClick={() => {
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
        <button className="board__buttons" onClick={() => randomFill()}>
          <ShuffleIcon fontSize="large" />
        </button>
        <button className="board__buttons" onClick={() => resetBoard()}>
          <RestartAltIcon fontSize="large" />
        </button>
      </div>
    </div>
  );
};

export default Board;
