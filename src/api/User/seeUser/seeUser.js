// import { prisma } from "../../../../generated/prisma-client";

// export default {
//   Query: {
//     seeUser: async (_, args) => {
//       const { id } = args;
//       return prisma.user({ id });
//     }
//   }
// };


import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUser: async(_, args) => {
      const { id } = args;
      const user = await prisma.user({ id });
      const posts = await prisma.user({ id }).posts();
      console.log("###seeUser", {id, user, posts})
      // return user;
      return {
        user, 
        posts
      };
    }
  }
};