export type CardInfo = {
	id: number;
	last4: string;
	brand: string;
};

export class CardFuncs {
	static fromJson = (json: any): CardInfo => {
		return {
			id: json.card_id,
			last4: json.last4,
			brand: json.brand,
		};
	};
}
