import User from "../entities/User";
import jwt from "jsonwebtoken";
const decodeJWT = async (token:string) : Promise<User | undefined> => {
    try{
        const decoded : any = jwt.verify(token, process.env.JWT_SECRETKEY || "");
        const {id} = decoded;
        const user = await User.findOne(id);
        return user;

    }catch(error) {
        return undefined;
    }
    
    
}

export default decodeJWT;