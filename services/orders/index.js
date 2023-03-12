import axios from "axios";

// Get All Orders
export const getAllOrders = async () => {
	const response = await axios({
		method: "get",
		url: `/api/orders/`,
	});
	return response.data;
};

// get order by id 
export const getOrderById = async (id) => {
	const response = await axios({
		method: "get",
		url: `/api/orders/${id}`,
	});
	return response.data;
};
// Delete Order
export const deleteOrder = async (id) => {
	const response = await axios({
		method: "delete",
		url: `/api/orders/${id}`,
	});
	return response.data;
};

