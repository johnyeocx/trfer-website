import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "../../../styles/Services/ManageService/ManageService.module.scss";
import Margin from "@/components/general/margin";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ProfileImage from "@/components/general/ProfileImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowLeft,
	faCheck,
	faClipboard,
	faPlus,
	faSendBack,
	faSendBackward,
	faTick,
	faTrash,
} from "@fortawesome/pro-solid-svg-icons";

import { Checkbox, Input } from "antd";
import NoteTextField from "@/components/user/PaymentTextField";
import MyButton from "@/components/general/MyButton";
import TemplateView from "./TemplateView";
import ServiceTabBar from "./ServiceTabBar";
import CustomLinksView from "./CustomLinks/CustomLinksView";
import Link from "next/link";
import { useRouter } from "next/router";
import { ServiceTemplate } from "@/models/service/ServiceTemplate";
import { faUpload } from "@fortawesome/pro-solid-svg-icons";
import ErrorModal from "@/components/general/ErrorModal";
import { setErrModal } from "@/redux/appSlice";
import ManageButton from "./ManageButton";
import { faBookmark } from "@fortawesome/pro-regular-svg-icons";
import { CustomLink } from "@/models/service/CustomLink";
import { ServiceService } from "@/services/serviceService";

export enum ServiceTab {
	template,
	customLinks,
	transactions,
}
const { TextArea } = Input;

type ManageServiceProps = {
	template: ServiceTemplate;
	setTemplate: Dispatch<SetStateAction<ServiceTemplate | null>>;
	links: Array<CustomLink>;
	setLinks: Dispatch<SetStateAction<Array<CustomLink> | null>>;
};

function ManageService({
	template,
	setTemplate,
	links,
	setLinks,
}: ManageServiceProps) {
	const router = useRouter();
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.userState.user);
	const errModal = useSelector((state: RootState) => state.app.errModal);
	const [tab, setTab] = useState(ServiceTab.template);

	const publishClicked = async () => {
		setPublishLoading(true);

		if (template.defaultPrice == null) {
			dispatch(
				setErrModal({
					show: true,
					title:
						"In order to publish this service, you must first set a default price for it",
					errMessage: "This is a message",
				})
			);
		}

		try {
			await ServiceService.updateTemplatePublished(
				template.id,
				!template.published
			);

			setTemplate({ ...template, published: !template.published });
			setPublishSuccess(true);
		} catch (error) {
			dispatch(
				setErrModal({
					show: true,
					title: "Failed to publish",
					errMessage:
						"Something has gone wrong with our system. We apologise for the inconvenience.",
				})
			);
		}

		setPublishLoading(false);
	};

	const deleteClicked = async () => {};

	const [publishLoading, setPublishLoading] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [publishSuccess, setPublishSuccess] = useState(false);
	const [copySuccess, setCopySuccess] = useState(false);

	return (
		<div className={styles.container}>
			{errModal.show && <ErrorModal setOpen={() => {}} />}

			<button className={styles.backContainer} onClick={() => router.back()}>
				<FontAwesomeIcon icon={faArrowLeft} className={styles.backIcon} />
			</button>
			<Margin height={5} />
			<div className={styles.topContainer}>
				<h1 className={styles.serviceTitle}>{template!.serviceName}</h1>
				<Margin width={20} />
				<div className={styles.actionContainer}>
					<ManageButton
						title="Copy"
						icon={faClipboard}
						onClick={async () => {
							navigator.clipboard.writeText(
								`http://localhost:3000/${user?.username}/${template.strId}`
							);
							setCopySuccess(true);
						}}
						loading={false}
						success={copySuccess}
						setSuccess={setCopySuccess}
						successIcon={faCheck}
						successText="Copied"
					/>
					<Margin width={15} />

					<ManageButton
						title={template.published ? "Unpublish" : "Publish"}
						icon={faSendBackward}
						onClick={publishClicked}
						loading={publishLoading}
						success={publishSuccess}
						setSuccess={setPublishSuccess}
						successIcon={faCheck}
						successText={template.published ? "Published" : "Unpublished"}
					/>
					<Margin width={15} />
					<ManageButton
						title="Delete"
						icon={faTrash}
						onClick={deleteClicked}
						loading={deleteLoading}
						success={false}
						setSuccess={setPublishSuccess}
						successIcon={faCheck}
						successText="Published"
					/>
					{/* <button className={styles.iconContainer} onClick={publishClicked}>
						<FontAwesomeIcon className={styles.icon} icon={faSendBackward} />
						<p className={styles.text}>Publish</p>
					</button> */}
					{/* <button className={styles.iconContainer}>
						<FontAwesomeIcon className={styles.icon} icon={faPlus} />
						<p className={styles.text}>Create</p>
					</button> */}

					{/* <Margin width={15} />
					<button className={styles.iconContainer}>
						<FontAwesomeIcon className={styles.icon} icon={faPlus} />
						<p className={styles.text}>Save</p>
					</button> */}
				</div>
			</div>
			<Margin height={12} />

			<div className={styles.tabRowContainer}>
				<ServiceTabBar tab={tab} setTab={setTab} />
			</div>

			{/* <div className={styles.contentContainer}> */}
			{tab == ServiceTab.template ? (
				<TemplateView template={template} setTemplate={setTemplate} />
			) : tab == ServiceTab.customLinks ? (
				<CustomLinksView
					template={template}
					links={links}
					setLinks={setLinks}
				/>
			) : null}
			{/* </div> */}
		</div>
	);
}

export default ManageService;

export const CheckOption = ({ title, onToggle, checked }: any) => {
	return (
		<div className={styles.checkContainer}>
			<Checkbox checked={checked} onChange={onToggle}></Checkbox>
			<Margin width={12} />
			<p className={styles.text}> {title}</p>
		</div>
	);
};
