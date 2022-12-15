const socketUrl = "ws://localhost:6969/order/";

export default class OrderWebSocketService {
  constructor() {
    this.newOrderSocket = new WebSocket(socketUrl + "new");

    this.newOrderSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.onNewOrder(data);
    };

    this.updateOrderSocket = new WebSocket(socketUrl + "update");

    this.updateOrderSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.onUpdateOrder(data);
    };
  }

  onNewOrder = (data) => {
    return;
  };

  onUpdateOrder = (data) => {
    return;
  };

  updateOrder(order) {
    console.log(order);
    this.updateOrderSocket.send(JSON.stringify(order));
  }
}
