export type Address = {
	countryCode: string | null;
	line1: string | null;
	line2: string | null;
	postalCode: string | null;
	city: string | null;
};

export class AddressFuncs {
	static internalNull = () => {
		return {
			country_code: null,
			line1: null,
			line2: null,
			postal_code: null,
			city: null,
		};
	};

	static toJson = (address: Address) => {
		if (!address || !address.line1 || !address.postalCode || !address.city) {
			return this.internalNull();
		}

		return {
			country_code: address.countryCode,
			line1: address.line1,
			line2: address.line2,
			postal_code: address.postalCode,
			city: address.city,
		};
	};

	static fromJson = (json: any): Address | null => {
		if (
			json == null ||
			json.line1 == null ||
			json.postal_code == null ||
			json.city == null
		) {
			return null;
		}

		return {
			line1: json.line1,
			line2: json.line2,
			postalCode: json.postal_code,
			city: json.city,
			countryCode: json.country_code,
		};
	};
}
