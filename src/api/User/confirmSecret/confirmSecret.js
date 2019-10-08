import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        //로그인후 User.loginSecret 초기화
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            loginSecret: ""
          }
        });
        //JWT
        return generateToken(user.id);
      } else {
        throw Error("Wrong email/secret conviation");
      }
    }
  }
};