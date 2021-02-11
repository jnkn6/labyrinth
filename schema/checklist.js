import { gql } from 'apollo-server-express'

export default gql`
type Checklist {
    _id: ID!
    timestamp: String! # JSON string
    deactivated: [String!]!
}

extend type Query {
    checklist(id: ID!): Checklist
}

input ChecklistInput {
    _id: ID!
    codes: [String!]!
}

extend type Mutation {
    check(done: ChecklistInput!): String! # Return date string
    deactivate(deactivate: ChecklistInput!): Boolean!
    activate(activate: ChecklistInput!): Boolean!
}
`;
