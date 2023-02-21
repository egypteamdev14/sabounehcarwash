import axios from "axios";


// fetch All user (main page)
export const fetchAllUsers = async () => {
	const response = await axios({
		method: "get",
		url: `3030/api/users/dashboard`,

	});
	return response.data;
};


// add new user(add driver)
export const addUser = async (data) => {
	const response = await axios({
		method: "post",
		url: "3030/api/users/dashboard",
		data: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response.data;
};

// update user

export const updateUser = async (id, data) => {
	const response = await axios({
		method: "put",
		url: `3030/api/users/dashboard/${id}`,
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
		url: `3030/api/users/dashboard/${deleteSelected}`,
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response.data;
};