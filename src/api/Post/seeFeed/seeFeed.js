import { prisma } from "../../../../generated/prisma-client";

export default {
  Query : {
    seeFeed: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      //1. follwoing 한사람 찾기 
      //2. follwoing 한사람의 post 찾기

      //1.
      const following = await prisma.user({ id: user.id }).following();
      return prisma.posts({
        where: {
          user: {
            id_in: [...following.map(user => user.id), user.id]
          }
        },
        orderBy: 'createdAt_DESC'
        // orderBy: 'id_DESC'
      });
    }
  }
}