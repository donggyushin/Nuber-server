import { Greeting } from "src/types/graph";

const resolvers = {
    Query: {
        sayHello: () :Greeting => {
            return {
                error: false,
                text: "i love u"
            }
        }
    }
}

export default resolvers