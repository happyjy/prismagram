import { prisma } from "../../../generated/prisma-client";

export default {
  //prisma가 먼저 datamodel.prisma 에서 schema를 검색하며 필드를 찾느데 없다면 
  //이곳으로 와서 feild를 lookup 할 것이다.
  User: {
    fullName: parent => {
      console.log("### fullName", parent);
      return `${parent.firstName} ${parent.lastName}`;
    },
    // fullName: (parent, __, { request }) => {
    //   console.log("### parent: ", parent);
    //   return "lalalal";
    // }
    
    //UserProfile을 요청한 사람이 팔로잉 했는가를 확인
    //* parent: UserProfile를 선택
    //* request: 로그인한 유저
    isFollowing: async (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      console.log("### isFollowing: ", { user, parent })
      try {
        return prisma.$exists.user({
          AND: [
            {
              id: user.id
            },
            {
              following_some: {
                id: parentId
              }
            }
          ]
        });
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    isSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    }
  }
};