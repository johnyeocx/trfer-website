import { endpoint } from "@/misc/constants";
import axios from "axios";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { UserFuncs } from "@/models/user/user";
import { requestInterceptor, responseInterceptor } from "./config";
import { Payment, PaymentFuncs } from "@/models/user/payments";
import { Address } from "@/models/user/Address";

axios.interceptors.request.use(requestInterceptor, (error) =>
	Promise.reject(error)
);

axios.interceptors.response.use((response) => {
	return response;
}, responseInterceptor);

export class UserService {
	static externalRegister = async (token: string, username: string) =>
		await axios.post(
			`${endpoint}/api/user/external_register`,
			{
				token: token,
				username: username,
			},
			{ withCredentials: false }
		);

	static emailRegister = async (username: string, email: string) =>
		await axios.post(`${endpoint}/api/user/email_register`, {
			username: username,
			email: email,
		});

	static setAccountDetails = async (accountName: string) =>
		await axios.post(`${endpoint}/api/user/account_details`, {
			account_name: accountName,
		});

	static setProfileImage = async () =>
		await axios.patch(`${endpoint}/api/user/profile_image`);

	static setName = async (firstName: string, lastName: string) =>
		await axios.patch(`${endpoint}/api/user/name`, {
			first_name: firstName,
			last_name: lastName,
		});

	static setAddress = async (address: Address) =>
		await axios.patch(`${endpoint}/api/user/address`, {
			line1: address.line1,
			line2: address.line2,
			city: address.city,
			postal_code: address.postalCode,
		});

	static setUsername = async (username: string) =>
		await axios.patch(`${endpoint}/api/user/username`, {
			username: username,
		});

	static setPublicToken = async (publicToken: string) =>
		await axios.post(`${endpoint}/api/user/initialise_banking`, {
			public_token: publicToken,
		});

	static setPageTheme = async (pageTheme: string) =>
		await axios.patch(`${endpoint}/api/user/page_theme`, {
			page_theme: pageTheme,
		});

	static getUserData = async (dispatch: Dispatch<AnyAction>) => {
		try {
			const { data } = await axios.get(`${endpoint}/api/user/data`, {
				withCredentials: true,
			});

			const userJson = data.user;

			const user = UserFuncs.fromJson(userJson);

			return user;
		} catch (error) {
			console.log("Failed to get user data:", error);
		}
	};

	static getUser = async (uId: any) =>
		await axios.get(`${endpoint}/api/user/${uId}`);

	static getUserPayments = async () => {
		const { data } = await axios.get(`${endpoint}/api/user/executed_payments`);
		let payments: Array<Payment> = [];
		data.map((payment: any) => {
			payments.push(PaymentFuncs.fromJson(payment));
		});
		return payments;
	};
}
