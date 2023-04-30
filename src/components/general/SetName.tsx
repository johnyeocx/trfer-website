import React, { useState } from "react";
import AuthTextField from "../auth/authTextField";

import styles from "../../styles/Auth/Register.module.scss";
import loginStyles from "../../styles/Auth/Login.module.scss";
import Margin from "./margin";
import MyButton from "./MyButton";
import { CusService } from "@/services/cusService";
import { useDispatch } from "react-redux";
import { setCusDetails } from "@/redux/customer/cusSlice";
import { useRouter } from "next/router";

type SetNameForm = {
	firstName: string;
	lastName: string;
};

function SetName() {
	const dispatch = useDispatch();
	const router = useRouter();
	const [details, setDetails] = useState<SetNameForm>({
		firstName: "",
		lastName: "",
	});

	const [enabled, setEnabled] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [errText, setErrText] = useState<string>("");
	const isEnabled = (newDetails: SetNameForm) => {
		return newDetails.firstName.length > 0 && newDetails.lastName.length > 0;
	};

	const onTextChange = (key: string, val: string) => {
		const newFormDetails: SetNameForm = { ...details };
		newFormDetails[key as keyof SetNameForm] = val;
		setDetails(newFormDetails);
		setEnabled(isEnabled(newFormDetails));
	};

	const onClicked = async () => {
		setLoading(true);

		try {
			await CusService.updateCusName({
				firstName: details.firstName.trim(),
				lastName: details.lastName.trim(),
			});
			dispatch(setCusDetails(details));
		} catch (error) {
			setErrText("Failed to update your name. Please try again later");
		}

		try {
			await CusService.createCusPass();
		} catch (error) {
			console.log("Failed to create cus pass");
		}

		// router.push("")
		setLoading(false);
	};

	return (
		<div className={styles.pageContainer}>
			<div className={styles.mainContainer}>
				<h1 className={styles.headerText}>What is your name?</h1>
				<Margin height={4} />
				<p className={styles.setNameDescription}>
					Your name is required to use your subscriptions
				</p>
				<Margin height={20} />
				<AuthTextField
					placeholder="First Name"
					value={details.firstName}
					onChange={(val: string) => onTextChange("firstName", val)}
					type="text"
				/>
				<Margin height={20} />
				<AuthTextField
					placeholder="Last Name"
					value={details.lastName}
					onChange={(val: string) => onTextChange("lastName", val)}
					type="text"
				/>
				<Margin height={25} />
				{errText !== "" && <div className={loginStyles.errText}>{errText}</div>}
				<MyButton
					text="Submit"
					onClick={onClicked}
					enabled={enabled}
					loading={loading}
				/>
			</div>
		</div>
	);
}

export default SetName;
