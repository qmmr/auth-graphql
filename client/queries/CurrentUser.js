import gql from 'graphql-tag'

const CurrentUserQuery = gql`
  query {
    user {
      id
      email
    }
  }
`

export default CurrentUserQuery
