import gql from 'graphql-tag'

export const CREATECOMPONENT_MUTATION = gql`
    mutation createComponent ($component: ComponentInput!) {
        createComponent (component: $component) {
            _id
            name
            domain
            page
            parent
            groups
            components
            memo
        }
    }
`
