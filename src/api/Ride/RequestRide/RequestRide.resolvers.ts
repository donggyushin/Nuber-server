import { Resolvers } from "src/types/resolvers";
import { RequestRideMutationArgs, RequestRideResponse } from "src/types/graph";
import Ride from "../../../entities/Ride";

const resolvers :Resolvers = {
    Mutation: {
        RequestRide: async (_, args: RequestRideMutationArgs, context): Promise<RequestRideResponse> => {
            const user = context.req.user;
            const pubsub = context.pubSub;
            if(!user) {
                return {
                    ok:false,
                    error:"You have to login",
                    ride: null
                }
            }
            try{
                const ride: Ride = await Ride.create({ ...args, passenger: user }).save();
                pubsub.publish("rideRequest", {NearbyRideSubscription : ride});
                return {
                    ok:true,
                    error: null,
                    ride
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