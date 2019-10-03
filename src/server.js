require("dotenv").config()
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema.js";

const PORT = process.env.PORT || 4000;

/* 
//schema.js파일을 만들어 아래는 주석처리
// const typeDefs = `
//   type Query{
//       hello: String!
//   }
// `;

// const resolvers = {
//   Query: {
//     hello: () => "Hi"
//   }
// };
// const server = new GraphQLServer({ typeDefs, resolvers });
 */

//서버생성
const server = new GraphQLServer({schema});

//morgan (logger middleware 추가)
//GraphQLServer에는 express server가 내장되어 있음.
server.express.use(logger("dev"));

//start function 추가
server.start({ port: PORT }, () => 
  console.log(`✅ Server running on http://localhost:${PORT}`)
);