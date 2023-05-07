import { endpoint } from "@/misc/constants";
import axios from "axios";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { UserFuncs } from "@/models/user/User";
import { requestInterceptor, responseInterceptor } from "./config";

axios.interceptors.request.use(requestInterceptor, (error) =>
	Promise.reject(error)
);

axios.interceptors.response.use((response) => {
	return response;
}, responseInterceptor);

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

	static setProfileImage = async () =>
		await axios.patch(`${endpoint}/api/user/profile_image`);

	static setName = async (firstName: string, lastName: string) =>
		await axios.patch(`${endpoint}/api/user/name`, {
			first_name: firstName,
			last_name: lastName,
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
}
