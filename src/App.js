import { useEffect, useState } from 'react';
import Column from './components/column';
import './styling/App.css';
import GetActiveOrders, {changeOrderStatus} from "./services/OrderServices"
import getRandomColor from './services/ColorService';
import GetDummyData from './services/DummyDataService';

export const statuses = ["New", "In progress", "Done"];

function App() {
  const [orders, setOrders] = useState([]);
  const [unfilteredOrders, setUnfilteredOrders] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {

    GetActiveOrders().then((result) => {
      let orders = convertServiceDataToOrderData(result.data);
      orders = refreshDates(orders);
      setUnfilteredOrders(result.data);
      sortOrders(orders);
      setOrders(orders);
    });

    // if you want to use dummy data instead of the api, add REACT_APP_USE_DUMMY_DATA=true to the .env file
    if (process.env.REACT_APP_USE_DUMMY_DATA === "true") {
      setOrders(GetDummyData(10,30));
    }
  }, []);
  
  function convertServiceDataToOrderData(orderlist) {
    const orders = orderlist.map((order) => {
      return {
        color: getRandomColor(order.tableId),
        id: order.id,
        status: statuses[order.status],
        totalPrice: order.totalPrice,
        tableNumber: order.tableId,
        orderNumber: order.id,
        dates: [order.creationTime, null, null],
        items: order.items,
        note: order.note,
      };
    });
    return orders;
  }

  function refreshDates(orderList) {
    const orders = orderList.map((order) => {
      const dates = localStorage.getItem(order.id);
      if (dates != null) {
        order.dates = JSON.parse(dates);
      }
      return order;
    });

    return orders;
  }

  useEffect(() => {
    filterColumns();
  }, [orders]);

  function changeStatus(id, status) {
    const newOrders = orders.map((order) => {
      if (order.id === id) {
        let oldIndex = statuses.indexOf(order.status);
        order.status = status;
        let index = statuses.indexOf(status);
        if (
          (oldIndex === statuses.indexOf("New") &&
            index === statuses.indexOf("In progress")) ||
          (oldIndex === statuses.indexOf("In progress") &&
            index === statuses.indexOf("Done"))
        ) {
          order.dates[index] = new Date();
          localStorage.setItem(order.id, JSON.stringify(order.dates));
        }

        const orderToUpdate = unfilteredOrders.find((order) => order.id === id);
        orderToUpdate.status = statuses.indexOf(status);
        changeOrderStatus(orderToUpdate);
      }
      return order;
    });
    const ordersToSet = sortOrders(newOrders);
    setOrders(ordersToSet);
  }
  
  function filterColumns() {
    let tempColumns = [];
    statuses.forEach((status, index) => {
      const filteredOrders = orders.filter((order) => order.status === status);
      tempColumns.push({
        statusIndex: index,
        status: status,
        orders: filteredOrders,
      });
    });
    setColumns(tempColumns);
  }

  function sortOrders(orderList) {
    return orderList.sort(
      (a, b) =>
        statuses.indexOf(b.status) - statuses.indexOf(a.status) ||
        new Date(a.dates[statuses.indexOf(a.status)]) -
          new Date(b.dates[statuses.indexOf(b.status)])
    );
  }

  return (
    <div className="App">
      <div className="columns-container">
        {columns.map((column) => (
          <Column
            index={column.statusIndex}
            statuses={statuses}
            key={column.status}
            text={column.status}
            orders={column.orders}
            changeStatus={changeStatus}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
