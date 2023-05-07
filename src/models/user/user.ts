import { s3Endpoint } from "@/misc/constants";
import { PageTheme, strToPageTheme } from "../page_themes/PageThemes";

export type User = {
	id: string;
	email: string;
	username: string;
	firstName: string;
	lastName: string;
	publicToken: string;
	pageTheme: PageTheme;
};

export class UserFuncs {
	static fromJson = (json: any): User => {
		return {
			id: json.customer_id,
			email: json.email,
			username: json.username,
			firstName: json.first_name,
			lastName: json.last_name,
			publicToken: json.public_token,
			pageTheme: strToPageTheme(json.page_theme),
		};
	};

	static fullName = (user: User): string => {
		return user.firstName + " " + user.lastName;
	};

	static imagePath = (user: User): string => {
		return `${s3Endpoint}/user/profile_image/${user.id}`;
	};
}
