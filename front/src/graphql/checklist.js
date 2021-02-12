import gql from 'graphql-tag'

export const CHECKLIST_QUERY = gql`
    query checklist ($id: ID!) {
        checklist(id: $id) {
            _id
            done
            timestamp
            deactivated
        }
    }
`

export const CHECK_MUTATION = gql`
    mutation check ($done: ChecklistInput!) {
        check (done: $done) {
            date
            codes
        }
    }
`

export const DEACTIVATE_MUTATION = gql`
    mutation deactivate ($deactivate: ChecklistInput!) {
        deactivate (deactivate: $deactivate)
    }
`

export const ACTIVATE_MUTATION = gql`
    mutation activate ($activate: ChecklistInput!) {
        activate (activate: $activate)
    }
`
