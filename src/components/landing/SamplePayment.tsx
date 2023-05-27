import React, { useState } from "react";
import Margin from "../general/margin";
import MyButton from "../general/MyButton";
import styles from "../../styles/Landing/SamplePayment.module.scss";
import ProfileImage from "../general/ProfileImage";
import PaymentTextField from "../user/PaymentTextField";

function SamplePayment() {
	const [btnLoading, setBtnLoading] = useState(false);
	const btnClicked = () => {};

	const [details, setDetails] = useState({
		email: "",
		fullName: "",
	});

	return (
		<div className={styles.container}>
			<div className={styles.details}>
				<div className={styles.userDetailsContainer}>
					<ProfileImage uId={47} imageDim={25} />
					<Margin width={10} />
					<p className={styles.name}>trfer.me</p>
				</div>
				<Margin height={15} />
				<div className={styles.productDetails}>
					<p className={styles.serviceName}>Web Design</p>
					<p className={styles.price}>£1.00</p>
				</div>
			</div>
			<Margin height={15} />
			<div className={styles.form}>
				<PaymentTextField
					value={details.email}
					onChange={(val) => setDetails({ ...details, email: val })}
					placeholder="Email"
					title="Email"
					// scale={0.8}
				/>

				<PaymentTextField
					value={details.fullName}
					onChange={(val) => setDetails({ ...details, fullName: val })}
					placeholder="Name"
					title="Name"
					// scale={0.8}
				/>

				<Margin height={5} />
				<MyButton
					text="Test Me!"
					onClick={btnClicked}
					loading={btnLoading}
					// enabled={enabled}
					// bgColor={colors.btnBgColor}
					// textColor={colors.btnTextColor}
				/>
			</div>
		</div>
	);
}

export default SamplePayment;
