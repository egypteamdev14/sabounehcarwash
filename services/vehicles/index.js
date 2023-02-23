import axios from "axios";

// GET ALL VEHICLES 
export const getAllVehicles = async () => {
	const response = await axios({
		url: "/api/vehicles",
		method: "get",
		headers: {
			"Content-Type": "application/json"
		}
	})

	return response.data
}

// ADD NEW VEHICLES 
export const addNewVehicle = async (data) => {
	const response = await axios({
		url: "/api/vehicles",
		method: "post",
		data: data,
		headers: {
			"Content-Type": "multipart/form-data"
		}
	});

	return response.data
}

// UPDATE VEHICLE BY ID
export const updateVehicle = async (id, data) => {
	const response = await axios({
		url: `/api/vehicles/${id}`,
		method: "put",
		data: data,
		headers: {
			"Content-Type": "application/json"
		}
	});

	return response.data
}

// DELETE VEHICLE BY ID
export const deleteVehicle = async (id) => {
	const response = await axios({
		url: `/api/vehicles/${id}`,
		method: "delete",
		headers: {
			"Content-Type": "application/json"
		}
	});

	return response.data
}