import { USER_FRAGMENT } from "../../../fragment";
import { prisma } from "../../../../generated/prisma-client";


export default {
  Query: {
    me: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const userProfile = prisma.user({ id: user.id });
      const posts = prisma.user({ id: user.id }).posts();
      // console.log({userProfile, posts})
      return {
        user: userProfile,
        posts
      };
    }
  },
  //prisma가 먼저 datamodel.prisma 에서 schema를 검색하며 필드를 찾느데 없다면 
  //이곳으로 와서 query를 lookup 할 것이다.
  User: {
    fullName: parent => {
      console.log("### fullName", parent);
      return `${parent.firstName} ${parent.lastName}`;
    }
    // fullName: (parent, __, { request }) => {
    //   console.log("### parent: ", parent);
    //   return "lalalal";
    // }
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