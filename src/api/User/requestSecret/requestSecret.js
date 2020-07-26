import { generateSecret, sendSecretMail } from '../../../utils';
import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		requestSecret: async (_, args, { request }) => {
			// console.log('#requestSecret > request.user: ', request.user);
			// console.log('#requestSecret > request: ', request);
			const { email } = args;
			const loginSecret = generateSecret();
			// console.log("### requestSecret: ",loginSecret);
			try {
				// throw Error();
				await sendSecretMail(email, loginSecret);
				await prisma.updateUser({ data: { loginSecret }, where: { email } });
				return true;
			} catch (error) {
				console.log(error);
				return false;
			}
		}
	}
};
