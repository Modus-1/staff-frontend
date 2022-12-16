import React, { useEffect } from "react";
import Column from "../components/column";
import Order from "../components/order";
import "../styling/waiterPage.css";
export default function WaiterPage(props) {
  useEffect(() => {
    console.log(props.columns);
  }, [props.columns]);

  return (
    <div className="waiter-column-list">
      {props.columns.map((column, index) => {
        if (index === 0) {
          return (
            <div className="column-container wide-column" key={index}>
              <div className="column-header">
                <h1>{column.status}</h1>
              </div>
              <div className="column-body">
                <div className="order-list order-list-wide">
                  {column.orders.map((order, index) => {
                    return (
                      <Order
                        statuses={props.statuses}
                        columnIndex={column.statusIndex}
                        key={order.orderNumber}
                        changeStatus={props.changeStatus}
                        order={order}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <Column
              index={column.statusIndex}
              statuses={props.statuses}
              key={column.status}
              text={column.status}
              orders={column.orders}
              changeStatus={props.changeStatus}
            />
          );
        }
      })}
    </div>
  );
}
