import { CardInfo } from "@/models/customer/card";
import { Customer } from "@/models/customer/customer";
import { createSlice } from "@reduxjs/toolkit";
import {
	setCardsReducer,
	setCusDetailsReducer,
	setCusReducer,
} from "./cusReducers";

export type cusStateType = {
	cus: Customer | null;
	cards: Array<CardInfo> | null;
};

const getInitialState = (): cusStateType => {
	return {
		cus: null,
		cards: null,
	};
};
// create a slice
export const cusSlice = createSlice({
	name: "cusState",
	initialState: getInitialState(),

	reducers: {
		setCus(state, payload) {
			setCusReducer(state, payload);
		},

		setCusDetails(state, payload) {
			setCusDetailsReducer(state, payload);
		},

		setCards(state, payload) {
			setCardsReducer(state, payload);
		},
	},
});

export const { setCus, setCards, setCusDetails } = cusSlice.actions;
export default cusSlice.reducer;
