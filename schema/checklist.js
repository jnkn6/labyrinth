import { gql } from 'apollo-server-express'

export default gql`
type Checklist {
    _id: ID!
    done: String! # JSON string
    deactivated: [String!]!
}

extend type Query {
    checklist(id: ID!): Checklist
}

input ChecklistInput {
    _id: ID!
    code: String!
}

extend type Mutation {
    check(done: ChecklistInput!): Boolean!
}
`;
