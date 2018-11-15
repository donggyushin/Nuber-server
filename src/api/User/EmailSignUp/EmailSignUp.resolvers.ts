import { Resolvers } from "src/types/resolvers";
import { EmailSignUpResponse, EmailSignUpMutationArgs } from "src/types/graph";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";


const resolvers : Resolvers = {
  Mutation: {
      EmailSignUp: async (_, args : EmailSignUpMutationArgs) : Promise<EmailSignUpResponse> => {
          const {email} = args;
            try{

                const existingUser = await User.findOne({email});
                if(existingUser){
                    return {
                        ok:false,
                        error: "You should log in instead",
                        token:null
                    }
                }

                const newUser = await User.create({...args}).save();
                const token = createJWT(newUser.id);
                return {
                    ok:true,
                    error: null,
                    token
                }
            }catch(error) {
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