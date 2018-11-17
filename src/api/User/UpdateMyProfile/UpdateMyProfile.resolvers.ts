import { Resolvers } from "src/types/resolvers";
import { UpdateMyProfileMutationArgs, UpdateMyProfileResponse } from "src/types/graph";
import User from "../../../entities/User";

const resolvers : Resolvers = {
  Mutation: {
    UpdateMyProfile: async (_, args:UpdateMyProfileMutationArgs, context): Promise<UpdateMyProfileResponse> => {
        const user:User = context.req.user;
        const {firstName, lastName, password, profilePhoto, age} = args;
        const valueToUpdate = {};
        if(firstName && firstName !== ""){
            valueToUpdate["firstName"] = firstName
        }
        if(lastName && lastName !== ""){
            valueToUpdate["lastName"] = lastName
        }
        if(password && password !== ""){
            user.password = password;
            user.save();
        }
        if(profilePhoto && profilePhoto !== ""){
            valueToUpdate["profilePhoto"] = profilePhoto
        }
        if(age && age !== 0) {
            valueToUpdate["age"] = age;
        }
        console.log(valueToUpdate);
        if(!user) {
            return {
                ok:false,
                error:"You have to login"
            }

        }else {
            try{
                await User.update({id:user.id}, valueToUpdate);
                
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
  }
};

export default resolvers;