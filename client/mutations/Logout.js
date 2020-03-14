import gql from 'graphql-tag'

const LOGOUT = gql`
  mutation {
    logout {
      id
      email
    }
  }
`

export default LOGOUT
