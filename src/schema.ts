
import {makeExecutableSchema} from "graphql-tools";
import path from "path";
import {fileLoader, mergeResolvers, mergeTypes} from "merge-graphql-schemas";

const allTypes = fileLoader(
    path.join(__dirname, "./api/**/*.graphql")
    //api폴더 내부에 있는 모든 *.graphql 형식의 파일들을 모아준다. 
)

const allResolvers = fileLoader(
    path.join(__dirname, "./api/**/*.resolvers.*")
    //api폴더 내부에 있는 모든 *.resolvers.* 형식의 파일들을 모아준다. 
)

//모아준 타입들을 mergeTypes 메서드로 합쳐준다. 
const mergedTypes = mergeTypes(allTypes);
//모아준 resolvers 들을 mergeResolvers 메서드로 합쳐준다. 
const mergedResolvers = mergeResolvers(allResolvers);


//통합 스키마 생성. 
const schema = makeExecutableSchema({
    typeDefs:mergedTypes,
    resolvers:mergedResolvers
})

export default schema;