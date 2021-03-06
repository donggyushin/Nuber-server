import { Resolvers } from "src/types/resolvers";
import { RequestEmailVerificationResonse } from "src/types/graph";
import Verification from "../../../entities/Verification";
import { sendVerificationEmail } from "../../../utils/sendEmail";
import User from "../../../entities/User";



const resolvers:Resolvers = {
  Mutation: {
    RequestEmailVerification: async (_,args,context):Promise<RequestEmailVerificationResonse> => {
        
        const user:User = context.req.user;
        
        if(!user){
            return {
                ok:false,
                error:"You have to login"
            }
        }
        try{


            if(!user.email){
                return {
                    ok:false,
                    error: "You have no Email to verify"
                }
            }else{
                if(user.verifiedEmail){
                    return {
                        ok:true,
                        error:"You are already verified"
                    }
                }
                const existingEmailVerification = await Verification.findOne({
                    payload: user.email
                })

                if (existingEmailVerification) {
                    existingEmailVerification.remove()
                }

                const newEmailVerification = await Verification.create({
                    payload: user.email,
                    target: "EMAIL"
                }).save();

                await sendVerificationEmail("donggyu9410@gmail.com", newEmailVerification.key, user.fullName);

                return {
                    ok: true,
                    error: null
                }
            }

            

        }catch(error) {
            return {
                ok:false,
                error: error.message
            }
        }
    }
  }
};

export default resolvers;