import React from "react";
import { changeCellInNewBoard, classStatus } from "../utils/cellFunctions";

const Cell = ({ status, id, board, setBoard }) => {
  //Usando el id que recibimos, obtenemos las coordenadas de cada célula
  let row = Number(id.split("_")[0]);
  let column = Number(id.split("_")[1]);

  return (
    <td
      // La función classStatus() nos devuelve la clase de cada célula de acuerdo al status(0,1) que le pasemos
      className={"cell " + classStatus(status)}
      // Con éste evento, podemos manejar el estado de la célula (viva o muerta)
      onClick={() => changeCellInNewBoard(row, column, board, setBoard)}
      id={id}
    ></td>
  );
};

export default Cell;
