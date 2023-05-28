const nodemailer = require("nodemailer");
const fs = require("fs");
const GMAIL_USERNAME = "team@usual.ltd";
const GMAIL_PASSWORD = "fbpizupqwbshvgcb";
var handlebars = require("handlebars");

import SignupResponseHtml from "./signup_response.html";

var readHTMLFile = function (
	path: string,
	callback: (err: any, html: any) => void
) {
	fs.readFile(path, { encoding: "utf-8" }, function (err: any, html: any) {
		if (err) {
			callback(err, null);
		} else {
			callback(null, html);
		}
	});
};

export const sendEmail = async () => {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: GMAIL_USERNAME,
			pass: GMAIL_PASSWORD,
		},
	});

	var template = handlebars.compile(SignupResponseHtml);
	let replacements = {
		otp: "123456",
	};
	let htmlToSend = template(replacements);

	const mail_configs = {
		from: "John Yeo <" + GMAIL_USERNAME + ">",
		to: "johnyeocx@gmail.com",
		subject: "Testing",
		html: htmlToSend,
	};

	console.log("Sending email");
	await transporter.sendMail(mail_configs);
	console.log("Sent!");
};
