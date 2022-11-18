import {useEffect, useContext} from 'react';
import "../styling/order.css";
import arrow_forward_img from "../images/arrow_forward.svg";
import deleteImg from "../images/delete.svg";
import {OrderContext} from "../App";

export default function Order(props) {
    const deleteOrder = useContext(OrderContext).deleteOrder;
    const changeStatus = useContext(OrderContext).changeStatus;

    const id = Math.floor(Math.random() * 1000000000);
    useEffect(() => {

        document.getElementById(id).style.backgroundColor = props.order.color;
        // props.order.color
    }, []);

    function SetorderToNextRow() {
        changeStatus(props.order.id, props.statuses[props.columnIndex+1]);
    }

    function SetorderToPreviousRow() {
        changeStatus(props.order.id, props.statuses[props.columnIndex-1]);
    }

    function deleteOrderFromList() {
        deleteOrder(props.order.id);
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
                        <button className="order-status-button btn-main" onClick={SetorderToPreviousRow}><img className="order-prev-img" src={arrow_forward_img} alt="previous"></img></button>
                    }

                    <div className="order-status-button-spacer"></div>
                    {props.columnIndex < props.statuses.length-1 && 
                        <button className="order-status-button btn-main" onClick={SetorderToNextRow}>
                                <img src={arrow_forward_img} alt="next"></img>
                            </button>
                    }

                    {props.columnIndex === props.statuses.length-1 && 
                        <button className="order-status-button btn-delete" onClick={deleteOrderFromList}>
                                <img src={deleteImg} alt="Delete"></img>
                            </button>
                    }


                </div>
                

            </div>
        </div>
    );
}
