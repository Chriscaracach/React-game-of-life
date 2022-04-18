import React from "react";
import { changeCellInNewBoard, classStatus } from "../utils/cellFunctions";

const Cell = ({ status, id, board, setBoard }) => {
  let row = Number(id.split("_")[0]);
  let column = Number(id.split("_")[1]);

  return (
    <td
      className={"cell " + classStatus(status)}
      onClick={() => changeCellInNewBoard(row, column, board, setBoard)}
      id={id}
    ></td>
  );
};

export default Cell;
