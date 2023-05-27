import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "../../styles/Services/Create.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/pro-solid-svg-icons";
import Margin from "@/components/general/margin";
import { Button, Input } from "antd";
import MyButton from "../general/MyButton";
import { ServiceService } from "@/services/serviceService";
import { useDispatch } from "react-redux";
import { addServiceTemplate } from "@/redux/service/serviceSlice";
import { TemplateFuncs } from "@/models/service/ServiceTemplate";

type CreateModalProps = {
	setCreateOpen: Dispatch<SetStateAction<boolean>>;
};
function CreateModal({ setCreateOpen }: CreateModalProps) {
	const [loading, setLoading] = useState(false);
	const [serviceName, setServiceName] = useState("");
	const dispatch = useDispatch();

	const createClicked = async () => {
		setLoading(true);

		try {
			const { data } = await ServiceService.createServiceTemplate(serviceName);
			dispatch(addServiceTemplate(TemplateFuncs.fromJson(data.template)));
		} catch (error) {
			console.log(error);
		}

		setLoading(false);
		setCreateOpen(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.modal}>
				<div className={styles.top}>
					<p className={styles.title}>Create new service</p>
					<button onClick={() => setCreateOpen(false)}>
						<FontAwesomeIcon icon={faXmark} className={styles.icon} />
					</button>
				</div>

				<Margin height={25} />
				<div className={styles.inputsContainer}>
					<p className={styles.inputTitle}>Service Name</p>
					<Input
						placeholder="Name"
						size="large"
						className={styles.nameInput}
						value={serviceName}
						onChange={(e) => setServiceName(e.target.value)}
					/>
				</div>

				<Margin height={30} />
				<MyButton
					bgColor="#232323"
					onClick={createClicked}
					text="Create"
					loading={loading}
					scale={0.85}
				/>
			</div>
		</div>
	);
}

export default CreateModal;
