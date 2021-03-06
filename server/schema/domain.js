import { gql } from 'apollo-server-express'

export default gql`
type Domain {
    _id: ID!
    url: String!
    pages: [ID!]!
    memo: String
    checklist: ID!
}

input DomainInput {
    _id: ID!
    url: String!
    pages: [ID!]!
    memo: String
    checklist: ID # temp
}

extend type Query {
    domainInfo(url: String!): Domain
}

extend type Mutation {
    createDomain(domain: DomainInput!): Domain!
    modifyDomain(domain: DomainInput!): Domain!
}
`
