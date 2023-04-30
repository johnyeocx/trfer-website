import { Interval } from "./subPlan";

export type SubUsage = {
	id: number;
	title: string;
	unlimited: boolean;
	interval: Interval | null;
	amount: number | null;
};

export class SubUsageFuncs {
	static fromJson = (json: any): SubUsage => {
		return {
			id: json.sub_usage_id,
			title: json.title,
			unlimited: json.unlimited,
			interval: json.interval,
			amount: json.amount,
		};
	};
}
