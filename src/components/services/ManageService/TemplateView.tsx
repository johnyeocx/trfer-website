import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "../../../styles/Services/ManageService/TemplateView.module.scss";
import Margin from "@/components/general/margin";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ProfileImage from "@/components/general/ProfileImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCheck,
	faClipboard,
	faLeaf,
	faPlus,
} from "@fortawesome/pro-solid-svg-icons";

import { Checkbox, Input } from "antd";
import NoteTextField from "@/components/user/PaymentTextField";
import MyButton from "@/components/general/MyButton";
import {
	ServiceTemplate,
	TemplateFuncs,
} from "@/models/service/ServiceTemplate";
import ManageButton from "./ManageButton";
import { faBookmark } from "@fortawesome/pro-regular-svg-icons";
import { useRouter } from "next/router";
import { setErrModal } from "@/redux/appSlice";
import { ServiceService } from "@/services/serviceService";
import { updateServiceTemplate } from "@/redux/service/serviceSlice";

const { TextArea } = Input;
type TemplateViewProps = {
	template: ServiceTemplate;
	setTemplate: Dispatch<SetStateAction<ServiceTemplate | null>>;
};

function TemplateView({ template, setTemplate }: TemplateViewProps) {
	const dispatch = useDispatch();
	const router = useRouter();

	const [optionChecks, setOptionChecks] = useState({
		collectCompanyName: template.collectCompanyName,
		collectMobileNumber: template.collectMobileNumber,
		collectAddress: template.collectAddress,
		addNote: template.addNote,
	});

	const [pricingText, setPricingText] = useState(
		template.defaultPrice ? template.defaultPrice.toFixed(2) : ""
	);
	const [noteText, setNoteText] = useState(template.note ? template.note : "");
	// const [priceError, setPriceError] = useState(null);

	const [serviceName, setServiceName] = useState(template.serviceName);

	const user = useSelector((state: RootState) => state.userState.user);

	const [sampleTexts, setSampleTexts] = useState({
		email: "",
		fullName: "",
	});

	const [saveSuccess, setSaveSuccess] = useState(false);
	const [loading, setLoading] = useState(false);

	const saveClicked = async () => {
		setLoading(true);

		let priceFloat = parseFloat(pricingText);
		if (!priceFloat) {
			dispatch(
				setErrModal({
					show: true,
					title: "Failed to save",
					msg: "Default price must be a value greater than 0 and less than 10,000",
				})
			);
			setLoading(false);
			return;
		}
		priceFloat = parseFloat(priceFloat.toFixed(2));

		if (serviceName == "") {
			dispatch(
				setErrModal({
					show: true,
					title: "Failed to save",
					msg: "Service name must not be empty",
				})
			);
			setLoading(false);
			return;
		}

		try {
			await ServiceService.updateTemplate(
				TemplateFuncs.updateTemplateJson({
					id: template.id,
					serviceName: serviceName,
					defaultPrice: priceFloat,
					...optionChecks,
					note: optionChecks.addNote ? noteText : null,
				})
			);

			setTemplate({
				...template,
				id: template.id,
				serviceName,
				defaultPrice: priceFloat,
				...optionChecks,
				note: optionChecks.addNote ? noteText : null,
			});
			setSaveSuccess(true);
		} catch (error) {
			dispatch(
				setErrModal({
					show: true,
					title: "Failed to save",
					msg: "Something went wrong on our systems. We apologise for the inconvenience",
				})
			);
		}

		setLoading(false);
	};

	return (
		<>
			<div className={styles.topRow}>
				<p className={styles.introText}>
					With a template, you can send out custom links to clients with
					pre-filled fields, or simply send out the template link.
				</p>
				<ManageButton
					title="Save"
					icon={faBookmark}
					onClick={saveClicked}
					loading={loading}
					success={saveSuccess}
					setSuccess={setSaveSuccess}
					successIcon={faCheck}
					successText="Saved"
					secondary={true}
				/>
			</div>
			<Margin height={20} />
			<div className={styles.contentContainer}>
				<div className={styles.left}>
					<div>
						<h6 className={styles.sectionTitle}>Service Name</h6>

						<div style={{ width: "60%" }}>
							<Input
								width={50}
								className={styles.pricingInput}
								placeholder="Name"
								value={serviceName}
								onChange={(e) => setServiceName(e.target.value)}
							/>
						</div>
						<Margin height={20} />
						<h6 className={styles.sectionTitle}>Default Price</h6>

						<div style={{ width: "60%" }}>
							<Input
								prefix="£"
								suffix="GBP"
								width={50}
								className={styles.pricingInput}
								placeholder="0.00"
								value={pricingText}
								onChange={(e) => setPricingText(e.target.value)}
							/>
						</div>
					</div>
					<Margin height={20} />

					<div>
						<h6 className={styles.sectionTitle}>Options</h6>
						<Margin height={10} />
						<div>
							<CheckOption
								checked={optionChecks.collectCompanyName}
								title="Collect company name"
								onToggle={() =>
									setOptionChecks({
										...optionChecks,
										collectCompanyName: !optionChecks.collectCompanyName,
									})
								}
							/>
							<Margin height={10} />
							<CheckOption
								checked={optionChecks.collectMobileNumber}
								title="Collect mobile number"
								onToggle={() =>
									setOptionChecks({
										...optionChecks,
										collectMobileNumber: !optionChecks.collectMobileNumber,
									})
								}
							/>
							<Margin height={10} />

							<CheckOption
								checked={optionChecks.collectAddress}
								title="Collect address"
								onToggle={() =>
									setOptionChecks({
										...optionChecks,
										collectAddress: !optionChecks.collectAddress,
									})
								}
							/>
							<Margin height={10} />
							<CheckOption
								checked={optionChecks.addNote}
								title="Add a note"
								onToggle={() => {
									if (optionChecks.addNote) {
										setNoteText("");
									}
									setOptionChecks({
										...optionChecks,
										addNote: !optionChecks.addNote,
									});
								}}
							/>
							{optionChecks.addNote && (
								<>
									<Margin height={15} />
									<div style={{ width: "60%" }}>
										<TextArea
											className={styles.pricingInput}
											placeholder="Note"
											rows={4}
											value={noteText}
											onChange={(e) => setNoteText(e.target.value)}
										/>
									</div>
								</>
							)}
						</div>
					</div>
				</div>

				<div className={styles.right}>
					<div className={styles.previewContainer}>
						<div className={styles.accountDetails}>
							<ProfileImage imageDim={25} uId={user?.id} />
							<Margin width={10} />
							<p className={styles.accountName}>{user?.accountName}</p>
						</div>

						<Margin height={20} />
						<div className={styles.serviceInfoContainer}>
							<p className={styles.serviceName}>{template.serviceName}</p>
							<p className={styles.amountText}>
								{pricingText == "" ? "£0.00" : `£${pricingText}`}
							</p>
						</div>

						<Margin height={10} />
						<div className={styles.inputsContainer}>
							<NoteTextField
								title=""
								value={sampleTexts.email}
								placeholder="Email"
								scale={0.7}
								onChange={(val) =>
									setSampleTexts({ ...sampleTexts, email: val })
								}
							/>

							<NoteTextField
								title=""
								value={sampleTexts.fullName}
								placeholder="Full Name"
								scale={0.7}
								onChange={(val) =>
									setSampleTexts({ ...sampleTexts, fullName: val })
								}
							/>
							<Margin height={10} />
							<MyButton onClick={() => {}} text="Pay Now" scale={0.7} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default TemplateView;

export const CheckOption = ({ title, onToggle, checked }: any) => {
	return (
		<div className={styles.checkContainer}>
			<Checkbox checked={checked} onChange={onToggle}></Checkbox>
			<Margin width={12} />
			<button className={styles.text} onClick={onToggle}>
				{title}
			</button>
		</div>
	);
};
