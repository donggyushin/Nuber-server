import { withFilter } from "graphql-yoga";
import Message from "../../../entities/Message";
import User from "../../../entities/User";
import Chat from "../../../entities/Chat";


const resolvers = {
    Subscription: {
        MessageSubscription: {
            subscribe: withFilter((_, args, context) => {
                return context.pubSub.asyncIterator("NewMessage")
            },async (payload, _, context) => {
                const user: User = context.connectionContext.currentUser;
                const message : Message = payload.MessageSubscription;
                const {chatId} = message;
                const chat: Chat|undefined = await Chat.findOne({id:chatId});
                if(chat){
                    return chat.passengerId === user.id || chat.driverId === user.id;
                }else {
                    return false;
                }

            })
        }
    }
}

export default resolvers;