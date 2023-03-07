import axios from "axios";


// fetch All user (main page)
export const fetchAllUsers = async () => {
	const response = await axios({
		method: "get",
		url: `/api/users/dashboard`,

	});
	return response.data;
};


// add new user(add driver)
export const addUser = async (data) => {
	const response = await axios({
		method: "post",
		url: "/api/users/dashboard",
		data: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response.data;
};

// add new Washer(add driver)
export const addNewWasher = async (data) => {
	const response = await axios({
		method: "post",
		url: "/api/users/dashboard",
		data: data,
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	return response.data;
};

// update Washer

export const updateWasher = async (id, data) => {
	const response = await axios({
		method: "put",
		url: `/api/users/dashboard/${id}`,
		data: data,
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	return response.data;
};


// update user

export const updateUser = async (id, data) => {
	const response = await axios({
		method: "put",
		url: `/api/users/dashboard/${id}`,
		data: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response.data;
};


// delete user 
export const deleteUser = async (deleteSelected) => {
	const response = await axios({
		method: "delete",
		url: `/api/users/dashboard/${deleteSelected}`,
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response.data;
};