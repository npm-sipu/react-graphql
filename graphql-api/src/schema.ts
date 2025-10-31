import { buildSchema } from "graphql";
import { getUsers } from "./resolvers";

export const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
    role: String
    createdAt: String
  }

  type Query {
    users: [User!]!
  }
`);

export const rootValue = {
  users: getUsers,
};
