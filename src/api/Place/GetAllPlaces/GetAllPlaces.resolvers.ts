import { Resolvers } from "src/types/resolvers";
import { GetAllPlacesResponse } from "src/types/graph";
import Place from "../../../entities/Place";

const resolvers: Resolvers = {
    Query: {
        GetAllPlaces: async (_,args, context): Promise<GetAllPlacesResponse> => {
            const places = Place.find();
            
            console.log(places);
            return {
                ok:true,
                error:null,
                places:null
            }
        }
    }
}

export default resolvers;