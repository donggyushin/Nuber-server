import { Resolvers } from "src/types/resolvers";
import { AddPlaceResponse, AddPlaceMutationArgs } from "src/types/graph";
import User from "../../../entities/User";
import Place from "../../../entities/Place";

const resolvers :Resolvers= {
    Mutation: {
        AddPlace : async (_, args:AddPlaceMutationArgs, context) : Promise<AddPlaceResponse> => {
            const user :User = context.req.user;
            if(!user) {
                return {
                    ok:false,
                    error:"You have to login"
                }
            }

            try{
                await Place.create({...args, user}).save();
                return {
                    ok:true,
                    error:null
                }
            }catch(error) {
                return {
                    ok:false,
                    error:error.message
                }
            }
        }
    }
}

export default resolvers;