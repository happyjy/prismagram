import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    sayHello: async () => {
      // console.log("hello")
      console.log(await prisma.user());
      return "HELLO"
    }
  }
};