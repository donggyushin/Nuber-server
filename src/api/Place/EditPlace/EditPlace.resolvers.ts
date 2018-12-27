import { Resolvers } from "src/types/resolvers";
import { EditPlaceMutationArgs, EditPlaceResponse } from "src/types/graph";
import User from "../../../entities/User";
import Place from "../../../entities/Place";

const resolvers: Resolvers = {
  Mutation: {
    EditPlace: async (
      _,
      args: EditPlaceMutationArgs,
      context
    ): Promise<EditPlaceResponse> => {
      const user: User = context.req.user;
      const { name, isFavorite, id } = args;
      let valuesToUpdate = {};

      if (name) {
        valuesToUpdate["name"] = name;
      }

      valuesToUpdate["isFavorite"] = isFavorite;

      if (!user) {
        return {
          ok: false,
          error: "You have to login"
        };
      }

      try {
        const existingPlace = await Place.findOne({ id });
        if (!existingPlace) {
          return {
            ok: false,
            error: "Place not found"
          };
        }
        if (user.id !== existingPlace.userId) {
          return {
            ok: false,
            error: "No authorized"
          };
        }

        await Place.update({ id }, valuesToUpdate);
        return {
          ok: true,
          error: null
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }
    }
  }
};

export default resolvers;
