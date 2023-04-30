import { Address, AddressFuncs } from "./address";

export type Customer = {
	id: string;
	email: string;
	uuid: string;
	firstName: string;
	lastName: string;
	signinProvider: string;
	defaultCardId: number | null;
	address: Address | null;
};

export class CusFuncs {
	static fromJson = (json: any): Customer => {
		return {
			id: json.customer_id,
			email: json.email,
			uuid: json.uuid,
			firstName: json.first_name,
			lastName: json.last_name,
			signinProvider: json.signin_provider,
			defaultCardId: json.default_card_id,
			address:
				json.address.line1 == null ? null : AddressFuncs.fromJson(json.address),
		};
	};
}
