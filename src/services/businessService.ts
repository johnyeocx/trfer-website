import { endpoint } from "@/misc/constants";
import { Business, BusinessFuncs } from "@/models/business/business";
import {
	ProductCat,
	ProductCatFuncs,
} from "@/models/sub_product/product_category";
import { SubProduct, SubProductFuncs } from "@/models/sub_product/subProduct";
import axios from "axios";

axios.interceptors.request.use(
	(config): any => {
		config.withCredentials = true;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export class BusinessService {
	static getBusiness = async (bId: number): Promise<Business | null> => {
		try {
			const { data } = await axios.get(`${endpoint}/api/c/business/${bId}`);

			const business = BusinessFuncs.fromJson(data);

			return business;
		} catch (error) {
			return null;
		}
	};
	static getBusinessData = async (
		bId: number
	): Promise<{
		business: Business;
		subProducts: Array<SubProduct>;
		productCats: Array<ProductCat>;
	} | null> => {
		try {
			const { data } = await axios.get(
				`${endpoint}/api/c/business/data/${bId}`
			);

			const business = BusinessFuncs.fromJson(data.business);

			const subProducts: Array<SubProduct> = [];

			data.sub_products.map((subProduct: any) =>
				subProducts.push(SubProductFuncs.fromJson(subProduct))
			);

			const productCats: Array<ProductCat> = [];
			data.product_categories.map((productCat: any) =>
				productCats.push(ProductCatFuncs.fromJson(productCat))
			);

			return {
				business,
				subProducts,
				productCats,
			};
		} catch (error) {
			return null;
		}
	};
}
