import LoadingIndicator from "@/components/general/LoadingIndicator";
import LoadingPage from "@/components/general/LoadingPage";
import MyButton from "@/components/general/MyButton";
import Margin from "@/components/general/margin";
import { setUserDetails } from "@/redux/user/userSlice";
import { BankingService } from "@/services/bankingService";
import { UserService } from "@/services/userService";
import React, { useEffect, useState } from "react";
import { PlaidLinkOptions, usePlaidLink } from "react-plaid-link";
import { useDispatch } from "react-redux";
type ConnectBankProps = {
	token: string | null;
};
function ConnectBank({ token }: ConnectBankProps) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);

	const config: PlaidLinkOptions = {
		onSuccess: async (public_token, metadata) => {
			setSaving(true);
			try {
				await UserService.setPublicToken(public_token);
				dispatch(setUserDetails({ publicToken: public_token }));
				setSaving(false);
			} catch (error) {
				console.log("Failed to set public token");
				return;
			}
		},
		token: token,
	};

	const { open, exit, ready } = usePlaidLink(config);

	useEffect(() => {
		if (ready) open();
	}, [ready, open]);

	if (loading) {
		return (
			<div style={{ height: "100vh", width: "100vw" }}>
				{/* <LoadingIndicator /> */}
			</div>
		);
	} else if (saving) {
		return (
			<div
				style={{
					height: "100vh",
					width: "100vw",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<LoadingIndicator />
				<h1>Setting up your account...</h1>
			</div>
			// <div
			// 	style={{
			// 		display: "flex",
			// 		justifyContent: "center",
			// 		alignItems: "center",
			// 		height: "90vh",
			// 		width: "100vw",
			// 		flexDirection: "column",
			// 	}}
			// >
			// 	<LoadingIndicator />
			// 	<Margin height={20} />
			// 	<p>Saving info</p>
			// </div>
		);
	} else
		return (
			<>
				{/* <button className={styles.backButton} onClick={() => onBackClicked()}>
				<FontAwesomeIcon icon={faArrowLeft} className={styles.logo} />
			</button>
			<h1 className={styles.headerText}>Your details</h1>
			<Margin height={25} />
			<div className={styles.profileImgRow}>
				<div
					className={styles.imgContainer}
					onClick={() => {
						document.getElementById("selectedFile")?.click();
					}}
				>
					<input type="file" id="selectedFile" style={{ display: "none" }} />
				</div>
				<p className={styles.profileImgText}>Profile Image (Optional)</p>
			</div>
			<Margin height={25} />
			<AuthTextField
				placeholder="First Name"
				type="text"
				value={details.firstName}
				onChange={(val) => onTextChange("firstName", val)}
			/>
			<Margin height={25} />
			<AuthTextField
				placeholder="Last Name"
				type="text"
				value={details.lastName}
				onChange={(val) => onTextChange("lastName", val)}
			/>

			<Margin height={30} />
			{errText !== "" && <div className={loginStyles.errText}>{errText}</div>} */}
				{/* <MyButton
				text="Register"
				// onClick={onCreateClicked}
				// enabled={enabled}
				// loading={loading}
			/> */}
			</>
		);
}

export default ConnectBank;
