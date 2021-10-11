import './App.css';
import React from "react";
import {Grid} from './components/grid'

function App() {
  return (
    <div className="App">
      <Grid />
    </div>
  );
}

export default App;


// Grid 
//   width: number (30)
//   height: number (30)
// -> 
//   Cells (900 amount)
//     positionX: 20
//     positionY: 25
//     alive: true/false
//     neighbors: Cell[] 8 neighbors


// I want a website where I can upload my PRODUCTS, with a SHOPPING CART, and make a PAYMENT, so I can SHIP them to my CUSTMERS, through the ADMIN