import {ConnectionOptions} from "typeorm";

const defaultConnectOptions :ConnectionOptions = {
    type: "postgres",
    database: "nuber",
    synchronize: true,
    logging: true,
    entities: [
        "entities/**/*.*"
    ],
    host: process.env.DB_ENDPOINT || "localhost",
    port: 5432,
    username: process.env.DB_USERNAME || "rontend",
    password: process.env.DB_PASSWORD || ""
}

export default defaultConnectOptions;