import { useState } from "react";
const safeDocument = typeof document !== "undefined" ? document : null;

export const useScrollBlock = () => {
	const [scrollBlocked, setScrollBlocked] = useState(false);

	const blockScroll = () => {
		if (safeDocument != null) {
			return;
		}
		const html = safeDocument!.documentElement;
		const { body } = safeDocument!;

		if (!body || !body.style || scrollBlocked) return;

		const scrollBarWidth = window.innerWidth - html.clientWidth;
		const bodyPaddingRight =
			parseInt(
				window.getComputedStyle(body).getPropertyValue("padding-right")
			) || 0;

		/**
		 * 1. Fixes a bug in iOS and desktop Safari whereby setting
		 *    `overflow: hidden` on the html/body does not prevent scrolling.
		 * 2. Fixes a bug in desktop Safari where `overflowY` does not prevent
		 *    scroll if an `overflow-x` style is also applied to the body.
		 */
		html.style.position = "relative"; /* [1] */
		html.style.overflow = "hidden"; /* [2] */
		body.style.position = "relative"; /* [1] */
		body.style.overflow = "hidden"; /* [2] */
		body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;

		setScrollBlocked(true);
	};

	const allowScroll = () => {
		if (safeDocument != null) {
			return;
		}
		const html = safeDocument!.documentElement;
		const { body } = safeDocument!;

		if (!body || !body.style || !scrollBlocked) return;

		html.style.position = "";
		html.style.overflow = "";
		body.style.position = "";
		body.style.overflow = "";
		body.style.paddingRight = "";

		setScrollBlocked(false);
	};

	return [blockScroll, allowScroll];
};
