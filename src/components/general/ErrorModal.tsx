import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import styles from "../../styles/General/ErrorModal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/pro-regular-svg-icons";
import Margin from "./margin";
import { useDispatch, useSelector } from "react-redux";
import { setErrModal } from "@/redux/appSlice";
import MyButton from "./MyButton";
import { faXmark } from "@fortawesome/pro-solid-svg-icons";
import { RootState } from "@/redux/store";

type ErrorModalProps = {
	setOpen: Dispatch<SetStateAction<boolean>>;
};

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useOutsideAlerter(ref: any, callback: any) {
	useEffect(() => {
		/**
		 * Alert if clicked on outside of element
		 */
		function handleClickOutside(event: any) {
			if (ref.current && !ref.current.contains(event.target)) {
				callback();
			}
		}
		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);
}

function ErrorModal({ setOpen }: ErrorModalProps) {
	const dispatch = useDispatch();
	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef, () => dispatch(setErrModal({ show: false })));
	const error = useSelector((state: RootState) => state.app.errModal);

	return (
		<div className={styles.container}>
			<div className={styles.modal} ref={wrapperRef}>
				<button
					className={styles.cancelBtn}
					onClick={() => dispatch(setErrModal({ show: false }))}
				>
					<FontAwesomeIcon icon={faXmark} className={styles.icon} />
				</button>

				<FontAwesomeIcon
					icon={faCircleExclamation}
					className={styles.errIcon}
				/>
				<Margin height={25} />
				<p className={styles.title}>{error.title}</p>
				<Margin height={15} />
				<p className={styles.description}>{error.msg}</p>
				<Margin height={30} />

				{/* <div className={styles.inputsContainer}>
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
				/> */}
			</div>
		</div>
	);
}

export default ErrorModal;
