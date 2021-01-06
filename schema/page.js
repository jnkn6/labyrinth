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
}

extend type Query {
    allPagesInfo(domain: ID!): [Page!]!
}
`;
