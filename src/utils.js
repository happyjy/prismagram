// import dotenv from "dotenv";
// import path from "path";
// dotenv.config({ path: path.resolve(__dirname, ".env") });

import { adjectives, nouns } from './words';
import nodeMailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';
import jwt from 'jsonwebtoken';

export const generateSecret = () => {
	const randomNumber = Math.floor(Math.random() * adjectives.length);
	return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = (email) => {
	const options = {
		auth: {
			api_user: process.env.SENDGRID_USERNAME,
			api_key: process.env.SENDGRID_PASSWORD
		}
	};
	const client = nodeMailer.createTransport(sgTransport(options));
	return client.sendMail(email); //promise 함수
};

export const sendSecretMail = (address, secret) => {
	const email = {
		from: 'jyoon@prismagram.com',
		to: address,
		subject: '🔐Login Secret for Prismagram🔐',
		html: `Hello! Your login secret is <strong>${secret}</strong>. <br/>Copy paste on the app/website to log in`
	};
	return sendMail(email);
};

/**
 * jwt.sign이 JWT_SECRET 단어를 가지고 암호화
 * @param {*} id 
 */
export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
