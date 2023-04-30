import BusProfileImage from "@/components/business/busProfileImage";
import { GenFuncs } from "@/misc/helperFunctions/GenFuncs";
import { SubPlanFuncs } from "@/models/sub_product/subPlan";
import { Sub } from "@/models/subscription/subscription";
import React from "react";

type TransactionCardProps = {
	date: Date;
	sub: Sub;
};

function TransactionCard({ date, sub }: TransactionCardProps) {
	return (
		<div>
			<p>{sub.subProduct.product.name}</p>
			<BusProfileImage imageRem={1.5} bId={sub.business.id} />
			<p>{`£${SubPlanFuncs.costString(sub.subProduct.plan)}`}</p>
			<p>{GenFuncs.dateString1(date)}</p>
		</div>
	);
}

export default TransactionCard;
