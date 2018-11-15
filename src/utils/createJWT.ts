import jwt from "jsonwebtoken";
import SECRET from "../secretkey";


const createJWT =  (id:number) => {
    const token =  jwt.sign({
        id
    }, SECRET);
    return token;
}

export default createJWT;