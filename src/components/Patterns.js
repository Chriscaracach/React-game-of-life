import React from "react";

const Patterns = ({ fillWithPattern }) => {
  return (
    <div className="patterns">
      <p className="patterns__text">Patterns</p>
      <button
        className="patterns__button"
        onClick={() => fillWithPattern("blinker")}
      >
        Blinker
      </button>
      <button
        className="patterns__button"
        onClick={() => fillWithPattern("glider")}
      >
        Glider
      </button>
      <button
        className="patterns__button"
        onClick={() => fillWithPattern("toad")}
      >
        Toad
      </button>
    </div>
  );
};

export default Patterns;
