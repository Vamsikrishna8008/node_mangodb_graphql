import { GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";
import { UserType } from "../TypeDefs/User";
import User from "../../model/user";

export const GET_ALL_USERS = {
  type: new GraphQLList(UserType),
  resolve() {
    return User.find();
  },
};

export const GET_USER_BY_ID = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }, // id argument is required
  },
  resolve(parent: any, args: any) {
    return User.findById(args.id);
  },
};
