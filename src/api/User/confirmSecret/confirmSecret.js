import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      const user = await prisma.user({ email });
      console.log("### check loginSecret, seceret: ",user, secret )
      console.log("### user.loginSecret === secret: ",user.loginSecret === secret)
      if (user.loginSecret === secret) {
        // console.log("### generateToken(user.id): ", generateToken(user.id))
        // new Error();

        //로그인후 User.loginSecret 초기화
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            loginSecret: ""
          }
        });

        //generate Token(JWT)
        return generateToken(user.id);
      } else {
        throw Error("Wrong email/secret conviation");
      }
    }
  }
};