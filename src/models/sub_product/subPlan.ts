import { SubUsage, SubUsageFuncs } from "./sub_usage";

export enum Interval {
	day = "day",
	week = "week",
	month = "month",
	year = "year",
}

export type SubPlan = {
	id: number;
	// productId: number;
	interval: Interval;
	intervalCount: number;
	unitAmount: number;
	currency: string;

	usages: Array<SubUsage> | null;
};

export class SubPlanFuncs {
	static costString = (plan: SubPlan) => {
		return (plan.unitAmount / 100).toFixed(2);
	};

	static intervalString = (plan: SubPlan) => {
		if (plan.intervalCount > 1) {
			return `${plan.intervalCount} ${plan.interval}s`;
		} else {
			return plan.interval;
		}
	};

	static intervalStringShort = (plan: SubPlan) => {
		if (plan.intervalCount > 1) {
			return `${plan.intervalCount}${plan.interval[0]}s`;
		} else {
			return plan.interval[0];
		}
	};

	static stringToInterval = (intervalString: string): Interval => {
		if (intervalString == "day") return Interval.day;
		else if (intervalString == "week") return Interval.week;
		else if (intervalString == "month") return Interval.month;
		else return Interval.year;
	};

	static usagesFromJson = (usagesJson: any): Array<SubUsage> | null => {
		if (usagesJson === null || usagesJson === undefined) return null;
		let usages: Array<SubUsage> = [];
		usagesJson.map((usage: any) => usages.push(SubUsageFuncs.fromJson(usage)));
		return usages;
	};

	static fromJson = (json: any): SubPlan => {
		return {
			id: json.plan_id,
			interval: this.stringToInterval(json.recurring_duration.interval),
			intervalCount: json.recurring_duration.interval_count,
			unitAmount: json.unit_amount,
			currency: json.currency,
			usages: this.usagesFromJson(json.usages),
		};
	};
}
