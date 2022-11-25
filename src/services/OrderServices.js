import axios from "axios";

const API_URL = "https://localhost:7116/Order/";

export default async function GetActiveOrders() {
    return await axios.get(API_URL + 'active/all').then(response => {
        return response.data;
    });
}

export async function changeOrderStatus(order) {
    return await axios.put(API_URL + order.id,  order ).then(response => {
        return response.data;
    });
}