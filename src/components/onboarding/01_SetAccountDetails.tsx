import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "../../styles/Onboarding/SetName.module.scss";
import Margin from "../general/margin";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthTextField from "../auth/authTextField";
import { faUser } from "@fortawesome/pro-solid-svg-icons";
import MyButton from "../general/MyButton";
import { RegPage } from "@/pages/register";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setUserDetails } from "@/redux/user/userSlice";
import { UserService } from "@/services/userService";
import Compressor from "compressorjs";
import { UserFuncs } from "@/models/user/user";

export type SetAccountDetailsProps = {
	setPage: Dispatch<SetStateAction<RegPage>>;
};

export type AccountDetails = {
	accountName: string;
	profileImg: Blob | File | null;
};

function SetAccountDetails({ setPage }: SetAccountDetailsProps) {
	const user = useSelector((state: RootState) => state.userState.user);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [enabled, setEnabled] = useState<boolean>(false);
	const [errText, setErrText] = useState("");
	const [details, setDetails] = useState<AccountDetails>({
		accountName: "",
		profileImg: null,
	});
	const [imageExists, setImageExists] = useState(false);

	const setImageIfExists = async () => {
		const response = await fetch(UserFuncs.imagePath(user?.id!));
		console.log("Image response:", response);
		if (response.status == 200) {
			setImageExists(true);
		}
	};

	useEffect(() => {
		if (user != null && user.accountName) {
			let newDetails = { ...details, accountName: user.accountName };
			setDetails(newDetails);
			setEnabled(isEnabled(newDetails));
			setImageIfExists();
		}
	}, [user]);

	const handleFileChange = (e: any) => {
		if (e.target.files != null && e.target.files.length > 0) {
			const file = e.target.files[0];
			console.log("File Size:", file.size);

			new Compressor(file, {
				strict: true,
				maxWidth: 1000,
				success(result) {
					setDetails({
						...details,
						profileImg: result,
					});
				},
				error(err) {
					console.log(err.message);
				},
			});
		}
	};

	const onTextChange = (key: string, val: any) => {
		const newFormDetails: AccountDetails = { ...details };
		newFormDetails[key as keyof AccountDetails] = val;
		setDetails(newFormDetails);
		setEnabled(isEnabled(newFormDetails));
	};

	const isEnabled = (details: AccountDetails) => {
		return details.accountName.length > 0;
	};

	const nextClicked = async () => {
		setLoading(true);
		setErrText("");

		// 1. Upload Image
		try {
			const { data } = await UserService.setAccountDetails(details.accountName);

			if (details.profileImg != null) {
				const url = data.upload_url;
				await fetch(url, { method: "PUT", body: details.profileImg });
			}
		} catch (error: any) {
			console.log(error);
			setErrText("Failed to set account name. Please try again later.");
			setLoading(false);
			return;
		}

		dispatch(setUserDetails({ accountName: details.accountName }));
		setPage(1);
		setLoading(false);
	};

	return (
		<div className={styles.mainContainer}>
			<h1 className={styles.headerText}>Account details</h1>
			<Margin height={25} />
			<div className={styles.profileImgRow}>
				<button
					className={styles.imgContainer}
					onClick={() => {
						document.getElementById("selectedFile")?.click();
					}}
				>
					{details.profileImg || imageExists ? (
						// <img src={details.profileImg} />
						<Image
							alt=""
							// src={URL.createObjectURL(details.profileImg)}
							src={
								details.profileImg != null
									? URL.createObjectURL(details.profileImg)
									: `${UserFuncs.imagePath(user?.id!)}?timestamp=${Date.now()}`
							}
							fill
							className={styles.profileImg}
							style={{ objectFit: "cover" }}
						/>
					) : (
						<FontAwesomeIcon icon={faUser} className={styles.icon} />
					)}
					<input
						type="file"
						id="selectedFile"
						style={{ display: "none" }}
						onChange={handleFileChange}
						accept="image/*"
					/>
				</button>
				<p className={styles.profileImgText}>Profile Image (Optional)</p>
			</div>
			<Margin height={25} />
			<div className={styles.acctDetailsContainer}>
				<AuthTextField
					placeholder="Account Name"
					type="text"
					value={details.accountName}
					onChange={(val) => onTextChange("accountName", val)}
				/>
				<Margin height={14} />
				<p className={styles.description}>
					This will be displayed to the public. You may put your company or
					personal name.
				</p>
				<Margin height={30} />
				{errText !== "" && (
					<div
						className={styles.errText}
						style={{
							textAlign: "center",
							fontSize: "0.7rem",
							// backgroundColor: "red",
							padding: "0px 10px",
						}}
					>
						{errText}
					</div>
				)}
			</div>

			<Margin height={30} />

			<div className={styles.btnContainer}>
				<MyButton
					text="Next"
					onClick={nextClicked}
					enabled={enabled}
					loading={loading}
					width="40%"
				/>
			</div>
		</div>
	);
}

export default SetAccountDetails;
