import { s3Endpoint } from "@/misc/constants";
import { PageTheme, strToPageTheme } from "../page_themes/PageThemes";
import { Address, AddressFuncs } from "./Address";

export type User = {
	id: number;
	email: string;
	accountName: string;
	username: string;
	firstName: string;
	lastName: string;
	bankConnected: boolean;
	accessTokenCreated: boolean;
	pageTheme: PageTheme;

	address: Address | null;
	persAcctId: string;
	persApproved: boolean;
};

export class UserFuncs {
	static fromJson = (json: any): User => {
		return {
			id: json.customer_id,
			email: json.email,
			username: json.username,
			accountName: json.account_name,

			firstName: json.first_name,
			lastName: json.last_name,
			accessTokenCreated: json.access_token_created,

			bankConnected: json.bank_connected,
			pageTheme: strToPageTheme(json.page_theme),
			address: AddressFuncs.fromJson(json.address),
			persAcctId: json.pers_account_id,
			persApproved: json.pers_approved,
		};
	};

	static fullName = (user: User): string => {
		return user.firstName + " " + user.lastName;
	};

	static imagePath = (uId: number): string => {
		return `${s3Endpoint}/user/profile_image/${uId}`;
	};
}
