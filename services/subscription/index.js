import axios from "axios";


// fetch All Subscription (main page)
export const getAllSubscription = async () => {
	const response = await axios({
		method: "get",
		url: `/api/subscriptions/`,
	});
	return response.data;
};


// add new Subscription
export const addSubscription = async (data) => {
	const response = await axios({
		method: "post",
		url: "/api/subscriptions/",
		data: data,
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	return response.data;
};

// update Subscription by id
export const updateSubscription = async (id, data) => {
	const response = await axios({
		method: "put",
		url: `/api/subscriptions/${id}`,
		data: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response.data;
};


// delete Subscription by id
export const deleteSubscription = async (deleteSelected) => {
	const response = await axios({
		method: "delete",
		url: `/api/subscriptions/${deleteSelected}`,
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response.data;
};