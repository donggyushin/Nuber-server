import { Greeting, SayHelloQueryArgs } from "src/types/graph";

const resolvers = {
    Query: {
        sayHello: (_, args: SayHelloQueryArgs) :Greeting => {
            return {
                error: false,
                text: `Hello ${args.name}`
            }
        }
    }
}

export default resolvers