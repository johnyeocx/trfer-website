import { RegDetails, RegPage } from "@/pages/register";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import AuthTextField from "../auth/authTextField";
import Margin from "@/components/general/margin";
import MyButton from "@/components/general/MyButton";
import styles from "../../styles/Onboarding/SetName.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "@/redux/user/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUser } from "@fortawesome/pro-solid-svg-icons";
import { RootState } from "@/redux/store";
import { UserService } from "@/services/userService";

type SetNameProps = {
	setPage: Dispatch<SetStateAction<RegPage>>;
};

export type PersonalDetails = {
	firstName: string;
	lastName: string;
};

function SetName({ setPage }: SetNameProps) {
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.userState.user);

	const [loading, setLoading] = useState<boolean>(false);
	const [enabled, setEnabled] = useState<boolean>(false);
	const [errText, setErrText] = useState<string>("");
	const [details, setDetails] = useState<PersonalDetails>({
		firstName: "",
		lastName: "",
	});

	const nextClicked = async () => {
		setLoading(true);
		setErrText("");
		try {
			await UserService.setName(details.firstName, details.lastName);
		} catch (error: any) {
			console.log(error);
			setErrText("Failed to set personal name. Please try again");
			setLoading(false);
			return;
		}

		dispatch(
			setUserDetails({
				firstName: details.firstName,
				lastName: details.lastName,
			})
		);
		setPage(2);
		setLoading(false);
	};

	const onTextChange = (key: string, val: any) => {
		const newFormDetails: PersonalDetails = { ...details };
		newFormDetails[key as keyof PersonalDetails] = val;
		setDetails(newFormDetails);
		setEnabled(isEnabled(newFormDetails));
	};

	const isEnabled = (details: PersonalDetails) => {
		return details.firstName.length > 0 && details.lastName.length > 0;
	};

	useEffect(() => {
		setEnabled(isEnabled(details));
	}, [details]);

	useEffect(() => {
		if (user && user.firstName && user.lastName) {
			let newDetails: PersonalDetails = {
				firstName: user.firstName,
				lastName: user.lastName,
			};
			setDetails(newDetails);
			setEnabled(isEnabled(newDetails));
		}
	}, [user]);

	return (
		<div className={styles.mainContainer} style={{ alignItems: "flex-start" }}>
			<button className={styles.backBtn} onClick={() => setPage(0)}>
				<FontAwesomeIcon size="xs" icon={faArrowLeft} />
			</button>

			<Margin height={40} />
			<h1 className={styles.headerText}>Personal name</h1>
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
			{errText !== "" && <div className={styles.errText}>{errText}</div>}
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

export default SetName;
