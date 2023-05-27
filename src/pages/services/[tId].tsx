import React, { useEffect, useState } from "react";
import styles from "../../styles/Services/ManageService/ManageService.module.scss";
import NavBar from "@/components/general/Nav/NavBar";
import TabBar from "@/components/general/Nav/TabBar";
import Margin from "@/components/general/margin";
import { useRouter } from "next/router";
import LoadingFill from "@/components/general/LoadingFill";
import ManageService from "@/components/services/ManageService/ManageService";
import { GenFuncs } from "@/misc/helperFunctions/GenFuncs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ServiceService } from "@/services/serviceService";
import {
	ServiceTemplate,
	TemplateFuncs,
} from "@/models/service/ServiceTemplate";
import { CustomLink, CustomLinkFuncs } from "@/models/service/CustomLink";

type ServiceProps = {};
function Service() {
	const router = useRouter();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const [tId, setTId] = useState<number | null>(null);

	const user = useSelector((state: RootState) => state.userState.user);

	const templates = useSelector((state: RootState) => state.service.templates);

	const [template, setTemplate] = useState<ServiceTemplate | null>(null);
	const [links, setLinks] = useState<Array<CustomLink> | null>(null);

	const initPage = async (tId: number) => {
		if (!user) {
			const success = await GenFuncs.initPage(dispatch, router, () => {
				router.push("/onboarding");
			});
			if (!success) return;
		}

		// if (templates != null) {
		// 	let tIndex = templates.findIndex((t) => t.id == tId);
		// 	if (tIndex != -1) {
		// 		setTemplate(templates[tIndex]);
		// 		setLoading(false);
		// 	}
		// }

		try {
			const { data } = await ServiceService.getServiceData(tId);
			let template = TemplateFuncs.fromJson(data.template);
			setTemplate(template);

			let linksJson = data.custom_links;
			let newLinks = [];
			for (let i = 0; i < linksJson.length; i++) {
				newLinks.push(CustomLinkFuncs.fromJson(linksJson[i]));
			}

			setLinks(newLinks);
			setLoading(false);
		} catch (error) {
			return;
		}
	};

	useEffect(() => {
		console.log(router.query);
		if (router.query && router.query.tId) {
			let tId = parseInt(router.query.tId as string);
			setTId(tId);

			initPage(tId);
		}
	}, [router]);

	return (
		<div className={styles.pageContainer}>
			<NavBar showManage={false} />
			<TabBar />

			{loading ? (
				<LoadingFill />
			) : (
				<ManageService
					links={links!}
					setLinks={setLinks}
					template={template!}
					setTemplate={setTemplate}
				/>
				// <div className={styles.contentContainer}>
				// 	<ManageService />
				// </div>
			)}
		</div>
	);
}

export default Service;
