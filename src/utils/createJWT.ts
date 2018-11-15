import jwt from "jsonwebtoken";
import SECRET from "../secretkey";


const createJWT = async (id:number):Promise<string> => {
    const token = await jwt.sign({
        id
    }, SECRET);
    return token;
}

export default createJWT;