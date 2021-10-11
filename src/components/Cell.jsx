import React from 'react';

export const Cell = ({x, y, alive}) => {

  return (
    <div className={`cell ${alive && "alive"}`}></div>
  );
};