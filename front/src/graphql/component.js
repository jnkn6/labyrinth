import gql from 'graphql-tag'

export const ALLCOMPONENTSINFO_QUERY = gql`
    query allComponentsInfo ($page: ID!) {
        allComponentsInfo(page: $page) {
            _id
            name
            type
            domain
            page
            parent
            groups
            components
            memo
            checklist
        }
    }
`

export const CREATECOMPONENT_MUTATION = gql`
    mutation createComponent ($component: ComponentInput!) {
        createComponent (component: $component) {
            _id
            name
            type
            domain
            page
            parent
            groups
            components
            memo
            checklist
        }
    }
`

export const MODIFYCOMPONENT_MUTATION = gql`
    mutation modifyComponent ($component: ComponentInput!) {
        modifyComponent (component: $component) {
            _id
            name
            type
            domain
            page
            parent
            groups
            components
            memo
            checklist
        }
    }
`
