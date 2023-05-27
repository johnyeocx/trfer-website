import LoadingPage from "@/components/general/LoadingPage";
import { ServiceService } from "@/services/serviceService";
import { useRouter } from "next/router";
import React, { useEffect, useReducer, useState } from "react";
import styles from "../styles/Payment/TemplatePayment.module.scss";
import ProfileImage from "@/components/general/ProfileImage";
import Margin from "@/components/general/margin";
import {
	ServiceTemplate,
	TemplateFuncs,
} from "@/models/service/ServiceTemplate";
import { User, UserFuncs } from "@/models/user/user";
import NavBar from "@/components/general/Nav/NavBar";
import { GenFuncs } from "@/misc/helperFunctions/GenFuncs";
import PaymentTextField from "@/components/user/PaymentTextField";
import MyButton from "@/components/general/MyButton";
import MobileTextField from "@/components/payment/MobileTextField";
import AddressTextField from "@/components/payment/AddressTextField";
import { PaymentFuncs, PaymentType } from "@/models/payment/Payment";
import { PhoneNumber, PhoneNumberFuncs } from "@/models/PhoneNumber";
import { Address, AddressFuncs } from "@/models/user/Address";
import { CustomLink, CustomLinkFuncs } from "@/models/service/CustomLink";
import { PaymentService } from "@/services/paymentService";
import { PlaidLinkOptions, usePlaidLink } from "react-plaid-link";
import { StrIdType } from "@/models/StrIdPrefix";

type PaymentPageProps = {
	paymentDetails: Array<string>;
};

function PaymentPage() {
	const [token, setToken] = useState(null);
	const config: PlaidLinkOptions = {
		onSuccess: async (public_token, metadata) => {
			setToken(null);
			// setDetails({ amount: "", note: "" });
			// setSuccess(true);
		},
		// onExit: async () => {
		// 	setToken(null);
		// },

		token: token,
	};

	const { open, exit, ready } = usePlaidLink(config);

	const router = useRouter();
	const query = router.query;
	const [notFound, setNotFound] = useState(false);
	const [loading, setLoading] = useState(true);
	const [btnLoading, setBtnLoading] = useState(false);

	const [template, setTemplate] = useState<ServiceTemplate | null>(null);
	const [user, setUser] = useState<User | null>(null);
	const [details, setDetails] = useState<any>({
		email: "",
		fullName: "",
		companyName: "",
	});

	const [mobileNumber, setMobileNumber] = useState<PhoneNumber>({
		dialingCode: "",
		number: "",
	});

	const [address, setAddress] = useState<Address>({
		line1: "",
		line2: "",
		postalCode: "",
		city: "",
		countryCode: "",
	});

	const [paymentType, setPaymentType] = useState<PaymentType | null>(null);
	const [customLink, setCustomLink] = useState<CustomLink | null>(null);
	const [strId, setStrId] = useState("");

	const initTemplatePayment = async (tStrId: string) => {
		try {
			const { data } = await ServiceService.getTemplatePaymentDetails(tStrId);

			setTemplate(TemplateFuncs.fromJson(data.template));
			setUser(UserFuncs.fromJson(data.user));
		} catch (error) {
			console.log(error);
			setNotFound(true);
		}

		setLoading(false);
	};

	const initCusLinkPayment = async (tStrId: string) => {
		try {
			const { data } = await ServiceService.getCustomPaymentDetails(tStrId);

			console.log(data);
			setTemplate(TemplateFuncs.fromJson(data.template));
			setUser(UserFuncs.fromJson(data.user));
			let customLink = CustomLinkFuncs.fromJson(data.custom_link);
			setCustomLink(customLink);
			setDetails({
				fullName: customLink.fullName ? customLink.fullName : "",
				email: customLink.email ? customLink.email : "",
				companyName: customLink.companyName ? customLink.companyName : "",
			});

			if (customLink.mobileNumber) {
				setMobileNumber(customLink.mobileNumber);
			}
		} catch (error) {
			console.log(error);
			setNotFound(true);
		}

		setLoading(false);
	};

	useEffect(() => {
		let pDetails = router.query.pdetails;

		if (pDetails !== undefined) {
			if (pDetails.length < 2) {
				setNotFound(true);
			}

			let [username, stringId]: any = pDetails;

			setStrId(stringId);
			let strIdType = stringId.substring(0, stringId.indexOf("_"));

			if (strIdType == StrIdType.template) {
				setPaymentType(PaymentType.templatePayment);
				initTemplatePayment(stringId);
			} else {
				setPaymentType(PaymentType.customPayment);
				initCusLinkPayment(stringId);
			}
		}
	}, [query]);

	useEffect(() => {
		if (ready) open();
	}, [open, ready]);

	const btnClicked = async () => {
		setBtnLoading(true);

		const reqBody = {
			...details,
			userId: user?.id,
			paymentType: paymentType,
			templateId: template?.id,
			customLinkId:
				paymentType == PaymentType.templatePayment ? null : customLink!.id,

			companyName: template?.collectCompanyName ? details.companyName : null,
			mobileNumber: template?.collectMobileNumber ? mobileNumber : null,
			address: template?.collectAddress ? address : null,
		};

		try {
			const { data } = await PaymentService.initiatePayment(
				PaymentFuncs.toInitiateJson(reqBody),
				strId
			);

			setToken(data.link_token);
		} catch (error) {
			console.log(error);
		}
		setBtnLoading(false);
	};

	if (notFound) return <div>Not Found</div>;
	if (loading) return <LoadingPage />;

	return (
		<div className={styles.pageContainer}>
			<NavBar showRight={false} />
			<div className={styles.mainContainer}>
				<div className={styles.details}>
					<div className={styles.userDetailsContainer}>
						<ProfileImage uId={user?.id} imageDim={45} />
						<Margin width={15} />
						<p className={styles.name}>{user?.accountName}</p>
					</div>
					<Margin height={30} />
					<div className={styles.productDetails}>
						<p className={styles.serviceName}>{template?.serviceName}</p>
						<Margin height={6} />
						<p className={styles.price}>
							{paymentType == PaymentType.templatePayment
								? GenFuncs.floatToStr(template?.defaultPrice!)
								: GenFuncs.floatToStr(customLink?.unitAmount!)}
						</p>
					</div>
				</div>
				<Margin height={30} />
				<div className={styles.form}>
					<PaymentTextField
						value={details.email}
						onChange={(val) => setDetails({ ...details, email: val })}
						placeholder="Email"
						title="Email"
						preset={customLink && customLink.email ? customLink.email : null}
					/>

					<PaymentTextField
						value={details.fullName}
						onChange={(val) => setDetails({ ...details, fullName: val })}
						placeholder="Name"
						title="Name"
						preset={
							customLink && customLink.fullName ? customLink.fullName : null
						}
					/>

					{template?.collectCompanyName && (
						<PaymentTextField
							value={details.companyName}
							onChange={(val) => setDetails({ ...details, companyName: val })}
							placeholder="Company Name"
							title="Company Name"
							preset={
								customLink && customLink.companyName
									? customLink.companyName
									: null
							}
						/>
					)}

					{template?.collectMobileNumber && (
						<MobileTextField
							mobileNumber={mobileNumber}
							setMobileNumber={setMobileNumber}
							preset={customLink?.mobileNumber}
						/>
					)}

					{template?.collectAddress && <AddressTextField />}

					<Margin height={30} />
					<MyButton
						text="Pay Now"
						onClick={btnClicked}
						loading={btnLoading}
						// loading={trfLoading}
						// enabled={enabled}
						// bgColor={colors.btnBgColor}
						// textColor={colors.btnTextColor}
					/>
				</div>
			</div>
		</div>
	);
}

export default PaymentPage;
