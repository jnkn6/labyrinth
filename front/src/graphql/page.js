import gql from 'graphql-tag'

export const ALLPAGESINFO_QUERY = gql`
    query allPagesInfo ($domain: ID!) {
        allPagesInfo(domain: $domain) {
            _id
            name
            path
            domain
            groups
            components
            memo
        }
    }
`
