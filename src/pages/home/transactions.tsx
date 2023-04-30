import LoadingPage from "@/components/general/LoadingPage";
import PaidTransactions from "@/components/home/transactions/PaidTransactions";
import UpcomingTransactions from "@/components/home/transactions/UpcomingTransactions";
import { AuthStatus } from "@/redux/appSlice";
import { RootState } from "@/redux/store";
import { AuthService } from "@/services/authService";
import { CusService } from "@/services/cusService";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Transactions() {
	const dispatch = useDispatch();
	const status = useSelector((state: RootState) => state.app.authStatus);
	const [loading, setLoading] = useState<boolean>(true);

	const initPage = async () => {
		if (status !== AuthStatus.loggedIn) {
			const success = await AuthService.authenticate(dispatch);
			if (success) await CusService.getCusData(dispatch);
		} else {
			await CusService.getCusData(dispatch);
		}
		setLoading(false);
	};

	useEffect(() => {
		initPage();
	}, [status]);

	if (loading) {
		return <LoadingPage />;
	}

	return (
		<div>
			<h3>Transactions</h3>
			<br />
			<h4>Upcoming</h4>
			<UpcomingTransactions />

			<br />

			<h4>Paid</h4>
			<PaidTransactions />
		</div>
	);
}

export default Transactions;
