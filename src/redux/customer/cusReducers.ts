import { CardInfo } from "@/models/customer/card";
import { cusStateType } from "./cusSlice";
import { Customer } from "@/models/customer/customer";

export const setCusReducer = (
	state: cusStateType,
	action: {
		payload: Customer;
	}
) => {
	state.cus = action.payload;
};

export const setCardsReducer = (
	state: cusStateType,
	action: {
		payload: Array<CardInfo>;
	}
) => {
	state.cards = action.payload;
};

export const setCusDetailsReducer = (state: cusStateType, action: any) => {
	const payload = action.payload;
	if (payload.firstName !== undefined && payload.lastName !== undefined) {
		let newCus: any = {
			...state.cus,
			firstName: payload.firstName,
			lastName: payload.lastName,
		};
		state.cus = newCus;
	}
};
