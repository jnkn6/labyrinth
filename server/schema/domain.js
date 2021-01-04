import { gql } from 'apollo-server-express'

export default gql`
type Domain {
    _id: ID!
    url: String!
    pages: [ID!]!
    memo: String
}

type Query {
    domainInfo(url: String!): Domain
}
`
