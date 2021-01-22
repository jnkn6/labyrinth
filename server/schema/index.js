import { gql } from 'apollo-server-express'

import domainSchema from './domain'
import pageSchema from './page'
import imageSchema from './image'

const linkSchema = gql`
    type Query {
        _empty: String
    },
    type Mutation {
        _: Boolean
    }
`;

export default [
    linkSchema,
    domainSchema,
    pageSchema,
    imageSchema,
];
