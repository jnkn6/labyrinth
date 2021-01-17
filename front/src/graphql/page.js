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

export const MODIFYPAGE_MUTATION = gql`
    mutation modifyPage ($page: PageInput!) {
        modifyPage (page: $page) {
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
