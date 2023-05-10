import LoadingIndicator from "@/components/general/LoadingIndicator";
import { Payment, PaymentFuncs } from "@/models/user/payments";
import { RootState } from "@/redux/store";
import { setPayments } from "@/redux/user/userSlice";
import { UserService } from "@/services/userService";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../styles/Home/Payments/Payments.module.scss";
import { format } from "date-fns";
import Margin from "@/components/general/margin";

function Payments() {
	const dispatch = useDispatch();
	const payments = useSelector((state: RootState) => state.userState.payments);

	const [sortedPayments, setSortedPayments] = useState<Array<
		Array<Payment>
	> | null>(null);
	const getUserPayments = async () => {
		try {
			const payments = await UserService.getUserPayments();
			dispatch(setPayments(payments));
		} catch (error) {}
	};

	useEffect(() => {
		getUserPayments();
	}, []);

	useEffect(() => {
		if (payments == null) return;
		setSortedPayments(PaymentFuncs.sortPaymentsByDate(payments));
	}, [payments]);

	if (sortedPayments === null) {
		return (
			<div className={styles.loadingContainer}>
				<LoadingIndicator />
			</div>
		);
	}
	return (
		<div className={styles.paymentsContainer}>
			{sortedPayments.map((paymentGroup, index) => {
				let day = format(paymentGroup[0].created, "d MMM yy");
				return (
					<div key={index}>
						<p className={styles.dateText}>{day}</p>
						<Margin height={10} />
						<div className={styles.groupContainer}>
							{paymentGroup.map((payment, index) => {
								let time = format(payment.created, "HH:mm");
								let name = payment.payerName;
								let amount = payment.amount.toFixed(2);
								return (
									<div key={index} className={styles.paymentContainer}>
										<div className={styles.left}>
											<p className={styles.name}>
												{name === null ? "Unknown" : name}
											</p>
											<p className={styles.note}>{payment.note}</p>
										</div>
										<div className={styles.right}>
											<p className={styles.amount}>£{amount}</p>
											<p className={styles.time}>{time}</p>
										</div>
									</div>
								);
							})}
						</div>
						<Margin height={25} />
					</div>
				);
			})}
		</div>
	);
}

export default Payments;
