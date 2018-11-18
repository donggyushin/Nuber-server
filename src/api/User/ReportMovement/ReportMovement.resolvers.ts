import { Resolvers } from "src/types/resolvers";
import { ReportMovementMutationArgs, ReportMovementResponse } from "src/types/graph";
import User from "../../../entities/User";

const resolvers :Resolvers = {
  Mutation: {
    ReportMovement: async (_, args:ReportMovementMutationArgs, context): Promise<ReportMovementResponse> => {
        const user:User = context.req.user;
        const {lng, lat, orientation} = args;
        const valuesToUpdate = {};
        const pubSub = context.pubSub;  //이번에 새로 추가한 부분
        if(lng){
            valuesToUpdate["lastLng"] = lng
        }
        if(lat) {
            valuesToUpdate["lastLat"] = lat;
        }
        if(orientation){
            valuesToUpdate["lastOrientation"] = orientation;
        }
        if(!user) {
            return {
                ok:false,
                error:"You have to login"
            }
        }

        try{

            await User.update({id:user.id}, valuesToUpdate);
            pubSub.publish("driverUpdate", { DriversSubscription: user });    //이번에 새로 추가한 부분
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