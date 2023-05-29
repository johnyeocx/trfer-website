const nodemailer = require("nodemailer");
const fs = require("fs");

// const GMAIL_USERNAME = "team@usual.ltd";
// const GMAIL_PASSWORD = "fbpizupqwbshvgcb";
const GMAIL_USERNAME = "team@trfer.me";
const GMAIL_PASSWORD = "rituicweasahorly";

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

export const sendEmail = async (email: string) => {
	let fromEmail = process.env.GMAIL_USERNAME;
	let password = process.env.GMAIL_PASSWORD;
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: fromEmail,
			pass: password,
		},
	});

	var template = handlebars.compile(SignupResponseHtml);
	let replacements = {
		otp: "123456",
	};
	let htmlToSend = template(replacements);

	const mail_configs = {
		from: "John from trfer.me <" + fromEmail + ">",
		to: email,
		subject: "Access to beta version of trfer.me",
		html: htmlToSend,
	};

	await transporter.sendMail(mail_configs);
	console.log("Sent email!");
};
