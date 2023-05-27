import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "../../../../styles/Services/ManageService/CustomLinks/CreateCustomModal.module.scss";
import MyButton from "@/components/general/MyButton";
import Margin from "@/components/general/margin";
import { faXmark } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "antd";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import CreateTabBar from "./CreateTabBar";
import { ServiceTemplate } from "@/models/service/ServiceTemplate";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ServiceService } from "@/services/serviceService";
import {
	CustomLink,
	CustomLinkFuncs,
	LinkType,
} from "@/models/service/CustomLink";
import { PhoneNumberFuncs } from "@/models/PhoneNumber";

type CreateCustomModalProps = {
	template: ServiceTemplate;
	setCreateOpen: Dispatch<SetStateAction<boolean>>;
	links: Array<CustomLink>;
	setLinks: Dispatch<SetStateAction<Array<CustomLink> | null>>;
};

function CreateCustomModal({
	links,
	setLinks,
	template,
	setCreateOpen,
}: CreateCustomModalProps) {
	const [loading, setLoading] = useState(false);
	const [tab, setTab] = useState(LinkType.payment);
	const dispatch = useDispatch();

	const [details, setDetails] = useState({
		priceText: "",
		email: "",
		fullName: "",
		companyName: "",
	});
	const [mobileNumber, setMobileNumber] = useState({
		dialingCode: "",
		number: "",
	});

	const createClicked = async () => {
		setLoading(true);

		let priceFloat: number | null = parseFloat(details.priceText);
		if (priceFloat) {
			priceFloat = parseFloat(priceFloat.toFixed(2));
		} else {
			priceFloat = null;
		}

		if (
			(mobileNumber.dialingCode && !mobileNumber.number) ||
			(mobileNumber.number && !mobileNumber.dialingCode)
		) {
			setLoading(false);
			return;
		}

		try {
			const { data } = await ServiceService.createCustomLink(
				CustomLinkFuncs.toJson({
					templateId: template.id,
					linkType: tab,
					email: details.email != "" ? details.email : null,
					fullName: details.fullName != "" ? details.fullName : null,
					companyName: details.companyName != "" ? details.companyName : null,
					mobileNumber: mobileNumber,
					unitAmount: priceFloat,
				})
			);

			setLinks([...links, CustomLinkFuncs.fromJson(data.custom_link)]);

			// console.log("Success: ", data.custom_link);
		} catch (error) {
			console.log(error);
			setLoading(false);
			// dispatch()
			return;
		}

		setCreateOpen(false);
		setLoading(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.modal}>
				<div className={styles.top}>
					<p className={styles.title}>Create custom link</p>
					<button onClick={() => setCreateOpen(false)}>
						<FontAwesomeIcon icon={faXmark} className={styles.icon} />
					</button>
				</div>

				<Margin height={15} />
				<CreateTabBar />
				<Margin height={10} />
				<p className={styles.description}>
					If any of the fields are left empty, either the default value from
					your template will be used, or the payer will be asked to provide the
					information.
				</p>
				<Margin height={20} />

				<div>
					<InputField
						title="Price"
						placeholder="0.00"
						value={details.priceText}
						onChange={(priceText: string) =>
							setDetails({ ...details, priceText })
						}
						isPrice
					/>

					<InputField
						title="Email"
						placeholder=""
						value={details.email}
						onChange={(email: string) => setDetails({ ...details, email })}
					/>

					<InputField
						title="Full Name"
						placeholder=""
						value={details.fullName}
						onChange={(fullName: string) =>
							setDetails({ ...details, fullName })
						}
					/>

					{template.collectCompanyName && (
						<InputField
							title="Company Name"
							placeholder=""
							value={details.companyName}
							onChange={(companyName: string) =>
								setDetails({ ...details, companyName })
							}
						/>
					)}

					{template.collectMobileNumber && (
						<NumberInputField
							mobileNumber={mobileNumber}
							setMobileNumber={setMobileNumber}
						/>
					)}
					<Margin height={30} />
					<div className={styles.btnContainer}>
						<MyButton
							text="Create payment link"
							width="70%"
							onClick={createClicked}
							loading={loading}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CreateCustomModal;

export const InputField = ({
	title,
	placeholder,
	value,
	onChange,
	isPrice,
}: any) => {
	return (
		<>
			<p className={styles.inputTitle}>{title}</p>
			<Input
				prefix={isPrice && "£"}
				suffix={isPrice && "GBP"}
				placeholder={placeholder}
				size="large"
				className={styles.detailInput}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				// onChange={(e) => setServiceName(e.target.value)}
			/>
			<Margin height={20} />
		</>
	);
};

export const NumberInputField = ({ mobileNumber, setMobileNumber }: any) => {
	return (
		<>
			<p className={styles.inputTitle}>Mobile Number</p>
			<div className={styles.row}>
				<Input
					prefix="+"
					placeholder="44"
					size="large"
					className={styles.detailInput}
					value={mobileNumber.dialingCode}
					onChange={(e) =>
						setMobileNumber({ ...mobileNumber, dialingCode: e.target.value })
					}
					style={{ width: "25%" }}
				/>
				<Margin width={10} />
				<Input
					placeholder="7000100100"
					size="large"
					className={styles.detailInput}
					value={mobileNumber.number}
					onChange={(e) =>
						setMobileNumber({ ...mobileNumber, number: e.target.value })
					}
					style={{ width: "75%" }}
				/>
			</div>
			<Margin height={20} />
		</>
	);
};
