import { Business, BusinessFuncs } from "../business/business";
import { SubProduct, SubProductFuncs } from "../sub_product/subProduct";

export type ExploreResult = {
	subProduct: SubProduct;
	business: Business;
};

export class ExploreResultFuncs {
	static fromJson = (json: any): ExploreResult => {
		return {
			subProduct: SubProductFuncs.fromJson(json.sub_product),
			business: BusinessFuncs.fromJson(json.business),
		};
	};
}
