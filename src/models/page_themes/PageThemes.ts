export enum PageTheme {
	light = "light",
	dark = "dark",
}

export const strToPageTheme = (str: string): PageTheme => {
	if (str == "dark") {
		return PageTheme.dark;
	} else {
		return PageTheme.light;
	}
};

export const themeColors = {
	light: {
		logoColor: "black",
		bgColor: "white",
		textColor: "black",
		inputBgColor: "#EEE",
		inputTextColor: "black",
		inputPlaceholderColor: "grey",
		btnBgColor: "black",
		btnTextColor: "white",
	},

	dark: {
		logoColor: "white",
		bgColor: "#222",
		textColor: "white",
		inputBgColor: "#555",
		inputTextColor: "white",
		inputPlaceholderColor: "#DDD",
		btnBgColor: "white",
		btnTextColor: "black",
	},
};
