import React from "react";
import { useState } from "react";

const Cell = ({ cell, changeCellInNewBoard, getNeighbours, id }) => {
  const [status, setStatus] = useState(cell.status);
  const row = Number(id[0]);
  const column = Number(id[1]);

  const lifeDeath = (event) => {
    if (event.target.classList.contains("alive")) {
      event.target.classList.remove("alive");
      event.target.classList.add("dead");
      setStatus("dead");
    } else {
      event.target.classList.remove("dead");
      event.target.classList.add("alive");
      setStatus("alive");
    }
    changeCellInNewBoard(id[0], id[1]);
  };

  return (
    <td
      className={"cell " + status}
      onClick={(event) => lifeDeath(event)}
      id={id}
    ></td>
  );
};

export default Cell;
