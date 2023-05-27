import React, {
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";
import styles from "../../../../styles/Services/ManageService/CustomLinksView.module.scss";
import Margin from "@/components/general/margin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCheck,
	faClipboard,
	faPen,
	faPenToSquare,
	faPlus,
	faTrash,
} from "@fortawesome/pro-solid-svg-icons";
import ManageButton from "../ManageButton";
import CreateCustomModal from "./CreateCustomModal";
import { ServiceTemplate } from "@/models/service/ServiceTemplate";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CustomLink } from "@/models/service/CustomLink";
import EditLinkModal from "./EditLinkModal";
import { Button } from "antd";
import DeleteLinkModal from "./DeleteLinkModal";
import { PhoneNumberFuncs } from "@/models/PhoneNumber";

type CustomLinksViewProps = {
	template: ServiceTemplate;
	links: Array<CustomLink>;
	setLinks: Dispatch<SetStateAction<Array<CustomLink> | null>>;
};
function CustomLinksView({ template, links, setLinks }: CustomLinksViewProps) {
	const [loading, setLoading] = useState(false);
	const [createSuccess, setCreateSuccess] = useState(false);

	const [createOpen, setCreateOpen] = useState(false);
	const createClicked = async () => setCreateOpen(true);

	return (
		<>
			{createOpen && (
				<CreateCustomModal
					template={template}
					setCreateOpen={setCreateOpen}
					links={links}
					setLinks={setLinks}
				/>
			)}
			<div className={styles.topRow}>
				<p className={styles.introText}>
					Use custom links to create customised payment pages for specific
					clients, where fields can be pre-filled, such as amount, name, etc.
				</p>
				<ManageButton
					title="Create"
					icon={faPlus}
					onClick={createClicked}
					loading={loading}
					success={createSuccess}
					setSuccess={setCreateSuccess}
					successIcon={faCheck}
					successText="Created"
					secondary={true}
				/>
			</div>
			<Margin height={20} />
			<div className={styles.contentContainer}>
				{/* <p className={styles.introText}>
					Use custom links to create customised payment pages for specific
					clients, where fields can be pre-filled, such as amount, name, etc.
				</p>
				<Margin height={20} /> */}
				<div className={styles.container}>
					<table cellSpacing={0} className={styles.table}>
						<thead>
							<tr className={styles.headerRow}>
								<th>ID</th>
								<th>Name</th>
								<th>Email</th>
								<th>Amount</th>
								{template.collectCompanyName && <th>Company Name</th>}
								{template.collectMobileNumber && <th>Mobile Number</th>}
								<th>Status</th>
								<th>
									{/* <FontAwesomeIcon icon={faPenToSquare} /> */}
									{/* Copy */}
								</th>
							</tr>
						</thead>

						<tbody>
							{links.map((link, index) => {
								return (
									<DataRow
										key={index}
										links={links}
										setLinks={setLinks}
										link={link}
										template={template}
									/>
								);
							})}
						</tbody>
					</table>
					{links.length === 0 && (
						<div className={styles.emptyText}>No custom links created</div>
					)}
				</div>
			</div>
		</>
	);
}

export default CustomLinksView;

const DataRow = ({ template, link, setLinks, links }: any) => {
	const [hover, setHover] = useState(false);
	const rowRef = useRef(null);

	const [editOpen, setEditOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const user = useSelector((state: RootState) => state.userState.user);

	return (
		<>
			{editOpen && (
				<EditLinkModal
					customLink={link}
					setOpen={setEditOpen}
					template={template}
					setLinks={setLinks}
					links={links}
				/>
			)}

			{deleteOpen && (
				<DeleteLinkModal
					customLink={link}
					setOpen={setDeleteOpen}
					template={template}
					setLinks={setLinks}
					links={links}
				/>
			)}
			<tr
				ref={rowRef}
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
				className={`${styles.dataRow} ${hover && styles.dataRowHover}`}
				onClick={() => {
					if (hover) {
						setEditOpen(true);
					}
				}}
			>
				<td>{link.strId}</td>
				<td>{link.fullName ? link.fullName : "-"}</td>
				<td>{link.email ? link.email : "-"}</td>
				<td>{`${link.unitAmount?.toFixed(2)} GBP`}</td>

				{template.collectCompanyName && (
					<td>{link.companyName ? link.companyName : "-"}</td>
				)}

				{template.collectMobileNumber && (
					<td>
						{link.mobileNumber
							? PhoneNumberFuncs.format(link.mobileNumber)
							: "-"}
					</td>
				)}

				<td>{link.status}</td>
				<td className={styles.actionCell}>
					<Button
						onMouseEnter={() => setHover(false)}
						onMouseLeave={(e) => setHover(true)}
						className={styles.actionContainer}
						onClick={() => {
							navigator.clipboard.writeText(
								`http://localhost:3000/${user!.username}/${link.strId}`
							);
						}}
					>
						<FontAwesomeIcon className={styles.icon} icon={faClipboard} />
					</Button>
					<Margin width={10} />
					<Button
						onMouseEnter={() => setHover(false)}
						onMouseLeave={(e) => setHover(true)}
						className={styles.actionContainer}
						danger
						onClick={() => setDeleteOpen(true)}
					>
						<FontAwesomeIcon className={styles.icon} icon={faTrash} />
					</Button>
				</td>
			</tr>
		</>
	);
};
