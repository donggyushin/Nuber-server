import { Resolvers } from "src/types/resolvers";
import { SendMessageMutationArgs, SendMessageResponse } from "src/types/graph";
import Chat from "../../../entities/Chat";
import User from "../../../entities/User";
import Message from "../../../entities/Message";


const resolvers: Resolvers = {
  Mutation: {
    SendMessage: async (_, args: SendMessageMutationArgs, context) : Promise<SendMessageResponse> => {
        const user : User = context.req.user;
        const {text, chatId} = args;
        if(!user) {
            return {
                ok:false,
                error: "You have to login",
                message: null
            }
        }

        try{
            const chat:Chat | undefined = await Chat.findOne({id: chatId});
            if(!chat){
                return {
                    ok:false,
                    error: "Not found chat",
                    message:null
                }
            }else {
                if(chat.passengerId === user.id || chat.driverId === user.id){
                    const message: Message | undefined = await Message.create({
                        text,
                        chat,
                        user
                    }).save();
                    context.pubSub.publish("NewMessage", { MessageSubscription : message});
                    return {
                        ok:true,
                        error:null,
                        message
                    }

                }else {
                    return {
                        ok:false,
                        error: "No authorized",
                        message:null
                    }
                }
            }

        }catch(error) {
            return {
                ok:false,
                error: error.message,
                message:null
            }
        }
    }
  }
};

export default resolvers;