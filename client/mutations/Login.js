import gql from 'graphql-tag'

const LOGIN = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`
export default LOGIN
