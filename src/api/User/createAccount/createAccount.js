import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		createAccount: async (_, args, { request }) => {
			// console.log("### prisma: ", prisma);
			// promise 객체라는 것을 확인할 수 있다.: [Symbol(Symbol.toStringTag)]: 'Promise' },
			const { username, email, firstName = '', lastName = '', bio = '' } = args;
			const exists = await prisma.$exists.user({ username });

			console.log('### createAccount.js > username : ', username);
			console.log('### createAccount.js > exists: ', exists);
			if (exists) {
				throw Error('This username/email is already token');
				return;
			}
			await prisma.createUser({
				username,
				email,
				firstName,
				lastName,
				bio
			});
			return true;
		}
	}
};
