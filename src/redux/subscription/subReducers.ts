import { Subscription } from "react-redux";
import { subStateType } from "./subSlice";
import { Invoice } from "@/models/subscription/invoice";
import { Sub } from "@/models/subscription/subscription";

export const setSubsReducer = (
	state: subStateType,
	action: {
		payload: Array<Sub>;
	}
) => {
	state.subs = action.payload;

	const idToSub: { [key: number]: Sub } = {};
	action.payload.map((sub: Sub) => {
		idToSub[sub.id] = sub;
	});
	state.idToSub = idToSub;
};

export const setInvoicesReducer = (
	state: subStateType,
	action: {
		payload: Array<Invoice>;
	}
) => {
	state.invoices = action.payload;
};
