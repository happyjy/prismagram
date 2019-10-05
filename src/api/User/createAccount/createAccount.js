import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args, { request }) => {
      // console.log("### prisma: ", prisma);
      // promise 객체라는 것을 확인할 수 있다.: [Symbol(Symbol.toStringTag)]: 'Promise' },
      const { username, email, firstName = "", lastName = "", bio = "" } = args;
      const user = await prisma.createUser({
        username,
        email,
        firstName,
        lastName,
        bio
      });
      return user;
    }
  }
}