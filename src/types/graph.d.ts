export const typeDefs = ["type Greeting {\n  error: Boolean!\n  text: String!\n}\n\ntype Query {\n  sayHello(name: String!): Greeting!\n}\n"];
/* tslint:disable */

export interface Query {
  sayHello: Greeting;
}

export interface SayHelloQueryArgs {
  name: string;
}

export interface Greeting {
  error: boolean;
  text: string;
}
