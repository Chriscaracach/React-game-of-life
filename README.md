# Conway's Game of Life - React App

Conway's Game of Life is a classic cellular automaton devised by mathematician John Conway. This React application provides a graphical representation of the Game of Life, allowing you to interact with it and observe the evolution of patterns.

## Table of Contents

- [Demo](#demo)
- [About the Game of Life](#about-the-game-of-life)
- [Features](#features)
- [Getting Started](#getting-started)

## Demo

You can try the live demo [here]([insert-link-to-live-demo](https://gameoflife-ccaracach.vercel.app/)).

## About the Game of Life

Conway's Game of Life is a zero-player game that simulates the evolution of cells on a grid. The game consists of the following rules:
- Any live cell with fewer than two live neighbors dies (underpopulation).
- Any live cell with two or three live neighbors lives on to the next generation.
- Any live cell with more than three live neighbors dies (overpopulation).
- Any dead cell with exactly three live neighbors becomes a live cell (reproduction).

This simple set of rules can give rise to complex and fascinating patterns.

## Features

- Interactive grid to set the initial state.
- Start, pause, and reset controls.
- Adjustable grid size and speed.
- Visualization of generations and cell status.

## Getting Started

Follow these steps to set up and run the Conway's Game of Life React app locally:

Clone the Repository:
```shell
git clone https://github.com/Chriscaracach/React-game-of-life
```
Navigate to the Project Directory:
```shell
cd game-of-life
```

Install Dependencies:
```shell
npm install
```

Start the Development Server:
```shell
npm start
```

Open Your Browser:
Open your web browser and go to http://localhost:3000 to see the app in action.
