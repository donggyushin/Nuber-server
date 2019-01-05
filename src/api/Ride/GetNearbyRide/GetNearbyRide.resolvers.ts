import { Resolvers } from "src/types/resolvers";
import { GetNearbyRideResponse } from "src/types/graph";
import User from "../../../entities/User";
import Ride from "../../../entities/Ride";
import { getRepository, Between } from "typeorm";

const resolvers: Resolvers = {
  Query: {
    GetNearbyRide: async (_, __, context): Promise<GetNearbyRideResponse> => {
      const user: User = context.req.user;
      if (!user) {
        return {
          ok: false,
          error: "You have to login",
          ride: null
        };
      }

      if (!user.isDriving) {
        return {
          ok: false,
          error: "You are not driver",
          ride: null
        };
      }
      const { lastLat, lastLng } = user;

      try {
        const ride = await getRepository(Ride).findOne(
          {
            status: "REQUESTING",
            pickUpLat: Between(lastLat - 0.05, lastLat + 0.05),
            pickUpLng: Between(lastLng - 0.05, lastLng + 0.05)
          },
          { relations: ["passenger"] }
        );

        if (ride) {
          return {
            ok: true,
            error: null,
            ride
          };
        } else {
          return {
            ok: false,
            error: "There is no ride request nearby",
            ride: null
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          ride: null
        };
      }
    }
  }
};

export default resolvers;
