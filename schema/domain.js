import { gql } from 'apollo-server-express'

export default gql`
type Domain {
    id: ID!
    url: String!
    pages: [ID]!
    memo: String
}

type Query {
    get_domain: Domain!
}
`