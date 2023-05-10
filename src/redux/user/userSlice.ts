import { createSlice } from "@reduxjs/toolkit";
import {
	setPageStyleReducer,
	setPageThemeReducer,
	setUserDetailsReducer,
	setUserReducer,
} from "./userReducer";
import { User } from "@/models/user/user";
import { PageStyle } from "@/models/user/PageStyle";
import { PageTheme } from "@/models/page_themes/PageThemes";
import { Payment } from "@/models/user/payments";

export type userStateType = {
	user: User | null;
	payments: Array<Payment> | null;
	pageStyle: PageStyle;
};

const getInitialState = (): userStateType => {
	return {
		user: null,
		payments: null,
		pageStyle: {
			pageTheme: PageTheme.light,
		},
	};
};
// create a slice
export const userSlice = createSlice({
	name: "userState",
	initialState: getInitialState(),

	reducers: {
		setPageStyle(state, action) {
			setPageStyleReducer(state, action);
		},
		setPageTheme(state, action) {
			setPageThemeReducer(state, action);
		},

		setUser(state, action) {
			setUserReducer(state, action);
		},

		setUserDetails(state, action) {
			setUserDetailsReducer(state, action);
		},

		setPayments(state, action) {
			state.payments = action.payload;
		},
	},
});

export const {
	setUser,
	setUserDetails,
	setPageTheme,
	setPageStyle,
	setPayments,
} = userSlice.actions;
export default userSlice.reducer;
