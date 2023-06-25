import React from "react";
import styles from "../../styles/Navbar/Navbar.module.scss";
import NavButton from "./NavButton";
import Margin from "../general/Margin";
import Link from "next/link";

function Navbar() {
	return (
		<nav className={styles.navContainer}>
			<div className={styles.left}>
				<Link href="/" className="logo">
					byteclass
				</Link>
				<Margin width={30} />
				{/* <p className={styles.subText}>Launching Soon!</p> */}
			</div>

			<div className={styles.right}>
				{/* <NavButton text="Home" path="/" />
				<NavButton text="Blog" path="/blog" />
				<NavButton text="Classes" path="/classes" /> */}
				<Link
					target="_blank"
					href="https://79v46on3v03.typeform.com/to/WUi6DmLQ"
					className={styles.applyBtn}
				>
					Become a creator
				</Link>
			</div>
		</nav>
	);
}

export default Navbar;
