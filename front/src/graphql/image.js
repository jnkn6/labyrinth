import gql from 'graphql-tag'

export const ALLIMAGE_QUERY = gql`
    query allImages($id: ID!) {
        allImages(id: $id) {
            source
        }
    }
`
