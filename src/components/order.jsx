import {useEffect} from 'react';
import "../styling/order.css";
export default function Order(props) {

    const id = Math.floor(Math.random() * 1000000000);
    useEffect(() => {

        document.getElementById(id).style.backgroundColor = props.order.color;
        // props.order.color
    }, []);

    function SetorderToNextRow() {
        props.changeStatus(props.order.id, props.statuses[props.columnIndex+1]);
    }

    function SetorderToPreviousRow() {
        props.changeStatus(props.order.id, props.statuses[props.columnIndex-1]);
    }

    return (
        <div className="order-container">
            <div  id={id} className="order-header">
                <span className="order-header-text">Order {props.order.orderNumber}</span>
                <span className="order-table-text">Table {props.order.tableNumber}</span>
            </div>
            <div className="order-body">
                <div className="order-body-list">
                {props.order.items.map((item, index) => {
                    return (
                        <div key={index} className="order-item-container">
                            <div className="order-item-name">{item.name}</div>
                            <div className="order-item-count">{item.count}</div>
                        </div>)
                })}
                </div>
                <div className="order-btn-container">

                    {props.columnIndex > 0 && 
                        <button className="order-status-button" onClick={SetorderToPreviousRow}>Back</button>
                    }
                    <div className="order-status-button-spacer"></div>
                    {props.columnIndex < props.statuses.length-1 && 
                        <button className="order-status-button" onClick={SetorderToNextRow}>Next</button>
                    }


                </div>
                

            </div>
        </div>
    );
}
