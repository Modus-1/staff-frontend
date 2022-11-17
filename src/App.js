import { useEffect, useState } from 'react';
import Column from './components/column';
import './styling/App.css';

function App() {

  const [orders, setOrders] = useState([]);
  const [columns, setColumns] = useState([]);


  const statuses = ["New", "In progress", "Done", "Cancelled", "On hold", "Completed", "Delivered"];


  useEffect(() => {

    const itemlist1 = [{name:"Pizza", count:1}, {name:"Burger", count:2}, {name:"Frietjuh", count:20}];
    const itemlist2 = [{name:"Koffie", count:1}, {name:"Thee", count:6}, {name:"Cola", count:10}];
    const itemlist3 = [{name:"Broodje", count:1}, {name:"Croissant", count:3}, {name:"Koekje", count:20}];
    
    const order1 = { color:getRandomColor(), id: 1, status: statuses[1], tableNumber: 1, orderNumber: 1, items: itemlist1 };
    const order2 = { color:getRandomColor(), id: 2, status: statuses[0], tableNumber: 3, orderNumber: 2, items: itemlist2 };
    const order3 = { color:getRandomColor(), id: 3, status: statuses[0], tableNumber: 2, orderNumber: 3, items: itemlist3 };
    //const order4 = { color:getRandomColor(), id: 4, status: statuses[0], tableNumber: 2, orderNumber: 4, items: itemlist3 };
    // const order5 = { color:getRandomColor(), id: 5, status: statuses[0], tableNumber: 2, orderNumber: 5, items: itemlist3 };
    setOrders([order1, order2, order3]);
  }, []);

  useEffect(() => {
    filterColumns();
  }, [orders]);

  function changeStatus(id, status) {
    const newOrders = orders.map(order => {
      if (order.id === id) {
        order.status = status;
      }
      return order;
    });
    setOrders(newOrders);
  }

  function getRandomColor() {
    
    var h = Math.floor(Math.random() * 360);
    var s = 100;
    var l = 40;

    var color = "hsl(" + h + "," + s + "%," + l + "%)";

    return color
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
