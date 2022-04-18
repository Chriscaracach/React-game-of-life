import { useEffect, useRef } from "react";

//Voy a ser sincero, éste custom Hook lo obtuve de internet.
//Parece que usar setInterval() choca con algunas de las características de React
//y no funciona bien.
//En mi proyecto no funcionaba bien. El juego quedaba en loop entre la segunda y tercera generación.
//Dan Abramov creó éste hook para solucionar ese problema (que no termino de comprender a la perfección).
//Después de buscar mucho, encontré ésto en el blog de Dan Abramov y decidí probarlo y funcionó
//https://overreacted.io/making-setinterval-declarative-with-react-hooks/

export const useInterval = (callback, delay) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    //Lo único que modifiqué de éste Hook fue ésta condicion, porque a veces se quedaba haciendo un loop infinito.
    if (delay !== null && delay !== 0 && delay !== undefined) {
      let interval = setInterval(tick, delay);
      return () => clearInterval(interval);
    }
  }, [delay]);
};
