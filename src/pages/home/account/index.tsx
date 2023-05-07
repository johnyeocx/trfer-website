import styles from "../../../styles/Home/Account/EditAccount.module.scss";
import { UserFuncs } from "@/models/user/User";
import { setUserDetails } from "@/redux/user/userSlice";
import { UserService } from "@/services/userService";
import { GenFuncs } from "@/misc/helperFunctions/GenFuncs";

import { RootState } from "@/redux/store";

import NavBar from "@/components/navbar";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Margin from "@/components/general/margin";
import AuthTextField from "@/components/auth/authTextField";
import MyButton from "@/components/general/MyButton";

import { useRouter } from "next/router";
import LoadingPage from "@/components/general/LoadingPage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/pro-solid-svg-icons";

function Account() {
	const user = useSelector((state: RootState) => state.userState.user);
	const dispatch = useDispatch();
	const router = useRouter();

	const [loading, setLoading] = useState(true);
	const [btnLoading, setBtnLoading] = useState(false);

	const [enabled, setEnabled] = useState(false);
	const [details, setDetails] = useState({
		username: "",
		firstName: "",
		lastName: "",
	});

	const [errText, setErrText] = useState("");
	const [newImg, setNewImg] = useState(null);

	const isEnabled = (newDetails: any, newImg: any) => {
		let cond1 =
			newDetails.username != "" &&
			newDetails.firstName != "" &&
			newDetails.lastName != "";

		let cond2 =
			newDetails.firstName != user?.firstName ||
			newDetails.lastName != user?.lastName ||
			newDetails.username != user?.username ||
			newImg !== null;
		return cond1 && cond2;
	};

	const onTextChange = (key: string, val: string) => {
		let newDetails: any = { ...details };
		newDetails[key] = val;
		setDetails(newDetails);

		setEnabled(isEnabled(newDetails, newImg));
	};

	const changeName = async () => {
		if (
			details.firstName == user?.firstName &&
			details.lastName == user.lastName
		)
			return;

		try {
			await UserService.setName(details.firstName, details.lastName);
		} catch (error: any) {
			console.log("Failed to update name");
			return;
		}

		dispatch(
			setUserDetails({
				firstName: details.firstName,
				lastName: details.lastName,
			})
		);
	};

	const changeUsername = async () => {
		if (details.username == user?.username) return;

		try {
			await UserService.setUsername(details.username);
		} catch (error: any) {
			console.log("Failed to change username");
			if (error.response.status == 409) {
				setErrText("Username already taken");
			}
			return;
		}

		dispatch(setUserDetails({ username: details.username }));
	};

	const btnClicked = async () => {
		setBtnLoading(true);
		setErrText("");

		let [first, second] = await Promise.all([
			changeName(),
			changeUsername(),
			editPhoto(),
		]);

		setBtnLoading(false);
	};

	const editPhoto = async () => {
		if (newImg == null) return;
		try {
			const { data } = await UserService.setProfileImage();
			const url = data.upload_url;
			let res = await fetch(url, { method: "PUT", body: newImg });
			console.log("Upload res:", res);
		} catch (error: any) {
			console.log(error);
			setLoading(false);
			return;
		}
		setNewImg(null);
		setEnabled(isEnabled(details, null));
	};

	useEffect(() => {
		(async () => {
			if (!user) {
				await GenFuncs.initPage(dispatch, router, () => {
					router.push("/home");
				});
			}
			setLoading(false);
		})();
	}, []);

	useEffect(() => {
		if (user) {
			setDetails({
				username: user?.username,
				firstName: user?.firstName,
				lastName: user?.lastName,
			});
		}
		setEnabled(isEnabled(details, newImg));
	}, [user]);

	if (loading) return <LoadingPage />;
	return (
		<>
			<NavBar />
			<div className={styles.pageContainer}>
				<button onClick={() => router.push("/home")}>
					<FontAwesomeIcon icon={faArrowLeft} className={styles.backIcon} />
				</button>
				<div className={styles.header}>Edit Profile</div>
				<Margin height={20} />

				<div className={styles.outerImgContainer}>
					<div
						className={styles.imgContainer}
						onClick={() => {
							document.getElementById("selectedFile")?.click();
						}}
					>
						<Image
							alt="User Image"
							src={
								newImg != null
									? URL.createObjectURL(newImg)
									: `${UserFuncs.imagePath(user!)}?timestamp=${Date.now()}`
							}
							fill
							style={{ objectFit: "cover" }}
							className={styles.image}
						/>
						<button>Edit</button>
						<input
							type="file"
							id="selectedFile"
							style={{ display: "none" }}
							onChange={(e) =>
								GenFuncs.handleProfileImgChange(e, (result: any) => {
									setNewImg(result);
									setEnabled(isEnabled(details, result));
								})
							}
							accept="image/*"
						/>
					</div>
				</div>
				<Margin height={15} />
				<AuthTextField
					type="text"
					value={details.username}
					onChange={(val) => onTextChange("username", val)}
					placeholder="Username"
				/>
				<Margin height={15} />
				<AuthTextField
					type="text"
					value={details.firstName}
					onChange={(val) => onTextChange("firstName", val)}
					placeholder="First Name"
				/>
				<Margin height={15} />
				<AuthTextField
					type="text"
					value={details.lastName}
					onChange={(val) => onTextChange("lastName", val)}
					placeholder="Last Name"
				/>
				<Margin height={25} />
				<MyButton
					loading={btnLoading}
					enabled={enabled}
					text="Save"
					onClick={btnClicked}
				/>
				<Margin height={20} />
				{errText != "" && <p className={styles.errText}>{errText}</p>}
			</div>
		</>
	);
}

export default Account;
