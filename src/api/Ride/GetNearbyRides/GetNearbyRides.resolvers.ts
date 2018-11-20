import { Resolvers } from "src/types/resolvers";
import { GetNearbyRidesResponse } from "src/types/graph";
import User from "../../../entities/User";
import Ride from "../../../entities/Ride";
import { getRepository, Between } from "typeorm";

const resolvers : Resolvers = {
    Query: {
        GetNearbyRides: async (_, __, context) : Promise<GetNearbyRidesResponse> => {
            const user : User = context.req.user;
            if(!user) {
                return {
                    ok:false,
                    error:"You have to login",
                    rides: null
                }
            }

            if(!user.isDriving){
                return {
                    ok:false,
                    error: "You are not driver",
                    rides: null
                }
            }
            const {lastLat, lastLng} = user;

            try{
                const rides = await getRepository(Ride).find({
                    status:"REQUESTING",
                    pickUpLat: Between(lastLat - 0.05, lastLat + 0.05),
                    pickUpLng: Between(lastLng - 0.05, lastLng + 0.05)
                })

                return {
                    ok:true,
                    error: null,
                    rides
                }
            }catch(error) {
                return {
                    ok:false,
                    error: error.message,
                    rides:null
                }
            }
        }
    }
}

export default resolvers;