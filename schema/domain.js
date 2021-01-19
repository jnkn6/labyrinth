import { gql } from 'apollo-server-express'

export default gql`
type Domain {
    _id: ID!
    url: String!
    pages: [ID!]!
    memo: String
}

input DomainInput {
    _id: ID!
    url: String!
    pages: [ID!]!
    memo: String
}

extend type Query {
    domainInfo(url: String!): Domain
}

extend type Mutation {
    modifyDomain(domain: DomainInput!): Domain!
}
`
