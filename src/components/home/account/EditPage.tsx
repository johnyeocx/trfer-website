import React, { useEffect, useState } from "react";
import styles from "../../../styles/Home/Account/EditPage.module.scss";
import Margin from "@/components/general/margin";
import Image from "next/image";
import { UserFuncs } from "@/models/user/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import AmountTextField from "@/components/user/amountTextField";
import NoteTextField from "@/components/user/noteTextField";
import MyButton from "@/components/general/MyButton";
import { PageTheme, themeColors } from "@/models/page_themes/PageThemes";
import { setPageTheme } from "@/redux/user/userSlice";
import LoadingPage from "@/components/general/LoadingPage";
import { UserService } from "@/services/userService";
import { setPageLoading } from "@/redux/appSlice";

function EditPage() {
	const dispatch = useDispatch();

	const user = useSelector((state: RootState) => state.userState.user);
	const pageStyle = useSelector(
		(state: RootState) => state.userState.pageStyle
	);

	let colors = themeColors[pageStyle.pageTheme];

	const [testDetails, setTestDetails] = useState({
		amount: "",
		note: "",
	});

	const changeTheme = async (theme: PageTheme) => {
		dispatch(setPageLoading(true));
		try {
			UserService.setPageTheme(theme);
		} catch (error) {
			console.log("Failed to set page theme:", error);
			dispatch(setPageLoading(false));
			return;
		}

		dispatch(setPageLoading(false));
		dispatch(setPageTheme({ pageTheme: theme }));
	};

	return (
		<div>
			<div style={{ overflow: "auto" }}>
				<div className={styles.styleTitle}>Customise Theme</div>
				<Margin height={8} />
				<ThemeSelection onClick={changeTheme} />
			</div>

			<div>
				<div className={styles.previewOuterContainer}>
					<div
						className={styles.previewContainer}
						style={{ backgroundColor: `${colors.bgColor}` }}
					>
						<div className={styles.row1}>
							<div className={styles.imgContainer}>
								<Image
									alt=""
									src={UserFuncs.imagePath(user!)}
									fill
									className={styles.img}
									style={{ objectFit: "cover" }}
								/>
							</div>
							<Margin width={10} />
							<div>
								<p
									style={{
										color: colors.textColor,
									}}
									className={styles.name}
								>
									{UserFuncs.fullName(user!)}
								</p>
								<p
									style={{
										color: colors.textColor,
									}}
									className={styles.username}
								>
									trfer.me/{user!.username}
								</p>
							</div>
						</div>

						<Margin height={10} />
						<AmountTextField
							height={20}
							scale={0.8}
							value={testDetails.amount}
							onChange={(value) =>
								setTestDetails({ ...testDetails, amount: value })
							}
							bgColor={colors.inputBgColor}
							placeholderColor={colors.inputPlaceholderColor}
							textColor={colors.inputTextColor}
						/>
						<NoteTextField
							scale={0.8}
							value={testDetails.note}
							onChange={(value) =>
								setTestDetails({ ...testDetails, note: value })
							}
							placeholder="Note"
							bgColor={colors.inputBgColor}
							placeholderColor={colors.inputPlaceholderColor}
							textColor={colors.inputTextColor}
						/>
						<Margin height={10} />
						<MyButton
							scale={0.8}
							text="Trf Now"
							onClick={() => {}}
							bgColor={colors.btnBgColor}
							textColor={colors.btnTextColor}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EditPage;

export const ThemeSelection = ({ onClick }: any) => {
	const themes: Array<PageTheme> = [PageTheme.light, PageTheme.dark];
	const pageStyle = useSelector(
		(state: RootState) => state.userState.pageStyle
	);
	return (
		<div className={styles.colorSelectionContainer}>
			{themes.map((theme, index) => {
				const colors = themeColors[theme];

				return (
					<button
						key={index}
						onClick={() => onClick(theme)}
						className={`${styles.themeSelectContainer}`}
						style={{
							backgroundColor: colors.bgColor,
							border:
								pageStyle.pageTheme == theme
									? `2px solid #CCC`
									: `2px solid ${colors.bgColor}`,
						}}
					>
						<div
							className={styles.top}
							style={{
								backgroundColor: colors.textColor,
							}}
						/>
						<Margin height={8} />
						<div
							className={styles.middle}
							style={{
								backgroundColor: colors.inputBgColor,
							}}
						/>
						<Margin height={12} />
						<div
							className={styles.bottom}
							style={{
								backgroundColor: colors.btnBgColor,
							}}
						/>
					</button>
				);
			})}
		</div>
	);
};
