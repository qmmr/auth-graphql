import gql from 'graphql-tag'

const CURRENT_USER_QUERY = gql`
  {
    user {
      id
      email
    }
  }
`

export default CURRENT_USER_QUERY
