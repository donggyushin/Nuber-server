
import { Resolvers } from "src/types/resolvers";
import { FacebookConnectMutationArgs, FacebookConnectResponse } from "src/types/graph";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";


const resolvers: Resolvers = {
  Mutation: {
    FacebookConnect : async (_,args:FacebookConnectMutationArgs):Promise<FacebookConnectResponse> => {
        const {fbId} = args;
        try{
            //인자로 전달받은 fbId 를 가지고 있는 유저 객체가 존재한다면
            //바로 token 반환
            const existingUser = await User.findOne({fbId});
            
            if(existingUser){
                const token = createJWT(existingUser.id);
                return {
                    ok:true,
                    error: null,
                    token
                }
            }
        }catch(error) {
            //도중에 에러가 발생할 시
            return {
                ok:false,
                error: error.message,
                token: null
            }
        }
        try{
            //해당 fbId 를 가진 유저가 존재하지 않는다면
            //새로운 유저를 생성해주고 token 반환
            const newUser = await User.create({
              ...args,
              //facebook Id로 프로필 사진 가져오는 api(facebook 자체 제공)
              profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square`
            }).save();
            const token = createJWT(newUser.id);
            return {
                ok:true,
                error: null,
                token
            }
        }catch(error) {
            return {
                ok:false,
                error:error.message,
                token:null
            }
        }
    }
  }
};

export default resolvers;