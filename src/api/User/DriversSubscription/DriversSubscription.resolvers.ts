const resolvers = {
  Subscription: {
    DriversSubscription: {
        subscribe: (_, __, context) => {
            const pubSub = context.pubSub;
            //driverUpdate라는 채널의 변화를 관찰
            return pubSub.asyncIterator("driverUpdate")
        }
    }
  }
};

export default resolvers;