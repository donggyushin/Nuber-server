import { Resolvers } from "src/types/resolvers";
import { GetMyProfileResponse } from "src/types/graph";

const resolvers:Resolvers = {
  Query: {
    GetMyProfile: async (_, __, context):Promise<GetMyProfileResponse> => {
      const {user} = context.req;
      if(!user) {
        return {
          ok:false,
          error: "No JWT. I refuse to proceed",
          user: null
        }
      }
      return {
        ok:true,
        error:null,
        user
      }
    }
  }
};

export default resolvers;