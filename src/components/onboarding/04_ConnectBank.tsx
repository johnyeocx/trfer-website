import LoadingIndicator from "@/components/general/LoadingIndicator";
import { setUserDetails } from "@/redux/user/userSlice";
import { UserService } from "@/services/userService";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PlaidLinkOptions, usePlaidLink } from "react-plaid-link";
import { useDispatch } from "react-redux";
import styles from "../../styles/Onboarding/ConnectBank.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowLeft,
	faBank,
	faBuilding,
	faColumns,
} from "@fortawesome/pro-solid-svg-icons";
import { RegPage } from "@/pages/register";
import Margin from "../general/margin";
import MyButton from "../general/MyButton";
import { BankingService } from "@/services/bankingService";
type ConnectBankProps = {
	token: string | null;
	setPage: Dispatch<SetStateAction<RegPage>>;
};

function ConnectBank({ token, setPage }: ConnectBankProps) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);

	const config: PlaidLinkOptions = {
		onSuccess: async (public_token, metadata) => {
			setSaving(true);
			try {
				await BankingService.createAccessToken(public_token);
				BankingService.createRecipientId();
			} catch (error) {
				console.log("Failed to set public token");
				return;
			}

			dispatch(setUserDetails({ accessTokenCreated: true }));
			setSaving(false);
			setPage(4);
		},
		token: token,
	};

	const { open, exit, ready } = usePlaidLink(config);

	return (
		<div className={styles.mainContainer}>
			{saving ? (
				<div>
					<LoadingIndicator />
					<Margin height={20} />
					<p className={styles.savingText}>Saving your info</p>
				</div>
			) : (
				<>
					<button className={styles.backBtn} onClick={() => setPage(2)}>
						<FontAwesomeIcon size="xs" icon={faArrowLeft} />
					</button>

					<FontAwesomeIcon size="sm" icon={faBank} />

					<Margin height={10} />
					<h1 className={styles.headerText}>Connect your bank</h1>
					<Margin height={20} />
					<p className={styles.description}>
						At trfer, we need to connect your bank account so that we can help
						you take payments. <br />
						<br />
						After clicking connect, you will be redirected to Plaid to do so.
					</p>
					<Margin height={20} />

					<div className={styles.btnContainer}>
						<MyButton
							text="Connect"
							onClick={() => open()}
							// enabled={enabled}
							loading={loading}
							width="40%"
						/>
					</div>
				</>
			)}
		</div>
	);
}

export default ConnectBank;

// if (loading) {
// 	return (
// 		<div style={{ height: "100vh", width: "100vw" }}>
// 			{/* <LoadingIndicator /> */}
// 		</div>
// 	);
// } else if (saving) {
// 	return (
// 		<div
// 			style={{
// 				height: "100vh",
// 				width: "100vw",
// 				display: "flex",
// 				justifyContent: "center",
// 				alignItems: "center",
// 			}}
// 		>
// 			<LoadingIndicator />
// 			<h1>Setting up your account...</h1>
// 		</div>
// 		// <div
// 		// 	style={{
// 		// 		display: "flex",
// 		// 		justifyContent: "center",
// 		// 		alignItems: "center",
// 		// 		height: "90vh",
// 		// 		width: "100vw",
// 		// 		flexDirection: "column",
// 		// 	}}
// 		// >
// 		// 	<LoadingIndicator />
// 		// 	<Margin height={20} />
// 		// 	<p>Saving info</p>
// 		// </div>
// 	);
// } else
