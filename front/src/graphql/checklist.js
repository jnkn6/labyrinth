import gql from 'graphql-tag'

export const CHECKLIST_QUERY = gql`
    query checklist ($id: ID!) {
        checklist(id: $id) {
            _id
            done
            deactivated
        }
    }
`

export const CHECK_MUTATION = gql`
    mutation check ($done: ChecklistInput!) {
        check (done: $done)
    }
`
