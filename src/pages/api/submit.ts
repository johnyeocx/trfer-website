// import { NextApiRequest, NextApiResponse } from "next"
import { google } from "googleapis";
import { sendEmail } from "./email/email";

const GOOGLE_PRIVATE_KEY =
	"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDGmehJKLpd7nBA\nhi6H52unrqSpF9zdUPUu5JJSSjo10593pQBdPy6KCg1HeAb5GLvz4Xp74rQoJLOD\nB49kTZ369VgLga16yjxtk+F/uxtHqhngeZF3mF9Uvpz+j1z6tjo6mzgXvDW3J8Ya\nnKDt/W8AdIsLkj6LB1XrYJw3hoLhnh/zIvVekSZeS+vOb5iMFyE/WkEGpHSKiJIj\nhlGCGJMUwONrgNo96A6F/DTy7ZEUAjvg4FsN/F+KmaPgWSB35pjLOSvwYmfr+Non\nmfv0Cm01OueTBJz4+BUrCJNprnNlqKm/oH0qS0G075wtwoiA409BbAlqeB6S8zMN\nO5/ueShxAgMBAAECggEACTAZPWq4YgR4Hh0TEaOiwPCBAsdlRvoiCLIHhK31TtSQ\nNubb2ySDVrynr/3xHSSwO9R7cBgtL2MAyMvgjfJzD8daVBhzDhhldqiR9PDDHqPz\ng+V95cl3ZhZWMSbw5VKpQ5k3HW5+Me+xsB0dSxtXn37UyLOSqAgOKRg4a+9xtkYv\nZBblcp037xxX7qt5rFlnQNhoY0JieyEzFgdLf5Yq13cLyD5G+01qn3WCkpRsuUz+\nRPpnpgm9SF/oxQukcAYZY1jCeY0StZaGIYq5OdiuLdvjfZRM2SL0J5yqoDIK7enS\nZlNJRvv4hYT9320MFaV/yJOVXkWlKC+GOhyXfS/rgQKBgQD/TnHJ+D6VBJsNgG+3\nEvRBG/0ErrHPHDgCP+4qCLbKS50hG1SxF5r+50MpQjZBRCBR5WfQMr/bYYnKZLF8\nEYJ0L+/53aTB3yh0DO4LGdhzWHWR2QXk7b6rrQgWF2GDU2Wc5r+cs9I7tqvWRqvw\niu5p3BMLG04qv+c0ygvp6TNc8QKBgQDHJAbR40LNBIlSsktbeCtY5pAlVj3N479u\nxCW0z8VT+wYHHQbOTqdJGUYEUjJ7NUkn0+NXXzzutQGhmg8F5wd9KBFiN4IK1IDC\nN3R4nfWKNzHFoEKZjBffTevIdBNwG/4tkaXE8NGFUjp5J0fx1IYpMhYGlIaRNBK3\n6WqK84iDgQKBgHt7o4m+afaFfcEwB9iScFU1hlFHdXTo/yYHadgm0tJRdDRZFcN5\n2VvE2zUPc1Jp8v/pZybKBQXEzXJ49Wc+yMwNi5Jc451ppBVNU61G2OwhMuxR/YnW\ne8xpKmoU8PMl2RXkfXT7fImpNr+y+uKjL+E/sm5CzLHck6VyvARs6IzhAoGANp5r\n/G8/qCmhXHwobQsVoImEaakwxGK946yKxv/hmHoWGidc8YLjIQp8iLzeuapQyUq1\nZQZrGPGuY9t0WWMXS72MnwqocT39nsdE+7wfV2xyC0k8Ww7wkT+29sDXf/09htQW\nymBepxl5jjc25V4r+eqR3fYovnSw2Z58qWXIQIECgYEA9WhmsOlvOmGNTmZgifN1\n1Bbg52BmLIhJKjbksDfe9CA6jDyYqEbP2kbMMtyXAPXbdAXvJqUt67Z6JxTNEuhF\n7dHXql68psuSp2Wvmrq6pPrl0wVI6RXu6FjRDjB7wsJm+mHhtulX3ymWefAuPjsl\nQZkQ/bqYqzc+BB5URy3GnA4=\n-----END PRIVATE KEY-----\n";
const GOOGLE_SHEET_ID = "1rB0ds3xRL9_29u8DxD7DM_3egjeP5F1nDGs96-dQJTc";
const GOOGLE_CLIENT_EMAIL = "trfer-admin@trfer-388109.iam.gserviceaccount.com";

const sheets = google.sheets("v4");
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
async function getAuthToken() {
	const auth = new google.auth.GoogleAuth({
		scopes: SCOPES,
	});
	const authToken = await auth.getClient();
	return authToken;
}

export default async function handler(req: any, res: any) {
	if (req.method !== "POST") {
		return res.status(405).send({ message: "Only POST requests allowed" });
	}

	const body = req.body;
	// console.log("Sending email");

	let privKey = process.env.GOOGLE_PRIVATE_KEY;
	try {
		const auth = new google.auth.GoogleAuth({
			credentials: {
				client_email: GOOGLE_CLIENT_EMAIL,
				private_key: privKey?.replace(/\\n/g, "\n"),
			},
			scopes: [
				"https://www.googleapis.com/auth/drive",
				"https://www.googleapis.com/auth/drive.file",
				"https://www.googleapis.com/auth/spreadsheets",
			],
		});

		const sheets = google.sheets({
			auth,
			version: "v4",
		});

		var today = new Date();

		const response = await sheets.spreadsheets.values.append({
			spreadsheetId: GOOGLE_SHEET_ID,
			range: "A1:D1",
			valueInputOption: "USER_ENTERED",
			requestBody: {
				values: [["", body.email, today.toLocaleDateString()]],
			},
		});

		// res.status(400).send();
		// return;
		sendEmail(body.email);

		return res.status(200).json({
			data: response.data,
		});
	} catch (e) {
		console.log("Failed:", e);
		res.status(500).send();
		// res.status(500).send({ message: e.message ?? "Something went wrong" });
	}
}
