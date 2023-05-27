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

type DeleteLinkModalProps = {
	template: ServiceTemplate;
	setOpen: Dispatch<SetStateAction<boolean>>;
	customLink: CustomLink;
	setLinks: Dispatch<SetStateAction<Array<CustomLink> | null>>;
	links: Array<CustomLink>;
};

function DeleteLinkModal({
	template,
	setOpen,
	customLink,
	setLinks,
	links,
}: DeleteLinkModalProps) {
	const [loading, setLoading] = useState(false);
	const [tab, setTab] = useState(LinkType.payment);
	const dispatch = useDispatch();

	const [details, setDetails] = useState({
		priceText: customLink.unitAmount ? customLink.unitAmount.toFixed(2) : "",
		email: customLink.email ? customLink.email : "",
		fullName: customLink.fullName ? customLink.fullName : "",
		companyName: customLink.companyName ? customLink.companyName : "",
		mobileNumber: customLink.mobileNumber ? customLink.mobileNumber : "",
		// address: "",
	});

	const deleteClicked = async () => {
		if (customLink.status != InvoiceStatus.created) {
			dispatch(
				setErrModal({
					show: true,
					title: "Failed to delete link",
					msg: "You are unable to delete a link that has already been completed",
				})
			);
			return;
		}

		setLoading(true);

		try {
			await ServiceService.deleteCustomLink(customLink.id);

			let newLinks = [...links];
			let cIndex = newLinks.findIndex((c) => c.id === customLink.id);
			if (cIndex == -1) return;

			newLinks.splice(cIndex, 1);
			setLinks(newLinks);
		} catch (error) {
			console.log(error);
			dispatch(
				setErrModal({
					show: true,
					title: "Failed to delete link",
					msg: "There has been an error in trying to delete this custom link. We apologise for any inconvenience caused.",
				})
			);
		}

		setOpen(false);
		setLoading(false);
	};

	const [confirmText, setConfirmText] = useState("");

	return (
		<div className={styles.container}>
			<div className={styles.modal}>
				<div className={styles.top}>
					<p className={styles.title}>Delete link</p>
					<button onClick={() => setOpen(false)}>
						<FontAwesomeIcon icon={faXmark} className={styles.icon} />
					</button>
				</div>

				<Margin height={20} />

				<div>
					<p className={styles.description}>
						To delete this link, please type &apos;delete link&apos; into the
						textbox to confirm your deletion.
					</p>
					<Margin height={10} />
					<InputField
						title=""
						placeholder="delete link"
						value={confirmText}
						onChange={(val: string) => setConfirmText(val)}
					/>

					<div className={styles.btnContainer}>
						<MyButton
							// scale={0.9}
							width="100%"
							text="Delete link"
							onClick={deleteClicked}
							loading={loading}
							enabled={confirmText == "delete link"}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DeleteLinkModal;

const InputField = ({ title, placeholder, value, onChange, isPrice }: any) => {
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
