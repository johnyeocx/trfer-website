import { RegDetails, RegPage } from "@/pages/register";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import AuthTextField from "../authTextField";
import Margin from "@/components/general/margin";
import MyButton from "@/components/general/MyButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/pro-solid-svg-icons";
import styles from "../../../styles/Auth/InputDetails.module.scss";
import loginStyles from "../../../styles/Auth/Login.module.scss";
import { UserService } from "@/services/userService";
import Image from "next/image";
import Compressor from "compressorjs";
import { BankingService } from "@/services/bankingService";
import { useDispatch } from "react-redux";
import { setUserDetails } from "@/redux/user/userSlice";

type InputDetailsProps = {
	details: RegDetails;
	setDetails: Dispatch<SetStateAction<RegDetails>>;
	setPage: Dispatch<SetStateAction<RegPage>>;
	setAuthLinkToken: Dispatch<SetStateAction<string>>;
};

export type AccountDetails = {
	firstName: string;
	lastName: string;
	profileImg: Blob | File | null;
};

function InputDetails() {
	const dispatch = useDispatch();

	const [loading, setLoading] = useState<boolean>(false);
	const [enabled, setEnabled] = useState<boolean>(false);
	const [errText, setErrText] = useState<string>("");
	const [details, setDetails] = useState<AccountDetails>({
		firstName: "",
		lastName: "",
		profileImg: null,
	});

	const onCreateClicked = async () => {
		setLoading(true);

		// 1. Upload Image
		try {
			const { data } = await UserService.setNameAndPhoto(
				details.firstName,
				details.lastName
			);

			const url = data.upload_url;

			await fetch(url, { method: "PUT", body: details.profileImg });
		} catch (error: any) {
			console.log(error);
			setLoading(false);
			return;
		}

		dispatch(
			setUserDetails({
				firstName: details.firstName,
				lastName: details.lastName,
			})
		);
		setLoading(false);
	};

	const onTextChange = (key: string, val: any) => {
		const newFormDetails: AccountDetails = { ...details };
		newFormDetails[key as keyof AccountDetails] = val;
		setDetails(newFormDetails);
		setEnabled(isEnabled(newFormDetails));
	};

	const isEnabled = (details: AccountDetails) => {
		return details.firstName.length > 0 && details.lastName.length > 0;
	};

	const handleFileChange = (e: any) => {
		if (e.target.files != null && e.target.files.length > 0) {
			const file = e.target.files[0];
			console.log("File Size:", file.size);

			new Compressor(file, {
				strict: true,
				maxWidth: 1000,
				success(result) {
					// const formData = new FormData();

					// // The third parameter is required for server
					// formData.append("file", result, result.name);

					// // Send the compressed image file to server with XMLHttpRequest.
					// axios.post("/path/to/upload", formData).then(() => {
					// 	console.log("Upload success");
					// });
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

	useEffect(() => {
		setEnabled(isEnabled(details));
	}, []);

	return (
		<div className={styles.pageContainer}>
			<div className={styles.mainContainer}>
				<h1 className={styles.headerText}>Your details</h1>
				<Margin height={25} />
				<div className={styles.profileImgRow}>
					<div
						className={styles.imgContainer}
						onClick={() => {
							document.getElementById("selectedFile")?.click();
						}}
					>
						{details.profileImg ? (
							// <img src={details.profileImg} />
							<Image
								alt=""
								src={URL.createObjectURL(details.profileImg)}
								fill
								className={styles.profileImg}
								style={{ objectFit: "cover" }}
							/>
						) : null}
						<input
							type="file"
							id="selectedFile"
							style={{ display: "none" }}
							onChange={handleFileChange}
							accept="image/*"
						/>
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
				{errText !== "" && <div className={loginStyles.errText}>{errText}</div>}
				<MyButton
					text="Register"
					onClick={onCreateClicked}
					enabled={enabled}
					loading={loading}
				/>
			</div>
		</div>
	);
}

export default InputDetails;
