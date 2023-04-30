import { s3Endpoint } from "@/misc/constants";

export type Business = {
	id: number;
	name: string;
	email: string | null;
	country: string | null;
	businessCat: string | null;
	url: string | null;
	description: string | null;
	subCount: number | null;
};

export class BusinessFuncs {
	static fromNameAndId = (name: string, id: number): Business => {
		return {
			id,
			name,
			email: null,
			country: null,
			businessCat: null,
			url: null,
			description: null,
			subCount: null,
		};
	};
	static fromJson = (json: any): Business => {
		return {
			id: json.business_id,
			name: json.name,
			email: json.email,
			country: json.country,
			businessCat: json.business_category,
			url: json.business_url,
			description: json.description,
			subCount: json.sub_count,
		};
	};

	static getImage = (bId: number) => {
		return `${s3Endpoint}/business/profile_image/${bId}`;
	};
}
