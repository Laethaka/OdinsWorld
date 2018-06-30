import React from "react";
import './Row.css';

export const Row = ({ fluid, children }) => (
  <div className={`row${fluid ? "-fluid" : ""} row-margin`}>
    {children}
  </div>
);
