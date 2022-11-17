import React from "react";
import "../styling/column.css";
import Order from "./order";

export default function Column(props) {
  return (
    <div className="column-container">
        <div className="column-header" >
            <h1>{props.text}</h1> 
        </div>
        <div className="column-body">
            <Order tableNumber={3} orderNumber={1}></Order>
            <Order tableNumber={69} orderNumber={2}></Order>
        </div>
    </div>
  );
}