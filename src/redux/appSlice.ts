import { createSlice } from "@reduxjs/toolkit";

export enum AuthStatus {
	loggedIn = "logged in",
	none = "none",
}

export enum AppTab {
	card = "card",
	explore = "explore",
	home = "home",
}
// create a slice
export const AppSlice = createSlice({
	name: "auth",
	initialState: {
		authStatus: AuthStatus.none,
		showLoginModal: false,
		showRegisterModal: false,
		showProductModal: false,
		tab: AppTab.explore,
	},

	reducers: {
		setAuthStatus(state, action) {
			state.authStatus = action.payload;
		},

		setShowLoginModal(state, action) {
			state.showLoginModal = action.payload;
		},
		setShowRegisterModal(state, action) {
			state.showRegisterModal = action.payload;
		},
		setShowProductModal(state, action) {
			state.showProductModal = action.payload;
		},

		setAppTab(state, action) {
			state.tab = action.payload;
		},
	},
});

export const {
	setAuthStatus,
	setShowLoginModal,
	setShowRegisterModal,
	setAppTab,
	setShowProductModal,
} = AppSlice.actions;
export default AppSlice.reducer;
