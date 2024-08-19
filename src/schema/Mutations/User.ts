import { GraphQLID, GraphQLString } from "graphql";
import { UserType } from "../TypeDefs/User";
import User from "../../model/user";
import { MessageType } from "../TypeDefs/Message";

export const CREATE_USER = {
  type: UserType,
  args: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { name, email, password } = args;
    await User.create({ name, email, password });
    return args;
  },
};

export const DELETE_USER = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const id = args.id;
    const user = await User.findById(id);
    if (!user) throw new Error("USER DOESNT EXIST");
    await User.findByIdAndDelete(id);

    return { successful: true, message: "DELETE WORKED" };
  },
};
