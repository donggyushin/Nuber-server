import { Resolvers } from "src/types/resolvers";
import { CompleteEmailVerificationMutationArgs, CompleteEmailVerificationResponse } from "src/types/graph";
import Verification from "../../../entities/Verification";

const resolvers : Resolvers = {
  Mutation: {
    CompleteEmailVerification: async (_, args:CompleteEmailVerificationMutationArgs, context): Promise<CompleteEmailVerificationResponse> => {
        const {user} = context.req;
        const {key} = args;
        if(!user) {
            return {
                ok:false,
                error:"You have to login"
            }
        }

        try{
            if(user.email){
                const checkedVerification = await Verification.findOne({
                    payload:user.email,
                    key
                })

                if(checkedVerification){
                    return {
                        ok:true,
                        error:null
                    }
                }else {
                    return {
                        ok:false,
                        error:"Key is not valid"
                    }
                }

            }else{
                return {
                    ok:false,
                    error:"You have to email to verify"
                }
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