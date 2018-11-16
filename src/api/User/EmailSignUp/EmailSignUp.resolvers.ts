import { Resolvers } from "src/types/resolvers";
import { EmailSignUpResponse, EmailSignUpMutationArgs } from "src/types/graph";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";
import Verification from "../../../entities/Verification";
import { sendVerificationEmail } from "../../../utils/sendEmail";


const resolvers : Resolvers = {
  Mutation: {
      EmailSignUp: async (_, args : EmailSignUpMutationArgs) : Promise<EmailSignUpResponse> => {
          const {email, phoneNumber} = args;
            try{

                const existingUser = await User.findOne({email});
                if(existingUser){
                    return {
                        ok:false,
                        error: "You should log in instead",
                        token:null
                    }
                }

                const phoneVerification = await Verification.findOne(
                  {
                    payload: phoneNumber,
                    verified: true
                  }
                );
                if(phoneVerification){
                    const newUser = await User.create({
                        ...args
                    }).save();

                    const emailVerification = await Verification.create({
                        payload:newUser.email,
                        target:"EMAIL"
                    }).save()

                    await sendVerificationEmail("donggyu9410@gmail.com", emailVerification.key, newUser.fullName)

                    const token = createJWT(newUser.id);
                    return {
                        ok:true,
                        error:null,
                        token
                    }
                }else {
                    return {
                        ok: false,
                        error: "You have to do phone verification",
                        token: null
                    }
                }

                

            }catch(error) {
                console.log(error);
                return {
                    ok:false,
                    error: error.message,
                    token:null
                }
            }
      }
  }
};

export default resolvers;