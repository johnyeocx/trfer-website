export type ProductCat = {
	id: number;
	title: string;
};

export class ProductCatFuncs {
	static fromJson = (json: any): ProductCat => {
		return {
			id: json.category_id,
			title: json.title,
		};
	};
}
