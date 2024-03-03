export const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    account: [Account]
  }

  type Account {
    id: ID!
    userId: String!
    memberNo: String!
    amount: String
  }

  type Token {
    email: String!
    token: String!
    expired: String!
  }

  type Query {
    user: User
    account(memberNo: String!): Account
  }

  type Mutation {
    register(name: String!, email: String!): User
    login(email: String!): Token
    createAccount(memberNo: String!, amount: String!): Account
    updateAccount(memberNo: String!, amount: String!): Account
    deleteAccount(memberNo: String!): Account
  }
`;
