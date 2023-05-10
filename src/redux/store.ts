import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import userSlice from "./user/userSlice";

const store = configureStore({
	reducer: {
		app: appSlice,
		userState: userSlice,
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
