import { RootState } from "@/redux/store";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/Home/Home.module.scss";
import { useRouter } from "next/router";

import LoadingPage from "@/components/general/LoadingPage";
import { UserService } from "@/services/userService";
import InputDetails from "@/components/auth/register/03_InputDetails";
import ConnectBank from "@/components/auth/register/04_ConnectBank";
import { setPageTheme, setUser } from "@/redux/user/userSlice";
import { BankingService } from "@/services/bankingService";
import NavBar from "@/components/navbar";
import Margin from "@/components/general/margin";
import { UserFuncs } from "@/models/user/user";
import Image from "next/image";
import AuthTextField from "@/components/auth/authTextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowUpFromBracket,
	faChevronRight,
	faShare,
	faShareFromSquare,
} from "@fortawesome/pro-solid-svg-icons";
import Account from "@/components/home/account/Account";
import EditPage from "@/components/home/account/EditPage";
import Details from "@/components/home/account/Details";

export enum Tab {
	customise,
	account,
	transactions,
}

function HomePage() {
	const dispatch = useDispatch();
	const router = useRouter();
	const user = useSelector((state: RootState) => state.userState.user);
	const pageLoading = useSelector((state: RootState) => state.app.loading);
	const [loading, setLoading] = useState<boolean>(true);
	const [linkToken, setLinkToken] = useState(null);
	const [tab, setTab] = useState(Tab.account);

	const getLinkToken = async () => {
		try {
			const { data } = await BankingService.getAuthLinkToken();
			setLinkToken(data.link_token);
		} catch (error: any) {
			console.log(error);
			setLoading(false);
			return;
		}
	};

	const initPage = async () => {
		const user = await UserService.getUserData(dispatch);
		if (!user) {
			router.push("/login");
			return;
		}
		if (
			user!.firstName == null ||
			user!.lastName == null ||
			user!.publicToken == null
		) {
			await getLinkToken();
		}

		dispatch(setUser(user));
		dispatch(setPageTheme({ pageTheme: user.pageTheme }));

		setLoading(false);
	};

	useEffect(() => {
		initPage();
	}, []);

	if (loading) return <LoadingPage />;

	if (user?.firstName === null || user?.lastName === null)
		return <InputDetails />;
	else if (user?.publicToken === null) {
		return <ConnectBank token={linkToken} />;
	} else {
		return (
			<>
				{pageLoading && <LoadingPage bgColor="rgba(20, 20, 20, 0.3)" />}
				<NavBar />

				<div className={styles.pageContainer}>
					<div className={styles.header}>
						<p className={styles.headerText}>Admin</p>
						<FontAwesomeIcon
							icon={faArrowUpFromBracket}
							className={styles.shareIcon}
						/>
					</div>
					<Margin height={12} />
					<div className={styles.tabContainer}>
						{/* <TabButton
							title="Customise"
							thisTab={Tab.customise}
							tab={tab}
							setTab={setTab}
						/> */}
						<TabButton
							title="Account"
							thisTab={Tab.account}
							tab={tab}
							setTab={setTab}
						/>
						<TabButton
							title="Transactions"
							thisTab={Tab.transactions}
							tab={tab}
							setTab={setTab}
						/>
					</div>
					<Margin height={25} />
					{tab == Tab.account ? <Account /> : <Details />}
					{/* <Account /> */}
				</div>
			</>
		);
	}
}

export default HomePage;

export const TabButton = ({ title, thisTab, tab, setTab }: any) => {
	return (
		<button
			className={`${styles.tab} ${tab == thisTab && styles.tabSelected}`}
			onClick={() => {
				setTab(thisTab);
			}}
		>
			{title}
		</button>
	);
};
