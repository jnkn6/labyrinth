import { gql } from 'apollo-server-express'

export default gql`
type Page {
    _id: ID!
    name: String!
    path: String!
    domain: ID!
    groups: [ID!]!
    components: [ID!]!
    memo: String
    checklist: ID!
}

input PageInput {
    _id: ID!
    name: String!
    path: String!
    domain: ID!
    groups: [ID!]!
    components: [ID!]!
    memo: String
    checklist: ID # temp
}

extend type Query {
    allPagesInfo(domain: ID!): [Page!]!
}

extend type Mutation {
    createPage(page: PageInput!): Page!
    modifyPage(page: PageInput!): Page!
}
`;
