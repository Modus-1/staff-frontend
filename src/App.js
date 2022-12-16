import { useEffect, useState } from "react";
import "./styling/App.css";
import GetActiveOrders, {
  changeOrderStatus,
  convertServiceDataToOrderData,
} from "./services/OrderServices";
import getRandomColor from "./services/ColorService";
import GetDummyData from "./services/DummyDataService";
import OrderWebSocketService from "./services/OrderWebSocketService";
import KitchenPage from "./pages/KitchenPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WaiterPage from "./pages/WaiterPage";
import LandingPage from "./pages/LandingPage";

export const statuses = ["New", "In progress", "Ready", "Delivered"];

const orderWebSocket = new OrderWebSocketService();

function App() {
  const [orders, setOrders] = useState([]);
  const [unfilteredOrders, setUnfilteredOrders] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    orderWebSocket.onNewOrder = (data) => {
      const order = convertServiceDataToOrderData([data])[0];
      setOrders((prev) => sortOrders([...prev, order]));
      setUnfilteredOrders((prev) => [...prev, data]);
    };

    orderWebSocket.onUpdateOrder = (data) => {
      const updatedOrder = convertServiceDataToOrderData([data])[0];

      setOrders((prev) => {
        const newOrders = prev.filter((order) => order.id !== updatedOrder.id);
        return sortOrders([...newOrders, updatedOrder]);
      });
    };
  }, []);

  useEffect(() => {
    GetActiveOrders().then((result) => {
      let orders = convertServiceDataToOrderData(result.data);
      setUnfilteredOrders(result.data);
      orders = sortOrders(orders);
      setOrders(orders);
    });

    // if you want to use dummy data instead of the api, add REACT_APP_USE_DUMMY_DATA=true to the .env file
    if (process.env.REACT_APP_USE_DUMMY_DATA === "true") {
      //setOrders(GetDummyData(5, 4));
    }
  }, []);

  useEffect(() => {
    filterColumns();
  }, [orders]);

  function changeStatus(id, status) {
    const newOrders = orders.map((order) => {
      if (order.id === id) {
        let oldIndex = statuses.indexOf(order.status);
        order.status = status;
        let index = statuses.indexOf(status);
        if (oldIndex < index) {
          order.dates[index] = new Date();
        }

        const orderToUpdate = unfilteredOrders.find((order) => order.id === id);
        orderToUpdate.status = statuses.indexOf(status);
        orderToUpdate.statusTimes[index] = order.dates[index];
        changeOrderStatus(orderToUpdate);
        orderWebSocket.updateOrder(orderToUpdate);
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/kitchen"
            element={
              <KitchenPage
                columns={columns.slice(0, 3)}
                statuses={statuses.slice(0, 3)}
                changeStatus={changeStatus}
              />
            }
          />
          <Route
            path="/waiter"
            element={
              <WaiterPage
                columns={columns.slice(2, statuses.length)}
                statuses={statuses}
                changeStatus={changeStatus}
              />
            }
          />
          <Route path="/*" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
