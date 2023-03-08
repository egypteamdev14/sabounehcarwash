import axios from "axios";

// Get All Reviews
export const getAllReviews = async () => {
	const response = await axios({
		method: "get",
		url: `/api/reviews/63edf6480f86e10312e777fa`,
	});
	return response.data;
};


// Update Review
export const updateReviews = async (id, data) => { 

	const response = await axios({
		method: "put",
		url: `/api/reviews/${id}`,
		data: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response.data;
};


// Delete Review
export const deleteReview = async (id) => {
	const response = await axios({
		method: "delete",
		url: `/api/reviews/${id}`,
		headers: {
			"Content-Type": "application/json",
		},
	});

	return response.data;
};