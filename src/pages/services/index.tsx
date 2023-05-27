import NavBar from "@/components/general/Nav/NavBar";
import TabBar from "@/components/general/Nav/TabBar";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Services/Services.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { AppTab, setAppTab } from "@/redux/appSlice";
import { GenFuncs } from "@/misc/helperFunctions/GenFuncs";
import LoadingFill from "@/components/general/LoadingFill";
import ManageService from "../../components/services/ManageService/ManageService";
import { RootState } from "@/redux/store";
import Margin from "@/components/general/margin";
import Services from "@/components/services/Services";

function ServicesPage() {
	const dispatch = useDispatch();
	const router = useRouter();
	const [createOpen, setCreateOpen] = useState(false);
	const user = useSelector((state: RootState) => state.userState.user);
	const templates = useSelector((state: RootState) => state.service.templates);
	const [loading, setLoading] = useState(true);

	const init = async () => {
		dispatch(setAppTab(AppTab.services));
		let success = await GenFuncs.initPage(dispatch, router, () =>
			router.push("/onboarding")
		);
		if (!success) {
			return;
		}

		if (templates != null) {
			setLoading(false);
		}

		success = await GenFuncs.initServices(dispatch, router);
		if (!success) {
			console.log("Failed!!");
			return;
		}

		setLoading(false);
	};
	useEffect(() => {
		init();
	}, []);

	return (
		<div className={styles.pageContainer}>
			<NavBar showManage={false} />
			<TabBar />
			{loading ? (
				<LoadingFill />
			) : (
				<Services />
				// <div className={styles.contentContainer}>
				// 	<ManageService />
				// </div>
			)}
		</div>
	);
}

export default ServicesPage;
