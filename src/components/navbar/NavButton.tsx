import React from "react";
import styles from "../../styles/Navbar/NavButton.module.scss";
import Link from "next/link";

export type NavButtonProps = {
	text: string;
	path: string;
};

function NavButton({ text, path }: NavButtonProps) {
	return (
		<Link href={path} className={styles.navButton}>
			{text}
		</Link>
	);
}

export default NavButton;
