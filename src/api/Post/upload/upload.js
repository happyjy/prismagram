import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    upload: async(_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { caption, files } = args;
      //file 없이 post 만들기
      const post = await prisma.createPost({
        caption,
        user: {
          connect: {
            id: user.id
          }
        }
      });

      //mutation에서 받은 files, 위에서 post 저장했을때 생성한 id 사용
      files.forEach( async file => 
        await prisma.createFile({
          url:file,
          post: {
            connect: {
              id: post.id
            }
          }
        })
      );

      return post;
    }
  }
}