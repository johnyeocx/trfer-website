import { RegPage } from "@/pages/register";
import React, {
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";
import styles from "../../styles/Onboarding/ConnectBank.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowLeft,
	faFaceViewfinder,
} from "@fortawesome/pro-solid-svg-icons";
import Margin from "../general/margin";
import MyButton from "../general/MyButton";
import SumsubWebSdk from "@sumsub/websdk-react";

import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Inquiry, InquiryStatus } from "@/models/user/Inquiry";
import LoadingIndicator from "../general/LoadingIndicator";
import { faCircleXmark } from "@fortawesome/pro-regular-svg-icons";
import { useRouter } from "next/router";
import { setUserDetails } from "@/redux/user/userSlice";

export const PersonaInquiry = dynamic(
	() => import("persona").then((module) => module.Inquiry),
	{ ssr: false }
);

type VerifyIdentityProps = {
	accessToken: string | null;
	setPage: Dispatch<SetStateAction<RegPage>>;
	inquiry: Inquiry | null;
	sessionToken: string | null;
	setInquiry: Dispatch<SetStateAction<Inquiry | null>>;
};

function VerifyIdentity({
	setPage,
	inquiry,
	setInquiry,
	sessionToken,
}: VerifyIdentityProps) {
	const user = useSelector((state: RootState) => state.userState.user);
	const router = useRouter();
	const dispatch = useDispatch();

	const [verifyClicked, setVerifyClicked] = useState(false);
	const onVerifyClicked = () => {
		setVerifyClicked(true);
	};

	// console.log("Inquiry:", inquiry);
	// console.log("Check:", inquiry?.inquiryStatus == InquiryStatus.completed);
	const inquiryComplete = (inquiryId: string, status: string) => {
		console.log("Completed inquiry: ", inquiryId);
		console.log("Status: ", status);
		dispatch(setUserDetails({ persApproved: true }));

		router.push("/home");
	};

	console.log("Inquiry:", inquiry);
	console.log("Sess Token:", sessionToken);

	return (
		<>
			{inquiry && inquiry.inquiryStatus == InquiryStatus.needsReview ? (
				<div className={styles.mainContainer}>
					<div className={styles.awaitingTitleContainer}>
						<FontAwesomeIcon icon={faCircleXmark} size="xs" />
						<Margin width={12} />
						<p>Verification Failed</p>
					</div>
					<Margin height={20} />
					<p className={styles.awaitingText}>
						Your verification test has failed and thus been marked for review.
						We will get back to you on the status once we have looked through
						it. We thank you for your patience.
					</p>
				</div>
			) : inquiry && inquiry.inquiryStatus == InquiryStatus.declined ? (
				<div className={styles.mainContainer}>
					<div className={styles.awaitingTitleContainer}>
						<FontAwesomeIcon icon={faCircleXmark} size="xs" />
						<Margin width={12} />
						<p>Verification Declined</p>
					</div>
					<Margin height={20} />
					<p className={styles.awaitingText}>
						Your verification has been declined. This could be due to suspected
						fraud or something else. If you would still like to open an account
						with us, please contact us at team@trfer.me
					</p>
				</div>
			) : verifyClicked ? (
				<div className={styles.verifyContainer}>
					{sessionToken != null ? (
						<PersonaInquiry
							environmentId="env_NTkt1ncHb3qTzi9HWbUcFgJx"
							inquiryId={inquiry != null ? inquiry.persInquiryId : undefined}
							sessionToken={sessionToken}
							accountId={user!.persAcctId}
							onComplete={({ inquiryId, status, fields }) => {
								inquiryComplete(inquiryId, status);
							}}
						/>
					) : (
						<PersonaInquiry
							environmentId="env_NTkt1ncHb3qTzi9HWbUcFgJx"
							templateId="itmpl_Xt5DFpgi7jdqub7Htq8iSh9B"
							accountId={user!.persAcctId}
							onComplete={({ inquiryId, status, fields }) => {
								inquiryComplete(inquiryId, status);
							}}
						/>
					)}
				</div>
			) : (
				<div className={styles.mainContainer}>
					<FontAwesomeIcon icon={faFaceViewfinder} />

					<Margin height={10} />
					<h1 className={styles.headerText}>Verify your identity</h1>
					<Margin height={20} />
					<p className={styles.description}>
						In order to help you take payments, we need to first verify that you
						are who you say you are. <br />
						<br />
						After clicking verify, you will be redirected to do so
					</p>
					<Margin height={20} />

					<div className={styles.btnContainer}>
						<MyButton
							text={`${
								sessionToken != null ? "Continue Verification" : "Verify"
							}`}
							onClick={() => {
								onVerifyClicked();
							}}
							// enabled={enabled}
							// loading={loading}
							width={sessionToken != null ? "80%" : "40%"}
						/>
					</div>
				</div>
			)}
		</>
	);
}

export default VerifyIdentity;
