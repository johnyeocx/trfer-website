export type Address = {
	country: string | null;
	line1: string | null;
	line2: string | null;
	postalCode: string | null;
	city: string | null;
};

export class AddressFuncs {
	static fromJson = (json: any): Address => {
		return {
			country: json.country,
			line1: json.line1,
			line2: json.line2,
			postalCode: json.postalCode,
			city: json.city,
		};
	};
}
