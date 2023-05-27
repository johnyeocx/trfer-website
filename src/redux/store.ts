import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import userSlice from "./user/userSlice";
import serviceSlice from "./service/serviceSlice";

const store = configureStore({
	reducer: {
		app: appSlice,
		userState: userSlice,
		service: serviceSlice,
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
