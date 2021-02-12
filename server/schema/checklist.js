import { gql } from 'apollo-server-express'

export default gql`
type Checklist {
    _id: ID!
    done: String! # JSON string
    timestamp: String! # JSON string
    deactivated: [String!]!
}

type CheckResult {
    date: String!
    codes: [String!]!
}

extend type Query {
    checklist(id: ID!): Checklist
}

input ChecklistInput {
    _id: ID!
    codes: [String!]!
}

extend type Mutation {
    check(done: ChecklistInput!): CheckResult!
    uncheck(undo: ChecklistInput!): CheckResult!
    deactivate(deactivate: ChecklistInput!): [String!]!
    activate(activate: ChecklistInput!): [String!]!
}
`;
