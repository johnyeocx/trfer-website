import React, { useEffect, useState } from "react";
import SumsubWebSdk from "@sumsub/websdk-react";
import { useDispatch, useSelector } from "react-redux";
import { GenFuncs } from "@/misc/helperFunctions/GenFuncs";
import { useRouter } from "next/router";
import { RootState } from "@/redux/store";
import styles from "../../styles/Onboarding/Onboarding.module.scss";
import SetName from "@/components/onboarding/02_SetName";
import SetAddress from "@/components/onboarding/03_SetAddress";
import { User } from "@/models/user/user";
import NavBar from "@/components/general/Nav/NavBar";
import ConnectBank from "@/components/onboarding/04_ConnectBank";
import { BankingService } from "@/services/bankingService";
import VerifyIdentity from "@/components/onboarding/05_VerifyIdentity";
import SetAccountDetails from "@/components/onboarding/01_SetAccountDetails";
import { PersService } from "@/services/persService";
import LoadingPage from "@/components/general/LoadingPage";
import { Inquiry, InquiryFuncs } from "@/models/user/Inquiry";

function Onboarding() {
	const accessToken = "_act-sbx-8f86277f-43ad-4bda-97c9-232937eddf14";
	const dispatch = useDispatch();
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const user = useSelector((state: RootState) => state.userState.user);
	const [page, setPage] = useState(0);
	const [linkToken, setLinkToken] = useState(null);
	const [SSAccessToken, setSSAccessToken] = useState(null);
	const [sessionToken, setSessionToken] = useState(null);
	const [inquiry, setInquiry] = useState<Inquiry | null>(null);

	const getLinkToken = async (user: User) => {
		if (!user.accessTokenCreated) {
			try {
				const { data } = await BankingService.getAuthLinkToken();
				setLinkToken(data.link_token);
			} catch (error: any) {
				console.log(error);
				return;
			}
		}

		if (!user.persApproved) {
			try {
				const { data } = await PersService.getInqSessionToken();
				setSessionToken(data.session_token);
				setInquiry(InquiryFuncs.fromJson(data.inquiry));
			} catch (error: any) {
				console.log(error);
				return;
			}
		}

		if (user.accountName == null) setPage(0);
		if (user.firstName == null || user.lastName == null) setPage(1);
		else if (!user.address) setPage(2);
		else if (!user.accessTokenCreated) setPage(3);
		else if (!user.persApproved) setPage(4);
	};

	useEffect(() => {
		(async () => {
			const res = await GenFuncs.initPage(dispatch, router, getLinkToken);
			if (res) {
				router.push("/home");
			} else {
				setLoading(false);
			}
		})();
	}, []);

	useEffect(() => {}, [user]);
	if (loading) return <LoadingPage />;

	return (
		<div className={styles.pageContainer}>
			<NavBar showRight={false} />
			<div className={styles.contentContainer}>
				{page == 0 ? (
					<SetAccountDetails setPage={setPage} />
				) : page == 1 ? (
					<SetName setPage={setPage} />
				) : page == 2 ? (
					<SetAddress setPage={setPage} />
				) : page == 3 ? (
					<ConnectBank token={linkToken} setPage={setPage} />
				) : (
					<VerifyIdentity
						accessToken={SSAccessToken}
						setPage={setPage}
						sessionToken={sessionToken}
						inquiry={inquiry}
						setInquiry={setInquiry}
					/>
				)}
			</div>
		</div>
	);
}

export default Onboarding;
