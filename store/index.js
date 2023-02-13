import { configureStore } from "@reduxjs/toolkit";
import User from './slices/getuser'

export default configureStore({

	reducer: {
		auth: User
	},
});