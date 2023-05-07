import LoadingPage from "@/components/general/LoadingPage";
import { UserService } from "@/services/userService";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../styles/User/User.module.scss";
import { User, UserFuncs } from "@/models/user/User";
import { endpoint, s3Endpoint } from "@/misc/constants";
import Image from "next/image";
import Margin from "@/components/general/margin";
import AuthTextField from "@/components/auth/authTextField";
import AmountTextField from "@/components/user/amountTextField";
import NoteTextField from "@/components/user/noteTextField";
import MyButton from "@/components/general/MyButton";
import { PaymentService } from "@/services/transferService";
import { PlaidLinkOptions, usePlaidLink } from "react-plaid-link";
import { PageTheme, themeColors } from "@/models/page_themes/PageThemes";

function UserPage() {
	const router = useRouter();
	const { username } = router.query;
	const [loading, setLoading] = useState(true);
	const [invalidPage, setInvalidPage] = useState(false);
	const [user, setUser] = useState<User | null>(null);

	const [trfLoading, setTrfLoading] = useState(false);

	const [details, setDetails] = useState({
		amount: "",
		note: "",
	});

	const [token, setToken] = useState(null);
	const [success, setSuccess] = useState(false);

	const config: PlaidLinkOptions = {
		onSuccess: async (public_token, metadata) => {
			setToken(null);
			setDetails({ amount: "", note: "" });
			setSuccess(true);
		},

		token: token,
	};

	const { open, exit, ready } = usePlaidLink(config);

	const getUser = async () => {
		if (username === undefined) return;

		try {
			const { data } = await UserService.getUser(username);
			const user = UserFuncs.fromJson(data);
			console.log("User:", user);
			setUser(user);
		} catch (error) {
			// setLoading(false);
			console.log(error);
		}

		setLoading(false);
	};

	const trfClicked = async () => {
		setTrfLoading(true);
		if (username === null) return;
		let amtFloat = parseFloat(details.amount);

		try {
			const { data }: any = await PaymentService.transferOpenAmt(
				username!,
				amtFloat,
				details.note
			);
			setToken(data.link_token);
		} catch (error) {
			console.log(error);
			setTrfLoading(false);
			return;
		}
		setTrfLoading(false);
	};

	const [enabled, setEnabled] = useState(false);
	const isEnabled = (amount: string, note: string) => {
		let amtFloat = parseFloat(amount);
		if (!amtFloat) return false;
		return true;
	};

	useEffect(() => {
		getUser();
	}, [router]);

	useEffect(() => {
		if (ready) open();
	}, [open, ready]);

	if (loading) return <LoadingPage />;

	if (success)
		return (
			<div className={styles.successContainer}>
				Thank you for using trfer.me. Your transfer was successful.
			</div>
		);
	if (invalidPage) return <div>Page Not Found</div>;

	let pageTheme = user != null ? user.pageTheme : PageTheme.light;
	let colors = themeColors[pageTheme];

	return (
		<div
			className={styles.pageContainer}
			style={{
				backgroundColor: colors.bgColor,
			}}
		>
			<div
				style={{
					color: colors.logoColor,
				}}
				className={styles.headerContainer}
			>
				trf.
			</div>
			<div className={styles.mainContainer}>
				<div className={styles.row1}>
					<div className={styles.imgContainer}>
						<Image
							alt=""
							src={`${s3Endpoint}/user/profile_image/${user!.id}`}
							fill
							className={styles.img}
							style={{ objectFit: "cover" }}
						/>
					</div>
					<Margin width={20} />
					<div>
						<p
							style={{
								color: colors.textColor,
							}}
							className={styles.name}
						>
							{UserFuncs.fullName(user!)}
						</p>
						<p
							style={{
								color: colors.textColor,
							}}
							className={styles.username}
						>
							trfer.me/{user!.username}
						</p>
					</div>
				</div>
				<Margin height={20} />
				<AmountTextField
					value={details.amount}
					onChange={(val) => {
						setEnabled(isEnabled(val, details.note));
						setDetails({ ...details, amount: val });
					}}
					bgColor={colors.inputBgColor}
					placeholderColor={colors.inputPlaceholderColor}
					textColor={colors.inputTextColor}
				/>
				<Margin height={20} />
				<NoteTextField
					value={details.note}
					onChange={(val) => setDetails({ ...details, note: val })}
					placeholder="Note"
					bgColor={colors.inputBgColor}
					placeholderColor={colors.inputPlaceholderColor}
					textColor={colors.inputTextColor}
				/>
				<Margin height={30} />
				<MyButton
					text="Trf Now"
					onClick={trfClicked}
					loading={trfLoading}
					enabled={enabled}
					bgColor={colors.btnBgColor}
					textColor={colors.btnTextColor}
				/>
			</div>
		</div>
	);
}

export default UserPage;
