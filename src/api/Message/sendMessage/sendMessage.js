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

      // console.log(room)
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
      
      // 1. toId유무로 누구에게 보낼건지 판단
      //   1. toId가 있다면 그 사람에게 보내야한다.
      //   2. toId가 없다면 채팅방에 속해있는 인원에게 보내야한다. 
      //   여기서 ROOM_FRAGMENT를 만들어 줌
      // 2. filter조건, filter return에 [0]
      // 인스타 그램 dm은 1:1 채팅이기 때문에 getTo보면 filter로 participant가 내가 아닌 것을 조건으로 걸었다.
      // 그럼 결과적으로 두명 채팅방에서 내가 빠지면 상대방이 남아 첫번째 요소를 가지고 오는 [0] 값을 붙였다.
    }
  }
}