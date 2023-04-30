import { accessTokenKey, endpoint } from "@/misc/constants";
import axios from "axios";
import { CusFuncs } from "@/models/customer/customer";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { setCards, setCus } from "@/redux/customer/cusSlice";
import { CardFuncs, CardInfo } from "@/models/customer/card";
import { SubFuncs } from "@/models/subscription/subscription";
import { Sub } from "@/models/subscription/subscription";
import { Invoice, InvoiceFuncs } from "@/models/subscription/invoice";
import { setInvoices, setSubs } from "@/redux/subscription/subSlice";

axios.interceptors.request.use(
	(config): any => {
		config.withCredentials = true;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export class UserService {
	static getUserData = async (dispatch: Dispatch<AnyAction>) => {
		try {
			const { data } = await axios.get(`${endpoint}/api/user/data`);
			console.log(data);

			const cusJson = data.customer;

			// 1. Save customer
			const customer = CusFuncs.fromJson(cusJson);
			dispatch(setCus(customer));

			// 2. Save cards
			const cards: Array<CardInfo> = [];
			data.cards.map((cardJson: any) =>
				cards.push(CardFuncs.fromJson(cardJson))
			);
			dispatch(setCards(cards));

			// 3. Save subs
			const subs: Array<Sub> = [];
			data.subscriptions.map((subJson: any) =>
				subs.push(SubFuncs.fromJson(subJson))
			);

			dispatch(setSubs(subs));

			// 4. Save invoices
			const invoices: Array<Invoice> = [];
			data.invoices.map((invoiceJson: any) =>
				invoices.push(InvoiceFuncs.fromJson(invoiceJson))
			);
			dispatch(setInvoices(invoices));
		} catch (error) {
			console.log("Failed to get customer data:", error);
		}
	};

	static updateCusName = async (body: {
		firstName: string;
		lastName: string;
	}) =>
		await axios.patch(
			`${endpoint}/api/c/customer/name`,
			{ first_name: body.firstName, last_name: body.lastName },
			{
				withCredentials: true,
			}
		);

	static createCusPass = async () =>
		await axios.post(`${endpoint}/api/c/customer/create_pass`, null, {
			withCredentials: true,
		});
}
