import { gql } from 'apollo-server-express'

import domainSchema from './domain'
import pageSchema from './page'
import componentSchema from './component'
import imageSchema from './image'
import checklistSchema from './checklist'

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
    componentSchema,
    imageSchema,
    checklistSchema,
];
