import { prisma } from "../../../../generated/prisma-client";

const DELETE = "DELETE";
const EDIT = "EDIT";

export default{
  Mutation: {
    editPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, caption, location, actions } = args;
      const { user } = request;
      const post = await prisma.$exists.post({ id, user: { id: user.id } });
      if (post) {
        if (actions === EDIT) {
          return prisma.updatePost({
            data: {
              caption,
              location
            },
            where: {
              id
            }
          });
        } else if (actions === DELETE) {
          return prisma.deletePost({id});
        }
      } else {
        throw Error("You can't do that");
      }
    }
  }
}