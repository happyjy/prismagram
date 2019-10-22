import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, message, toId } = args;
      let room;
      //  console.log(roomId);
      if (roomdId === undefined) {
        //스스로에게 message를 보내지 않기 위한 용도
        if (user.id !== to) {
          const room = await prisma.createRoom({
            participants: {
              connect: [{ id: to }, { id: user.id }]
            }
          });
        }
      } else {
        room = await prisma.room({ id: roomId });
      }

      if(!room){
        throw Error("Room not found");
      }

      // [수정 필요]아래 to의 대상이 toId뿐만 아니라 participant 되어야 한다.
      // const message = await prisma.createMessage({text: message, to:toId})
      return true;

       //room을 찾고 message를 거기에 넣는다. 
       //만약 room이 없다면 participants구성원으로 rooms을 만들고 message를 보낸다.
    }
  }
}