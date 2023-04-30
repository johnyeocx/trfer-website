import LoadingPage from "@/components/general/LoadingPage";
import { UserService } from "@/services/userService";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../styles/User/User.module.scss";
import { User, UserFuncs } from "@/models/user/user";
import { endpoint, s3Endpoint } from "@/misc/constants";
import Image from "next/image";
import Margin from "@/components/general/margin";
import AuthTextField from "@/components/auth/authTextField";
import AmountTextField from "@/components/user/amountTextField";
import NoteTextField from "@/components/user/noteTextField";
import MyButton from "@/components/general/MyButton";
import { TransferService } from "@/services/transferService";
import { PlaidLinkOptions, usePlaidLink } from "react-plaid-link";

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
			setUser(user);
		} catch (error) {
			// setLoading(false);
			console.log(error);
		}

		setLoading(false);
	};

	const trfClicked = async () => {
		const amount = 100;
		const note = "Test Note";
		setTrfLoading(true);

		if (username === null) return;

		try {
			const { data }: any = await TransferService.transferOpenAmt(
				username!,
				amount,
				note
			);
			setToken(data.link_token);
		} catch (error) {
			console.log(error);
			setTrfLoading(false);
			return;
		}
		setTrfLoading(false);
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
	return (
		<div className={styles.pageContainer}>
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
						<p className={styles.name}>{UserFuncs.fullName(user!)}</p>
						<p className={styles.username}>trfer.me/{user!.username}</p>
					</div>
				</div>
				<Margin height={20} />
				<AmountTextField
					value={details.amount}
					onChange={(val) => setDetails({ ...details, amount: val })}
				/>
				<Margin height={20} />
				<NoteTextField
					value={details.note}
					onChange={(val) => setDetails({ ...details, note: val })}
					placeholder="Note"
				/>
				<Margin height={30} />
				<MyButton text="Trf Now" onClick={trfClicked} loading={trfLoading} />
			</div>
		</div>
	);
}

export default UserPage;
