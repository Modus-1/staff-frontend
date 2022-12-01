import getRandomColor from "./ColorService";
import { statuses } from "../App";

// dummy data for testing because i couldn't be bothered to pull the api from github
export default function GetDummyData(count, tableCount) {
    const itemlist1 = [{name:"Pizza", count:1}, {name:"Burger", count:2}, {name:"Frietjuh", count:20}, {name:"Cola", count:3}, {name:"Fanta", count:1}];
    const itemlist2 = [{name:"Koffie", count:1}, {name:"Thee", count:6}, {name:"Cola", count:10}];
    const itemlist3 = [{name:"Broodje", count:1}, {name:"Croissant", count:3}, {name:"Koekje", count:20}, {name:"blokje kaas", count:10}];

    let orderlist = [];
    for (let i = 1; i < count + 1; i++) {
        const statusnum = i % 3 === 0 ? 1 : i % 3 === 1 ? 2 : 3;
        const tablenum = i % tableCount + 1;
        const itemlist = i % 3 === 0 ? itemlist1 : i % 3 === 1 ? itemlist2 : itemlist3;

        const order = { color:getRandomColor(tablenum), id: i, status: statuses[statusnum - 1], tableNumber: tablenum, orderNumber: i, items: itemlist };
        orderlist.push(order);
    }


    return (orderlist);
  }