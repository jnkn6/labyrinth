import { gql } from 'apollo-server-express'

import domainSchema from './domain'
import pageSchema from './page'

const linkSchema = gql`
    type Query {
        _empty: String
    }
`;

export default [
    linkSchema,
    domainSchema,
    pageSchema
];