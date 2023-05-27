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
	InvoiceStatus,
	LinkType,
} from "@/models/service/CustomLink";
import { setErrModal } from "@/redux/appSlice";
import { InputField, NumberInputField } from "./CreateCustomModal";
import { PhoneNumberFuncs } from "@/models/PhoneNumber";

type EditLinkModalProps = {
	template: ServiceTemplate;
	setOpen: Dispatch<SetStateAction<boolean>>;
	customLink: CustomLink;
	setLinks: Dispatch<SetStateAction<Array<CustomLink> | null>>;
	links: Array<CustomLink>;
};

function EditLinkModal({
	template,
	setOpen,
	customLink,
	setLinks,
	links,
}: EditLinkModalProps) {
	const [loading, setLoading] = useState(false);
	const [tab, setTab] = useState(LinkType.payment);
	const dispatch = useDispatch();

	const [details, setDetails] = useState({
		priceText: customLink.unitAmount ? customLink.unitAmount.toFixed(2) : "",
		email: customLink.email ? customLink.email : "",
		fullName: customLink.fullName ? customLink.fullName : "",
		companyName: customLink.companyName ? customLink.companyName : "",
	});

	const [mobileNumber, setMobileNumber] = useState({
		dialingCode: customLink.mobileNumber
			? customLink.mobileNumber.dialingCode
			: "",
		number: customLink.mobileNumber ? customLink.mobileNumber.number : "",
	});

	const createClicked = async () => {
		if (customLink.status != InvoiceStatus.created) {
			dispatch(
				setErrModal({
					show: true,
					title: "Failed to edit link",
					msg: "You are unable to edit a link that has already been completed",
				})
			);
		}
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
			let newData = {
				id: customLink.id,
				templateId: template.id,
				email: details.email != "" ? details.email : null,
				fullName: details.fullName != "" ? details.fullName : null,
				companyName: details.companyName != "" ? details.companyName : null,
				mobileNumber: mobileNumber,
				unitAmount: priceFloat,
			};
			await ServiceService.updateCustomLink(CustomLinkFuncs.toJson(newData));

			let newLinks = [...links];
			let cIndex = newLinks.findIndex((c) => c.id === customLink.id);
			if (cIndex == -1) return;

			newLinks[cIndex] = {
				...newLinks[cIndex],
				...newData,
				mobileNumber: PhoneNumberFuncs.parseInputResult(mobileNumber),
			};
			setLinks(newLinks);
		} catch (error) {
			console.log(error);
			dispatch(
				setErrModal({
					show: true,
					title: "Failed to edit link",
					msg: "There has been an error in trying to update this custom link. We apologise for any inconvenience caused.",
				})
			);
		}

		setOpen(false);
		setLoading(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.modal}>
				<div className={styles.top}>
					<p className={styles.title}>Edit custom link</p>
					<button onClick={() => setOpen(false)}>
						<FontAwesomeIcon icon={faXmark} className={styles.icon} />
					</button>
				</div>

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
							// scale={0.85}
							width="50%"
							text="Edit link"
							onClick={createClicked}
							loading={loading}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EditLinkModal;
