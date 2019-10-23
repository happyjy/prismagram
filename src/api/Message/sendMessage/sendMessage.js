import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragment";

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, message, toId } = args;
      let room;
      //  console.log("###: ", roomId);
      if (roomId === undefined) {
        //스스로에게 message를 보내지 않기 위한 용도
        if (user.id !== toId) {
          room = await prisma.createRoom({
            participants: {
              connect: [{ id: toId }, { id: user.id }]
            }
          }).$fragment(ROOM_FRAGMENT);
        }
      } else {
        room = await prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT);
      }

      console.log(room)
      const getTo = room.participants.filter(
        participant => participant.id !== user.id
      )[0];

      if(!room){
        throw Error("Room not found");
      }

      return prisma.createMessage({
        text: message,
        from: {
          connect: { id: user.id }
        },
        to: {
          connect: {
            id: roomId ? getTo.id : toId
          }
        },
        room: {
          connect: {
            id: room.id
          }
        }
      });
      
       //room을 찾고 message를 거기에 넣는다. 
       //만약 room이 없다면 participants구성원으로 rooms을 만들고 message를 보낸다.
    }
  }
}