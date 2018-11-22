import { Resolvers } from "src/types/resolvers";
import { GetRideQueryArgs, GetRideResponse } from "src/types/graph";
import Ride from "../../../entities/Ride";
import User from "../../../entities/User";

const resolvers : Resolvers = {
    Query: {
        GetRide: async (_, args:GetRideQueryArgs, context) : Promise<GetRideResponse> => {
            const user:User = context.req.user;
            const {rideId} = args;
            
            if(!user) {
                return {
                    ok:false,
                    error: "You have to login",
                    ride: null
                }
            }

            try{
                const ride : Ride | undefined = await Ride.findOne({id:rideId}, {relations: ["passenger", "driver", "chat"]});
                if(ride){
                    
                    if(ride.passenger.id === user.id || ride.driver.id === user.id){
                        return {
                            ok:true,
                            error: null,
                            ride
                        }
                    }else {
                        return {
                            ok:false,
                            error: "Not Authorized",
                            ride:null
                        }
                    }
                    
                }else {
                    return {
                        ok:false,
                        error:"ride not found",
                        ride:null
                    }
                }
            }catch(error) {
                return {
                    ok:false,
                    error: error.message,
                    ride:null
                }
            }
        }
    }
}

export default resolvers;