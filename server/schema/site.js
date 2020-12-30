import { gql } from 'apollo-server-express'

export default gql`
type Site {
    id: ID!
    url: String!
    pages: [ID]!
    memo: String
}

type Query {
    get_site: Site!
}
`
