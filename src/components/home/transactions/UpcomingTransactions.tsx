import { SubFuncs } from "@/models/subscription/subscription";
import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import TransactionCard from "./TransactionCard";

function UpcomingTransactions() {
	const subs = useSelector((state: RootState) => state.subState.subs);

	if (subs === null) return <></>;

	const sortedSubs = SubFuncs.getSubsSorted(subs);

	return (
		<div>
			{sortedSubs &&
				sortedSubs.map((sub, index) => {
					return (
						<TransactionCard
							key={index}
							sub={sub}
							date={SubFuncs.nextInvoiceDate(sub)}
						/>
					);
				})}
		</div>
	);
}

export default UpcomingTransactions;
