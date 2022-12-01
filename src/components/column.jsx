import "../styling/column.css";
import Order from "./order";

export default function Column(props) {
  return (
    <div className="column-container">
      <div className="column-header">
        <h1>{props.text}</h1>
      </div>
      <div className="column-body">
        <div className="order-list">

          {props.orders.map((order) => {
            return (
              <Order
                statuses={props.statuses}
                columnIndex={props.index}
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
}
