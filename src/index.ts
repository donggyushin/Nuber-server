import dotenv from "dotenv";
dotenv.config();
import {Options} from "graphql-yoga";
import app from "./app";
import {createConnection} from "typeorm";
import defaultConnectOptions from "./ormConfig";
import decodeJWT from "./utils/decodeJWT";


const PORT : number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT : string = '/playground';
const GRAPHQL_ENDPOINT : string = "/graphql";
const SUBSCRIPTION_ENDPOINT : string = "/subscription";


const appOptions : Options = {
    port:PORT,
    playground: PLAYGROUND_ENDPOINT,
    endpoint: GRAPHQL_ENDPOINT,
    subscriptions: {
        path: SUBSCRIPTION_ENDPOINT,
        onConnect: async (connectionParams) => {    //Socket이 연결될때, 즉, subscription이 시작될 때
                                                   //이곳에서 몇가지 커스터마이즈를 할 수 있다. 
            
            const token = connectionParams['X-JWT'];
            const user = await decodeJWT(token);
            
            if(user) {
                return {
                    currentUser: user
                }
            }else {
                return {
                    currentUser: null
                }
            }
        }
    }
}

const handleAppStart = () => console.log(`listening on port ${PORT}`);
createConnection(defaultConnectOptions).then(() => {
    app.start(appOptions, handleAppStart);
})
