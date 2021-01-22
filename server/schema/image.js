import { gql } from 'apollo-server-express'

export default gql`
type Image {
    source: String!
}

extend type Query {
    allImages(id: ID!): [Image!]!
}
`;
