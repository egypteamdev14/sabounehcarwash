import axios from "axios";

// Get All Coupons
export const getAllCoupons = async () => {
	const response = await axios({
		method: "get",
		url: `/api/coupons/`,
	});
	return response.data;
};

// add New Coupon
export const addCoupon = async (data) => {
	const response = await axios({
		method: "post",
		data: JSON.stringify(data),
		url: `/api/coupons/`,
	});
	return response.data;
};

// add New Coupon
export const updateCouponInfo = async (data) => {
	const response = await axios({
		method: "post",
		data: JSON.stringify(data),
		url: `/api/coupons/`,
	});
	return response.data;
};

// get Coupons by id 
export const getCouponById = async (id) => {
	const response = await axios({
		method: "get",
		url: `/api/coupons/${id}`,
	});
	return response.data;
};


// Delete Coupons
export const deleteCoupon = async (id) => {
	const response = await axios({
		method: "delete",
		url: `/api/coupons/${id}`,
	});
	return response.data;
};

