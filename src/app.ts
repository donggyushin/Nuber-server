import {GraphQLServer} from "graphql-yoga";
import cors from "cors";
import logger from "morgan";
import helmet from "helmet";
import schema from "./schema";
import decodeJWT from "./utils/decodeJWT";


class App{
    public app:GraphQLServer;
    constructor(){
        this.app = new GraphQLServer({
            schema
        })
        this.middlewares();
    }
    private middlewares = ():void => {
        this.app.express.use(cors());
        this.app.express.use(logger("dev"));
        this.app.express.use(helmet());
        this.app.express.use(this.jwt);
    }

    private jwt = async (req, res, next) => {
        const token = req.get("X-JWT");
        if(token) {
            const user = await decodeJWT(token);
            console.log(user);
        }
        next();
    }
}

export default new App().app;