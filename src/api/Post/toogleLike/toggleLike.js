import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    toggleLike: async(_, args, { request }) => {
      isAuthenticated(request);
      const { postId } = args; // args: graphql에서 넘어온 인자
      const { user } = request;
      
      try{
        const existingLike = await prisma.$exists.like({
          AND: [
            {
              user: {
                id: user.id
              }
            },
            {
              post: {
                id: postId
              }
            }
          ]
        });
        if(existingLike){
          //TODO like있을때 지우기
        } else {
          await prisma.createLike({
            user: {
              connect: {
                id: user.id
              }
            },
            post: {
              connect: {
                id: postId
              }
            }   
          });
        }
        return true; 
      } catch {
        return false;
      }
    }
  }
};