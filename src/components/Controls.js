import React from "react";

const Controls = ({
  totalRows,
  totalColumns,
  setRows,
  setColumns,
  intervalTime,
  handleIntervalChange,
}) => {
  return (
    <div className="controls">
      <label htmlFor="">Rows</label>
      <input
        type="number"
        className="controls__input"
        value={totalRows}
        //e.target.value tiene formato de string, necesitamos pasarlo a number
        onChange={(e) => setRows(Number(e.target.value))}
      />
      <label htmlFor="">Columns</label>
      <input
        type="number"
        className="controls__input"
        value={totalColumns}
        onChange={(e) => setColumns(Number(e.target.value))}
      />
      <label htmlFor="">Interval(ms)</label>
      <input
        type="number"
        className="controls__input"
        value={intervalTime}
        step="100"
        onChange={(e) => handleIntervalChange(e.target.value)}
      />
    </div>
  );
};

export default Controls;
