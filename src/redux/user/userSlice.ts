import { CardInfo } from "@/models/customer/card";
import { Customer } from "@/models/customer/customer";
import { createSlice } from "@reduxjs/toolkit";
import { setUserDetailsReducer, setUserReducer } from "./userReducer";
import { User } from "@/models/user/user";

export type userStateType = {
	user: User | null;
};

const getInitialState = (): userStateType => {
	return {
		user: null,
	};
};
// create a slice
export const userSlice = createSlice({
	name: "userState",
	initialState: getInitialState(),

	reducers: {
		setUser(state, payload) {
			setUserReducer(state, payload);
		},
		setUserDetails(state, payload) {
			setUserDetailsReducer(state, payload);
		},
	},
});

export const { setUser, setUserDetails } = userSlice.actions;
export default userSlice.reducer;
