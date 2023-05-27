export type PhoneNumber = {
	dialingCode: string | null;
	number: string | null;
};

export class PhoneNumberFuncs {
	static internalNull = () => {
		return {
			dialing_code: null,
			number: null,
		};
	};

	static parseInputResult = (json: any): PhoneNumber | null => {
		console.log("Input result json:", json);
		if (!json || !json.dialingCode || !json.number) return null;
		return json;
	};

	static fromJson = (json: any): PhoneNumber | null => {
		if (!json || !json.dialing_code || !json.number) return null;
		return {
			dialingCode: json.dialing_code,
			number: json.number,
		};
	};

	static toJson = (p: PhoneNumber) => {
		if (!p || !p.dialingCode || !p.number) {
			return this.internalNull();
		} else
			return {
				dialing_code: p.dialingCode,
				number: p.number,
			};
	};

	static format = (p: PhoneNumber) => {
		return `+${p.dialingCode} ${p.number}`;
	};
}
