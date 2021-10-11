import React, {useEffect, useState} from "react";
import { Cell } from "./Cell";

export const Grid = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [grid, setGrid] = useState([]);
  const [tick, setTick] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;

    setTimeout(() => setTick(tick + 1), 100);
  }, [started, tick]);

  const handleWidthChange = ({target}) => {
    setWidth(parseInt(target.value));
  };

  const handleHeightChange = ({target}) => {
    setHeight(parseInt(target.value));
  };

  const getNeighbors = (x, y) => {
    let neighbors = [];


    for (let rowy = y - 1; rowy <= y + 1; rowy++) {
      if (rowy < 0 || rowy >= width) continue;

      for (let rowx = x - 1; rowx <= x + 1; rowx++) {
        if (rowx < 0 || rowx >= width) continue;
        if (rowx === x && rowy === y) continue;

        neighbors.push(grid[rowy][rowx]);
      }
    }

    return neighbors;
  }
  
  const evaluateCell = (cell) => {
    const neighbors = getNeighbors(cell.x, cell.y).filter((n) => n.alive);

    if (cell.alive && neighbors.length < 2) return false
    if (cell.alive && neighbors.length > 3) return false;
    if (!cell.alive && neighbors.length === 3) return true;

    return cell.alive;
  }

  const evaluateGrid = () => {
    let newGrid = [];

    grid.forEach((row) => {
      let newRow = [];

      row.forEach((cell) => {
        newRow.push(
          {
            ...cell,
            alive: evaluateCell(cell)
          }
        );
      });

      newGrid.push(newRow);
    });

    setGrid(newGrid);
  };

  useEffect(() => {
    evaluateGrid(); 
  }, [tick]);

  useEffect(() => {
    if (width > 0 && height > 0) {
      let tempGrid = [];

      for (let y = 0; y < height; y++) {
        let row = [];

        for (let x = 0; x < width; x++) {
          row.push({
            x,
            y,
            alive: Math.random() < 0.5,
          });
        }

        tempGrid = [...tempGrid, row];
      }

      setGrid(tempGrid);
    }
  }, [width, height])

  return (
    <div className="grid-container">
      <label htmlFor="width">Width</label>
      <input id="width" type="number" onChange={handleWidthChange}></input>

      <br />

      <label htmlFor="height">Height</label>
      <input id="height" type="number" onChange={handleHeightChange}></input>
      
      <h3>Current Generation: {tick}</h3>

      <div className="grid">
        {grid.map((row) => {
          return (
            <div className="row">
              {row.map((cellProps) => <Cell {...cellProps} />)}
            </div>
          )
        })}
      </div>

      <button onClick={() => setStarted(true)}>Start</button>
    </div>
  )
};