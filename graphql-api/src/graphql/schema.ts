import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type Country {
    id: ID!
    name: String!
    code: String
    states: [State!]! 
  }

  type State {
    id: ID!
    name: String!
    country: ID!
    cities: [City!]! 
  }

  type City {
    id: ID!
    name: String!
    state: ID!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    dob: String
    country: Country!
    state: State!
    city: City!
    role: String
    createdAt: String
  }

  input CreateUserInput {
    firstName: String!
    lastName: String!
    email: String!
    dob: String
    countryId: ID!
    stateId: ID!
    cityId: ID!
    role: String
  }

  type Query {
    countries: [Country!]!
    states(countryId: ID!): [State!]!
    cities(stateId: ID!): [City!]!
    users(countryId: ID, stateId: ID, cityId: ID): [User!]!
    user(id: ID!): User
    locationTree: [Country!]!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
  }
`);
