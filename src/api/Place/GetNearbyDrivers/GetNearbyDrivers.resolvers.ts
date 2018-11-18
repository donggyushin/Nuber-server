import { Resolvers } from "src/types/resolvers";
import User from "../../../entities/User";
import { GetNearbyDriversResponse } from "src/types/graph";
import { getRepository, Between } from "typeorm";


const resolvers : Resolvers = {
    Query: {
        GetNearbyDrivers:async (_, __, context) : Promise<GetNearbyDriversResponse> => {
            const user : User =  context.req.user;
            if(!user) {
                return {
                    ok:false,
                    error:"You have to login",
                    drivers:null
                }
            }


            try{

                const drivers = await getRepository(User).find({
                    isDriving: true,
                    lastLat: Between(user.lastLat - 0.05, user.lastLat + 0.05),
                    lastLng: Between(user.lastLng - 0.05, user.lastLng + 0.05)
                })
                return {
                    ok:true,
                    error:null,
                    drivers
                }

            }catch(error) {
                return {
                    ok:false,
                    error:error.message,
                    drivers:null
                }
            }
        }
    }
}

export default resolvers;