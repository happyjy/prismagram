import { USER_FRAGMENT } from "../../../fragment";
import { prisma } from "../../../../generated/prisma-client";


export default {
  Query: {
  me: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
    const { user } = request;
    const userProfile = prisma.user({ id: user.id });
    const posts = prisma.user({ id: user.id }).posts();
    console.log({userProfile, posts})
    return {
        user: userProfile,
        posts
      }
    }
  }
}


  // export default {
  //   Query: {
  //     me: (_, __, { request, isAuthenticated }) => {
  //       isAuthenticated(request);
  //       const { user } = request;
  //       return prisma.user({ id: user.id }).$fragment(USER_FRAGMENT);
  //     }
  //   }
  // }