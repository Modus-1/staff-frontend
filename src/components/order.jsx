import "../styling/order.css";
export default function Order(props) {
    return (
        <div className="order-container">
            <div className="order-header">
                <span className="order-header-text">Order {props.orderNumber}</span>
                <span className="order-table-text">Table {props.tableNumber}</span>
            </div>
            <div classname="order-body">
                <div className="order-item-container">
                    <div className="order-item-name">item1</div>
                    <div className="order-item-count">10</div>
                </div>
                <div className="order-item-container">
                    <div className="order-item-name">item2</div>
                    <div className="order-item-count">69</div>
                </div>
            </div>
        </div>
    );
}
