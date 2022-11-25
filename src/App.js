import { useEffect, useState } from "react";
import Column from "./components/column";
import "./styling/App.css";

function App() {
  const [orders, setOrders] = useState([]);
  const [columns, setColumns] = useState([]);

  const statuses = ["New", "In progress", "Done"];
  // const Statuses = {New: "New", In_Progress: "In progress", Done: "Done"};

  useEffect(() => {
    const itemlist1 = [
      { name: "Pizza", count: 1 },
      { name: "Burger", count: 2 },
      { name: "Frietjuh", count: 20 },
      { name: "Cola", count: 3 },
      { name: "Fanta", count: 1 },
    ];
    const itemlist2 = [
      { name: "Koffie", count: 1 },
      { name: "Thee", count: 6 },
      { name: "Cola", count: 10 },
    ];
    const itemlist3 = [
      { name: "Broodje", count: 1 },
      { name: "Croissant", count: 3 },
      { name: "Koekje", count: 20 },
      { name: "blokje kaas", count: 10 },
    ];

    const order1 = {
      color: getRandomColor(),
      id: 1,
      status: statuses[1],
      tableNumber: 1,
      orderNumber: 1,
      items: itemlist1,
      dates: [
        new Date(2022, 10, 24, 13, 11, 20, 0),
        new Date(2022, 10, 24, 13, 55, 0, 0),
        null,
      ],
    };
    const order2 = {
      color: getRandomColor(),
      id: 2,
      status: statuses[0],
      tableNumber: 3,
      orderNumber: 2,
      items: itemlist2,
      dates: [new Date(2022, 10, 24, 13, 22, 0, 0), null, null],
    };
    const order3 = {
      color: getRandomColor(),
      id: 3,
      status: statuses[0],
      tableNumber: 2,
      orderNumber: 3,
      items: itemlist3,
      dates: [new Date(2022, 10, 24, 13, 48, 0, 0), null, null],
    };
    let ordersToSet = sortOrders([order1, order2, order3]);
    // console.log(ordersToSet);
    setOrders(ordersToSet);
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
        if (
          (oldIndex === 0 && index === 1) ||
          (oldIndex === 1 && index === 2)
        ) {
          order.dates[index] = new Date();
        }
      }
      return order;
    });
    const ordersToSet = sortOrders(newOrders);
    console.log(ordersToSet);
    setOrders(ordersToSet);
  }

  function getRandomColor() {
    var h = Math.floor(Math.random() * 360);
    var s = 100;
    var l = 40;

    var color = "hsl(" + h + "," + s + "%," + l + "%)";

    return color;
  }

  function filterColumns() {
    let tempColumns = [];
    statuses.map((status, index) => {
      // console.log(typeof orders);
      const filteredOrders = orders.filter((order) => order.status === status);
      tempColumns.push({
        statusIndex: index,
        status: status,
        orders: filteredOrders,
      });
    });
    setColumns(tempColumns);
  }

  // function sortOrders(orderList) {
  //   return orderList.sort(
  //     (a, b) =>
  //       statuses.indexOf(b.status) - statuses.indexOf(a.status) ||
  //       new Date(b.dates[b.status]) - new Date(a.dates[a.status])
  //   );
  // }

  function sortOrders(orderList) {
    let allOrders = [];
    let newOrders = [];
    let inProgressOrders = [];
    let doneOrders = [];

    orderList.forEach(function (order) {
      switch (order.status) {
        case "New":
          newOrders.push(order);
          break;
        case "In progress":
          inProgressOrders.push(order);
          break;
        case "Done":
          doneOrders.push(order);
          break;
        default:
          break;
      }
    });

    console.log("newOrdersBeforeSort");
    console.log(newOrders);
    console.log("inProgressOrdersBeforeSort");
    console.log(inProgressOrders);
    console.log("doneOrdersBeforeSort");
    console.log(doneOrders);

    newOrders.sort(function (a, b) {
      return (
        new Date(a.dates[statuses.indexOf(a.status)]) -
        new Date(b.dates[statuses.indexOf(b.status)])
      );
    });
    inProgressOrders.sort(function (a, b) {
      return (
        new Date(a.dates[statuses.indexOf(a.status)]) -
        new Date(b.dates[statuses.indexOf(b.status)])
      );
    });
    doneOrders.sort(function (a, b) {
      return (
        new Date(a.dates[statuses.indexOf(a.status)]) -
        new Date(b.dates[statuses.indexOf(b.status)])
      );
    });

    // console.log(
    //   new Date(
    //     inProgressOrders[0].dates[statuses.indexOf(inProgressOrders[0].status)]
    //   ).getTime()
    // );

    console.log("newOrdersAfterSort");
    console.log(newOrders);
    console.log("inProgressOrdersAfterSort");
    console.log(inProgressOrders);
    console.log("doneOrdersAfterSort");
    console.log(doneOrders);

    allOrders = [
      ...allOrders,
      ...newOrders,
      ...inProgressOrders,
      ...doneOrders,
    ];

    return allOrders;
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
