import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import TransactionCard from "./TransactionCard";
import { Sub, SubFuncs } from "@/models/subscription/subscription";
import Margin from "@/components/general/margin";

function PaidTransactions() {
	const invoices = useSelector((state: RootState) => state.subState.invoices);
	const idToSub = useSelector((state: RootState) => state.subState.idToSub);

	if (invoices === null || idToSub === null) return <></>;

	return (
		<div>
			{invoices &&
				invoices.map((invoice, index) => {
					const sub: Sub = idToSub[invoice.subId];
					return (
						<div key={index}>
							<TransactionCard date={new Date(invoice.created)} sub={sub} />
							<Margin height={20} />
						</div>
					);
				})}
		</div>
	);
}

export default PaidTransactions;
