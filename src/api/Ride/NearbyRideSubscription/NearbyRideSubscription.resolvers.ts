import { withFilter } from "graphql-yoga";
import User from "src/entities/User";
import Ride from "src/entities/Ride";

const resolvers = {
    Subscription : {
        NearbyRideSubscription: {
            subscribe: withFilter((_, __, context) => {
                const pubsub = context.pubSub;
                return pubsub.asyncIterator("rideRequest")
            }, (payload, _, context) => {
                const listener :User = context.connectionContext.currentUser;
                const ride : Ride = payload.NearbyRideSubscription;
                if(!listener) {
                    return false;
                }
                
                const listenersLastLat = listener.lastLat;
                const listenersLastLng = listener.lastLng;
                const ridesLat = ride.pickUpLat;
                const ridesLng = ride.pickUpLng;
                const LatDiff = listenersLastLat - ridesLat;
                const LngDiff = listenersLastLng - ridesLng;
                let check = false;
                if (-0.05 <=LatDiff &&
                    LatDiff <= 0.05 &&
                    -0.05 <=LngDiff &&
                    LngDiff <= 0.05    
                ){
                    check = true;
                }

                return check;
            })
        }
    }
}

export default resolvers;