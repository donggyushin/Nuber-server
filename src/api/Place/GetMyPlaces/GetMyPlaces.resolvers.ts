import { Resolvers } from "src/types/resolvers";
import { GetMyPlacesResponse } from "src/types/graph";
import User from "../../../entities/User";

const resolvers : Resolvers = {
    Query: {
        GetMyPlaces: async (_, __, context) : Promise<GetMyPlacesResponse> => {
            
            
            try{

                const user = await User.findOne({ id: context.req.user.id }, {relations:["places"]});
                if (!user) {
                    return {
                        ok: false,
                        error: "You have to login",
                        places: null
                    }
                }

                
                
                return {
                    ok:true,
                    error:null,
                    places: user.places
                }
                

            }catch(error) {
                return {
                    ok:false,
                    error:error.message,
                    places:null
                }
            }
        }
    }
}

export default resolvers;