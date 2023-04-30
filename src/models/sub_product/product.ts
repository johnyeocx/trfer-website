import { s3Endpoint } from "@/misc/constants";

export type Product = {
	id: number;
	businessId: number;
	catId: number;
	name: string;
	description: string;
	subCount: number;
	catTitle: string;
};

export class ProductFuncs {
	static getImage = (pId: number) => {
		return `${s3Endpoint}/business/product_image/${pId}`;
	};
	static fromJson = (json: any): Product => {
		return {
			id: json.product_id,
			businessId: json.business_id,
			catId: json.category_id,
			name: json.name,
			description: json.description,
			catTitle: json.category_title,
			subCount: json.sub_count,
		};
	};
}
