import { gql } from 'apollo-server-express'

export default gql`
type Component {
    _id: ID!
    name: String!
    domain: ID!
    page: ID!
    parent: ID
    groups: [ID!]!
    components: [ID!]!
    memo: String
}

input ComponentInput {
    _id: ID!
    name: String!
    domain: ID!
    page: ID!
    parent: ID
    groups: [ID!]!
    components: [ID!]!
    memo: String
}
extend type Query {
    allComponentsInfo(page: ID!): [Component!]!
}

extend type Mutation {
    createComponent(component: ComponentInput!): Component!
    modifyComponent(component: ComponentInput!): Component!
}
`;