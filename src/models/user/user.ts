export type User = {
	id: string;
	email: string;
	username: string;
	firstName: string;
	lastName: string;
	publicToken: string;
};

export class UserFuncs {
	static fromJson = (json: any): User => {
		return {
			id: json.customer_id,
			email: json.email,
			username: json.username,
			firstName: json.first_name,
			lastName: json.last_name,
			publicToken: json.public_token,
		};
	};

	static fullName = (user: User): string => {
		return user.firstName + " " + user.lastName;
	};
}
