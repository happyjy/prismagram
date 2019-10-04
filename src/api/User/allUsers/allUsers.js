// import { prisma } from "../../../../generated/prisma-client";

// export default {
//   Query: {
//     allUsers: async () => {
//       console.log(await prisma.users());
//       return "HELLO";
//     }
//   }
// };

import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    allUsers: async () => {
      return await prisma.users();
    }
  }
};