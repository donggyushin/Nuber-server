import { Resolvers } from "src/types/resolvers";
import { UpdateRideStatusResponse, UpdateRideStatusMutationArgs } from "src/types/graph";
import User from "../../../entities/User";
import Ride from "../../../entities/Ride";

const resolvers :Resolvers = {
    Mutation : {
        UpdateRideStatus: async (_, args:UpdateRideStatusMutationArgs, context) : Promise<UpdateRideStatusResponse> => {
            const user:User = context.req.user;
            const {rideId, status} = args;
            
            if(!user) {
                return {
                    ok:false,
                    error: "You have to login"
                }
            }

            if(!user.isDriving){
                return {
                    ok:false,
                    error:"You are not a driver"
                }
            }

            try{
                let ride : Ride | undefined;
                if(status === "ACCEPTED"){
                    ride = await Ride.findOne({ id: rideId, status:"REQUESTING" });
                    if(ride){
                        ride.driver = user;
                        user.isTaken = true;
                        user.save();
                    }
                }else {
                    ride = await Ride.findOne({id: rideId, driver:user});
                }

                
                if(!ride){
                    return {
                        ok:false,
                        error:"Can't update ride status"
                    }
                }

                ride.status = status;
                await ride.save();
                return {
                    ok:true,
                    error:null
                }

            }catch(error) {
                return {
                    ok:false,
                    error: error.message
                }
            }

            
        }
    }
}

export default resolvers;