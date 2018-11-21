import { withFilter } from "graphql-yoga";
import User from "src/entities/User";
import Ride from "src/entities/Ride";

const resolvers = {
  Subscription: {
    RideStatusSubscription:{
        subscribe: withFilter((_, args, context) => {
            const pubsub = context.pubSub;
            return pubsub.asyncIterator("rideUpdate")
        }, (payload, _, context) => {
            const user: User = context.connectionContext.currentUser;
            const ride: Ride = payload.RideStatusSubscription;
            
            const driver : User = ride.driver;
            const passenger: User = ride.passenger;
            
            return (
                user.id === driver.id || user.id === passenger.id
            )
        })
    }
  }
};

export default resolvers;