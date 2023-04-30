import { createSlice } from "@reduxjs/toolkit";
import { Invoice } from "@/models/subscription/invoice";
import { setInvoicesReducer, setSubsReducer } from "./subReducers";
import { Sub } from "@/models/subscription/subscription";

export type subStateType = {
	subs: Array<Sub> | null;
	idToSub: {
		[key: number]: Sub;
	} | null;
	invoices: Array<Invoice> | null;
};

const getInitialState = (): subStateType => {
	return {
		subs: null,
		idToSub: {},
		invoices: null,
	};
};
// create a slice
export const subSlice = createSlice({
	name: "subState",
	initialState: getInitialState(),

	reducers: {
		setSubs(state, payload) {
			setSubsReducer(state, payload);
		},
		setInvoices(state, payload) {
			setInvoicesReducer(state, payload);
		},
	},
});

export const { setSubs, setInvoices } = subSlice.actions;
export default subSlice.reducer;
