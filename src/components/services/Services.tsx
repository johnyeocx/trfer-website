import AuthTextField from "@/components/auth/authTextField";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Services/Services.module.scss";

import Margin from "@/components/general/margin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerPlus, faPlus } from "@fortawesome/pro-solid-svg-icons";
import CreateModal from "./CreateModal";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "@/redux/store";
import { ServiceTemplate } from "@/models/service/ServiceTemplate";
import Link from "next/link";

function Services() {
	const [createOpen, setCreateOpen] = useState(false);
	const templates = useSelector((state: RootState) => state.service.templates);

	return (
		<div className={styles.pageContainer}>
			{createOpen && <CreateModal setCreateOpen={setCreateOpen} />}
			<div className={styles.container}>
				<button className={styles.card} onClick={() => setCreateOpen(true)}>
					<div className={styles.row}>
						<FontAwesomeIcon icon={faLayerPlus} className={styles.icon} />
						<Margin width={10} />
						<p>Create</p>
					</div>
				</button>
				{templates &&
					templates.length > 0 &&
					templates.map((template: ServiceTemplate) => {
						return (
							<>
								<Link
									href={{
										pathname: "services/" + template.id,
									}}
									className={styles.serviceCard}
								>
									<p>{template.serviceName}</p>
								</Link>
							</>
						);
					})}
			</div>
		</div>
	);
}

export default Services;
