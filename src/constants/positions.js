//Googleé éste array con las posiciones posibles para las células vecinas
//aunque no sirve para hacer que el tablero sea "esférico"
//Voy a intentar modificarlo para que funcione, pero si no puedo, ese error va a quedar en la app
export const positions = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];
