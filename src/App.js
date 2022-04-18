import { useState, useEffect } from "react";
import "./App.scss";
import Board from "./components/Board";
import Controls from "./components/Controls";
import Generation from "./components/Generation";

//TODO COMMENTS

function App() {
  const [totalRows, setTotalRows] = useState(40);
  const [totalColumns, setTotalColumns] = useState(40);
  const [intervalTime, setIntervalTime] = useState(500);
  const [generation, setGeneration] = useState(1);

  const setRows = (amount) => {
    setTotalRows(amount);
  };
  const setColumns = (amount) => {
    setTotalColumns(amount);
  };
  const handleIntervalChange = (amount) => {
    setIntervalTime(amount);
  };
  const handleGeneration = () => {
    setGeneration(generation + 1);
  };
  const resetGeneration = () => {
    setGeneration(1);
  };

  useEffect(() => {
    if (localStorage.getItem("generation") !== null) {
      setGeneration(localStorage.getItem("generation"));
    }
  }, []);

  return (
    <div className="App">
      <Controls
        totalRows={totalRows}
        totalColumns={totalColumns}
        setRows={setRows}
        setColumns={setColumns}
        intervalTime={intervalTime}
        handleIntervalChange={handleIntervalChange}
      ></Controls>
      <Board
        totalRows={totalRows}
        totalColumns={totalColumns}
        intervalTime={intervalTime}
        handleGeneration={handleGeneration}
        resetGeneration={resetGeneration}
        generation={generation}
      ></Board>
      <Generation generation={generation}></Generation>
    </div>
  );
}

export default App;
