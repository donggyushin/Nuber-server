import { Resolvers } from "src/types/resolvers";
import User from "../../../entities/User";
import { ToggleDrivingModeResponse } from "src/types/graph";

const resolvers:Resolvers = {
  Mutation: {
    ToggleDrivingMode: async (_, __, context) : Promise<ToggleDrivingModeResponse> => {
        const user :User = context.req.user;
        if(!user) {
            return {
                ok:false,
                error:"You have to login"
            }
        }

        try{
            user.isDriving = !user.isDriving;
            await user.save();
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
};

export default resolvers;