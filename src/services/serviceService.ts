import { endpoint } from "@/misc/constants";
import axios from "axios";
import { requestInterceptor, responseInterceptor } from "./config";
import { ServiceTemplate } from "@/models/service/ServiceTemplate";
import { CustomLink } from "@/models/service/CustomLink";

axios.interceptors.request.use(requestInterceptor, (error) =>
	Promise.reject(error)
);

axios.interceptors.response.use((response) => {
	return response;
}, responseInterceptor);

export class ServiceService {
	static getServiceData = async (tId: number) =>
		await axios.get(`${endpoint}/api/service/${tId}`);

	static getServiceTemplates = async () =>
		await axios.get(`${endpoint}/api/service/templates`);

	static getTemplatePaymentDetails = async (tStrId: string) =>
		await axios.get(
			`${endpoint}/api/service/template_payment_details/${tStrId}`,
			{
				withCredentials: false,
			}
		);

	static getCustomPaymentDetails = async (tStrId: string) =>
		await axios.get(
			`${endpoint}/api/service/custom_payment_details/${tStrId}`,
			{
				withCredentials: false,
			}
		);

	static updateTemplate = async (template: ServiceTemplate) =>
		await axios.patch(`${endpoint}/api/service/template`, {
			template: template,
		});

	static updateTemplatePublished = async (tId: number, published: boolean) =>
		await axios.patch(`${endpoint}/api/service/template/published`, {
			published: published,
			template_id: tId,
		});

	static createServiceTemplate = async (serviceName: string) =>
		await axios.post(`${endpoint}/api/service/template`, {
			service_name: serviceName,
		});

	static createCustomLink = async (c: any) =>
		await axios.post(`${endpoint}/api/service/custom_link`, {
			custom_link: c,
		});

	static updateCustomLink = async (c: any) =>
		await axios.patch(`${endpoint}/api/service/custom_link`, {
			custom_link: c,
		});

	static deleteCustomLink = async (cId: number) =>
		await axios.delete(`${endpoint}/api/service/custom_link/${cId}`);
}
