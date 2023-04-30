import { Product, ProductFuncs } from "./product";
import { SubPlan, SubPlanFuncs } from "./subPlan";

export type SubProduct = {
	product: Product;
	plan: SubPlan;
};

export class SubProductFuncs {
	static fromJson = (json: any): SubProduct => {
		return {
			product: ProductFuncs.fromJson(json.product),
			plan: SubPlanFuncs.fromJson(json.subscription_plan),
		};
	};
}
