import { RegDetails, RegPage } from "@/pages/register";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import AuthTextField from "../auth/authTextField";
import Margin from "@/components/general/margin";
import MyButton from "@/components/general/MyButton";
import styles from "../../styles/Onboarding/SetName.module.scss";
// import loginStyles from "../../styles/Auth/Login.module.scss";

import { UserService } from "@/services/userService";
import Image from "next/image";
import Compressor from "compressorjs";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "@/redux/user/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUser } from "@fortawesome/pro-solid-svg-icons";
import { Address } from "@/models/user/Address";
import { RootState } from "@/redux/store";

// export type Address = {
// 	firstName: string;
// 	lastName: string;
// 	profileImg: Blob | File | null;
// };

type SetAddressProps = {
	setPage: Dispatch<SetStateAction<RegPage>>;
};

function SetAddress({ setPage }: SetAddressProps) {
	const dispatch = useDispatch();

	const [loading, setLoading] = useState<boolean>(false);
	const [enabled, setEnabled] = useState<boolean>(false);
	const [errText, setErrText] = useState<string>("");
	const [addressDetails, setAddressDetails] = useState<Address>({
		countryCode: null,
		line1: "",
		line2: "",
		postalCode: "",
		city: "",
	});

	const user = useSelector((state: RootState) => state.userState.user);

	useEffect(() => {
		if (user && user.address) {
			setAddressDetails(user.address);
			setEnabled(isEnabled(user.address));
		}
	}, [user]);

	const onCreateClicked = async () => {
		setLoading(true);

		try {
			await UserService.setAddress(addressDetails);
		} catch (error: any) {
			console.log(error);
			setLoading(false);
			return;
		}

		dispatch(
			setUserDetails({
				address: addressDetails,
			})
		);
		setPage(3);
		setLoading(false);
	};

	const onTextChange = (key: string, val: any) => {
		const newFormDetails: Address = { ...addressDetails };
		newFormDetails[key as keyof Address] = val;
		setAddressDetails(newFormDetails);
		setEnabled(isEnabled(newFormDetails));
	};

	const isEnabled = (details: Address) => {
		return (
			details.line1!.length > 0 &&
			details.postalCode!.length > 0 &&
			details.city!.length > 0
		);
	};

	// useEffect(() => {
	// 	setEnabled(isEnabled(details));
	// }, [details]);

	return (
		<div className={styles.mainContainer} style={{ alignItems: "flex-start" }}>
			<button className={styles.backBtn} onClick={() => setPage(1)}>
				<FontAwesomeIcon size="xs" icon={faArrowLeft} />
			</button>

			<Margin height={40} />
			<h1 className={styles.headerText}>Your address</h1>

			<Margin height={25} />
			<AuthTextField
				placeholder="Address Line 1"
				type="text"
				value={addressDetails.line1!}
				onChange={(val) => onTextChange("line1", val)}
			/>
			<Margin height={25} />
			<AuthTextField
				placeholder="Address Line 2"
				type="text"
				value={addressDetails.line2!}
				onChange={(val) => onTextChange("line2", val)}
			/>
			<Margin height={25} />
			<AuthTextField
				placeholder="City"
				type="text"
				value={addressDetails.city!}
				onChange={(val) => onTextChange("city", val)}
			/>
			<Margin height={25} />
			<AuthTextField
				placeholder="Postal Code"
				type="text"
				value={addressDetails.postalCode!}
				onChange={(val) => onTextChange("postalCode", val)}
			/>
			<Margin height={30} />

			{/* {errText !== "" && <div className={loginStyles.errText}>{errText}</div>} */}
			<div className={styles.btnContainer}>
				<MyButton
					text="Next"
					onClick={onCreateClicked}
					enabled={enabled}
					loading={loading}
					width="40%"
				/>
			</div>
		</div>
	);
}

export default SetAddress;
