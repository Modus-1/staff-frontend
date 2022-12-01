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
      const orders = convertServiceDataToOrderData(result.data);
      setUnfilteredOrders(result.data);
      setOrders(orders);
    });

    // if you want to use dummy data instead of the api, add REACT_APP_USE_DUMMY_DATA=true to the .env file
    if (process.env.REACT_APP_USE_DUMMY_DATA === "true") {
      setOrders(GetDummyData(10,30));
    }

  }, []);


  

  function convertServiceDataToOrderData(orderlist) {
    const orders = orderlist.map(order => {
      return {
        color: getRandomColor(),
        id: order.id,
        status: statuses[order.status],
        totalPrice: order.totalPrice,
        tableNumber: order.tableId,
        orderNumber: order.id,
        creationTime: order.creationTime,
        items: order.items,
        note: order.note
      }
    });
    return orders;
  }

  useEffect(() => {
    filterColumns();
  }, [orders]);

  function changeStatus(id, status) {
    const newOrders = orders.map(order => {
      if (order.id === id) {
        order.status = status;

        const orderToUpdate = unfilteredOrders.find(order => order.id === id);
        orderToUpdate.status = statuses.indexOf(status);

        changeOrderStatus(orderToUpdate);
      }
      return order;
    });
    setOrders(newOrders);
  }

  

  function filterColumns() {
    let tempColumns = [];
    statuses.map((status, index) => {
      const filteredOrders = orders.filter(order => order.status === status);
      tempColumns.push({ statusIndex:index, status: status, orders: filteredOrders });
    });
    setColumns(tempColumns);
  }

  return (
    <div className="App">
        <div className='columns-container'>
          {columns.map(column => 
            <Column index={column.statusIndex} statuses={statuses} key={column.status} text={column.status} orders={column.orders} changeStatus={changeStatus} />
          )}
        </div>
    </div>
  );
}

export default App;
