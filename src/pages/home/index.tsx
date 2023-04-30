import NavBar from "@/components/navbar";
import {
	AppTab,
	AuthStatus,
	setAppTab,
	setShowLoginModal,
} from "@/redux/appSlice";
import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/Home/Home.module.scss";
import { useRouter } from "next/router";
import { AuthService } from "@/services/authService";
import LoadingPage from "@/components/general/LoadingPage";
import { UserService } from "@/services/userService";
import InputDetails from "@/components/auth/register/03_InputDetails";
import ConnectBank from "@/components/auth/register/04_ConnectBank";
import { setUser } from "@/redux/user/userSlice";
import { BankingService } from "@/services/bankingService";

function HomePage() {
	const dispatch = useDispatch();
	const router = useRouter();
	const user = useSelector((state: RootState) => state.userState.user);
	const [loading, setLoading] = useState<boolean>(true);
	const [linkToken, setLinkToken] = useState(null);

	const getLinkToken = async () => {
		try {
			const { data } = await BankingService.getAuthLinkToken();
			setLinkToken(data.link_token);
		} catch (error: any) {
			console.log(error);
			setLoading(false);
			return;
		}
	};

	const initPage = async () => {
		const user = await UserService.getUserData(dispatch);
		if (!user) {
			router.push("/login");
		}
		if (
			user!.firstName == null ||
			user!.lastName == null ||
			user!.publicToken == null
		) {
			await getLinkToken();
		}

		console.log("Link Token:", linkToken);

		dispatch(setUser(user));
		setLoading(false);
	};

	useEffect(() => {
		initPage();
	}, []);

	if (loading) return <LoadingPage />;

	if (user?.firstName === null || user?.lastName === null)
		return <InputDetails />;
	else if (user?.publicToken === null) {
		return <ConnectBank token={linkToken} />;
	} else {
		return <div>Home Page</div>;
	}
}

export default HomePage;
