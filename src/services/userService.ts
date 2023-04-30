import { accessTokenKey, endpoint } from "@/misc/constants";
import axios from "axios";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";

import createAuthRefreshInterceptor from "axios-auth-refresh";
import { refreshAuthLogic } from "./authService";
import { setUser } from "@/redux/user/userSlice";
import { UserFuncs } from "@/models/user/user";

axios.interceptors.request.use(
	(config): any => {
		config.withCredentials = true;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Instantiate the interceptor
createAuthRefreshInterceptor(axios, refreshAuthLogic);

export class UserService {
	static emailRegister = async (username: string, email: string) =>
		await axios.post(`${endpoint}/api/user/email_register`, {
			username: username,
			email: email,
		});

	static setNameAndPhoto = async (firstName: string, lastName: string) =>
		await axios.post(`${endpoint}/api/user/name_and_photo`, {
			first_name: firstName,
			last_name: lastName,
		});

	static setPublicToken = async (publicToken: string) =>
		await axios.post(`${endpoint}/api/user/initialise_banking`, {
			public_token: publicToken,
		});

	static getUserData = async (dispatch: Dispatch<AnyAction>) => {
		try {
			const { data } = await axios.get(`${endpoint}/api/user/data`);

			const userJson = data.user;

			const user = UserFuncs.fromJson(userJson);

			return user;
		} catch (error) {
			console.log("Failed to get user data:", error);
		}
	};

	static getUser = async (uId: any) =>
		await axios.get(`${endpoint}/api/user/${uId}`);
}
