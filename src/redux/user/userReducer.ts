import { PageTheme } from "@/models/page_themes/PageThemes";
import { userStateType } from "./userSlice";
import { User } from "@/models/user/user";
import { PageStyle } from "@/models/user/PageStyle";

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
		payload: {
			username?: string;
			firstName?: string;
			lastName?: string;
			bankConnected?: boolean;
		};
	}
) => {
	if (state.user === null) return;

	if (action.payload.username !== undefined) {
		state.user.username = action.payload.username;
	}

	if (action.payload.firstName !== undefined)
		state.user.firstName = action.payload.firstName;

	if (action.payload.lastName !== undefined)
		state.user.lastName = action.payload.lastName;

	if (action.payload.bankConnected !== undefined)
		state.user.bankConnected = action.payload.bankConnected;
};

export const setPageStyleReducer = (
	state: userStateType,
	action: {
		payload: PageStyle;
	}
) => {
	state.pageStyle = action.payload;
};

export const setPageThemeReducer = (
	state: userStateType,
	action: {
		payload: { pageTheme?: PageTheme };
	}
) => {
	if (state.pageStyle === null) return;

	if (action.payload.pageTheme !== undefined)
		state.pageStyle.pageTheme = action.payload.pageTheme;
};
