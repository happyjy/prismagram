import path from "path";
import { makeExecutableSchema } from "graphql-tools"; 
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";


//api폴더 및에 모든 폴더 및의 모든 graphql, js파일을 받아와 
//아래 makeExecutableSchema function을 통해서 schema를 만들어 합친다.
//server.js에서 imoprt해서 사용하면 되겠다.
const allTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql"));
const allResolvers = fileLoader(path.join(__dirname, "/api/**/*.js"));

const schema = makeExecutableSchema({
  typeDefs: mergeTypes(allTypes),
  resolvers: mergeResolvers(allResolvers)
})

export default schema;