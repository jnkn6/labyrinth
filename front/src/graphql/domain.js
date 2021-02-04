import gql from 'graphql-tag'

export const DOMAININFO_QUERY = gql`
    query domainInfo($url: String!) {
        domainInfo(url: $url) {
            _id
            url
            pages
            memo
        }
}`

export const CREATEDOMAIN_MUTATION = gql`
    mutation createDomain ($domain: DomainInput!) {
        createDomain (domain: $domain) {
            _id
            url
            pages
            memo
        }
    }
`

export const MODIFYDOMAIN_MUTATION = gql`
    mutation modifyDomain ($domain: DomainInput!) {
        modifyDomain (domain: $domain) {
            _id
            url
            pages
            memo
        }
    }
`
