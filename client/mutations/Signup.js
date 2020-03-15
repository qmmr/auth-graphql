import gql from 'graphql-tag'

const SIGNUP = gql`
  mutation Signup($email: String, $password: String) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`

export default SIGNUP
