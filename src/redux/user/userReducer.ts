import { userStateType } from "./userSlice";
import { User } from "@/models/user/user";

export const setUserReducer = (
	state: userStateType,
	action: {
		payload: User;
	}
) => {
	state.user = action.payload;
};

export const setUserDetailsReducer = (
	state: userStateType,
	action: {
		payload: { firstName?: string; lastName?: string; publicToken?: string };
	}
) => {
	if (state.user === null) return;

	if (action.payload.firstName !== undefined)
		state.user.firstName = action.payload.firstName;

	if (action.payload.lastName !== undefined)
		state.user.lastName = action.payload.lastName;

	if (action.payload.publicToken !== undefined)
		state.user.publicToken = action.payload.publicToken;
};
