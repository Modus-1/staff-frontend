import axios from "axios";
import getRandomColor from "./ColorService";
import { statuses } from "../App";

const API_URL = "https://localhost:7116/Order/";

export default async function GetActiveOrders() {
  return await axios.get(API_URL + "active/all").then((response) => {
    return response.data;
  });
}

export async function changeOrderStatus(order) {
  return await axios.put(API_URL + order.id, order).then((response) => {
    return response.data;
  });
}


export function convertServiceDataToOrderData(orderlist) {
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