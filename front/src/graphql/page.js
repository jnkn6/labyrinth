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
            checklist
        }
    }
`

export const CREATEPAGE_MUTATION = gql`
    mutation createPage ($page: PageInput!) {
        createPage (page: $page) {
            _id
            name
            path
            domain
            groups
            components
            memo
            checklist
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
            checklist
        }
    }
`
