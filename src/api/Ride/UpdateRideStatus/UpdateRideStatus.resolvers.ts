import { Resolvers } from "src/types/resolvers";
import { UpdateRideStatusResponse, UpdateRideStatusMutationArgs } from "src/types/graph";
import User from "../../../entities/User";
import Ride from "../../../entities/Ride";
import Chat from "../../../entities/Chat";

const resolvers :Resolvers = {
    Mutation : {
        UpdateRideStatus: async (_, args:UpdateRideStatusMutationArgs, context) : Promise<UpdateRideStatusResponse> => {
            const user:User = context.req.user;
            const {rideId, status} = args;
            const pubsub = context.pubSub;
            
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
                    ride = await Ride.findOne({ id: rideId, status:"REQUESTING" }, {relations: ["passenger"]});
                    if(ride){
                        ride.driver = user;
                        user.isTaken = true;
                        user.save();
                        const chat = await Chat.create({
                            driver: user,
                            passenger: ride.passenger
                        }).save();
                        ride.chat = chat;
                        ride.save();
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
                const updatedRide = await Ride.findOne({ id: rideId }, { relations: ["driver", "passenger"] });
                pubsub.publish("rideUpdate", {RideStatusSubscription: updatedRide});
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