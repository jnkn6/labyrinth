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
