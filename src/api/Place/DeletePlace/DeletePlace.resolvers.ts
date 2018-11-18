import { Resolvers } from "src/types/resolvers";
import { DeletePlaceMutationArgs, DeletePlaceResponse } from "src/types/graph";
import User from "../../../entities/User";
import Place from "../../../entities/Place";

const resolvers : Resolvers = {
    Mutation : {
        DeletePlace: async (_, args:DeletePlaceMutationArgs, context): Promise<DeletePlaceResponse> => {
            const user :User = context.req.user;
            const {placeId} = args;
            var check = false;
            if(!user) {
                return {
                    ok:false,
                    error:"You have you login"
                }
            }

            const placeToDelete = await Place.findOne({id: placeId});
            if(!placeToDelete){
                return {
                    ok:false,
                    error:"Place not found"
                }
            }else {
                check = user.id === placeToDelete.userId ? true : false;
                if(check){
                    await placeToDelete.remove();
                    return {
                        ok:true,
                        error:null
                    }
                }else {
                    return {
                        ok:false,
                        error:"Not authorized"
                    }
                }   
            }
        }
    }
}


export default resolvers;