import { CardInfo } from "@/models/customer/card";
import { Customer } from "@/models/customer/customer";
import { createSlice } from "@reduxjs/toolkit";
import {
	setPageStyleReducer,
	setPageThemeReducer,
	setUserDetailsReducer,
	setUserReducer,
} from "./userReducer";
import { User } from "@/models/user/User";
import { PageStyle } from "@/models/user/PageStyle";
import { PageTheme } from "@/models/page_themes/PageThemes";

export type userStateType = {
	user: User | null;
	pageStyle: PageStyle;
};

const getInitialState = (): userStateType => {
	return {
		user: null,
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
		setPageStyle(state, payload) {
			setPageStyleReducer(state, payload);
		},
		setPageTheme(state, payload) {
			setPageThemeReducer(state, payload);
		},

		setUser(state, payload) {
			setUserReducer(state, payload);
		},

		setUserDetails(state, payload) {
			setUserDetailsReducer(state, payload);
		},
	},
});

export const { setUser, setUserDetails, setPageTheme, setPageStyle } =
	userSlice.actions;
export default userSlice.reducer;
