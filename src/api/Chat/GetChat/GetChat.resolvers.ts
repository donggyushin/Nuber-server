import { Resolvers } from "src/types/resolvers";
import { GetChatQueryArgs, GetChatResponse } from "src/types/graph";
import Chat from "../../../entities/Chat";
import User from "../../../entities/User";

const resolvers : Resolvers = {
    Query: {
        GetChat: async (_, args: GetChatQueryArgs, context) : Promise<GetChatResponse> => {
            const user : User = context.req.user;
            const {chatId} = args;
            if(!user) {
                return {
                    ok:false,
                    error: "You have to login",
                    chat: null
                }
            }


            try{
                const chat : Chat | undefined = await Chat.findOne({id:chatId}, {relations: ["messages"]});
                if(chat){
                    if(chat.passengerId === user.id || chat.driverId === user.id){
                        return {
                            ok:true,
                            error: null,
                            chat
                        }
                    }else {
                        return {
                            ok:false,
                            error: "Not authorized to see this chat",
                            chat: null
                        }
                    }
                }else {
                    return {
                        ok:false,
                        error: "There is no chat",
                        chat:null
                    }
                }
                
            }catch(error) {
                return {
                    ok:false,
                    error: error.message,
                    chat:null
                }
            }
        }
    }
}

export default resolvers;