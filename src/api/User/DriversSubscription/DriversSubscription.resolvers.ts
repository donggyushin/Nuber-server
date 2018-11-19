import { withFilter } from "graphql-yoga";

const resolvers = {
  Subscription: {
    DriversSubscription: {
        subscribe: withFilter(
          (_, __, context) => {
            const pubSub = context.pubSub;
            //driverUpdate라는 채널의 변화를 관찰
            return pubSub.asyncIterator("driverUpdate")
          },
          (payload, _, context) => {
            //console.log(`This is coming from the ReportMovement Resolver ${payload}`)
            //payload에는 ReportMovement Resolver에서 반환한 값인 방금 이동을 한 Driver 객체가 담겨있다. 
            //console.log(`Listening ${context}`)
            //context에는 현재 WebSocket을 리스닝하고 있는 유저객체가 담겨있다. 

            const listener = context.connectionContext.currentUser;
            const driver = payload.DriversSubscription;
            if(!listener){
              return false
            }

            const listenersLastLat = listener.lastLat;
            const listenersLastLng = listener.lastLng;
            const driversLastLat = driver.lastLat;
            const driversLastLng = driver.lastLng;
            const latDiff = listenersLastLat - driversLastLat;
            const lngDiff = listenersLastLng - driversLastLng;
            
            return (-0.05 <= latDiff && latDiff <= 0.05 && -0.05 <= lngDiff && lngDiff <= 0.05);

          }
        )
    }
  }
};

export default resolvers;