import "../styling/column.css";
import Order from "./order";

export default function Column(props) {

  return (
    <div className="column-container">
        <div className="column-header" >
            {props.text}
        </div>
        <div className="column-body">
            {props.orders.map((order) => { return <Order statuses={props.statuses} columnIndex={props.index} key={order.orderNumber} order={order}/> })}
        </div>
    </div>
  );
}