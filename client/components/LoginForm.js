import React, { useState } from 'react'
import { useApolloClient, useMutation } from '@apollo/react-hooks'
import { Alert, Button, Form, FormInput, FormGroup } from 'shards-react'
import { Text } from 'rebass'
import LOGIN from '../mutations/Login'
import CURRENT_USER_QUERY from '../queries/CurrentUser'

const LoginForm = ({ router }) => {
  const client = useApolloClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const [login, resp] = useMutation(LOGIN, {
    variables: { email, password },
    onCompleted: ({ login }) => {
      console.log('LOGIN::onCompleted: ', login)
      localStorage.setItem('token', login.id)
      client.writeData({ data: { isLoggedIn: true } })
      router.push('/')
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    awaitRefetchQueries: true,
    onError: ({ graphQLErrors }) => setErrors(graphQLErrors.map(e => e.message)),
  })

  const onEmailChange = ({ target: { value } }) => setEmail(value)
  const onPasswordChange = ({ target: { value } }) => setPassword(value)
  const handleSubmit = evt => {
    evt.preventDefault()
    login()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <FormGroup>
        <label htmlFor="email">Email:</label>
        <FormInput
          id="email"
          invalid={!!errors.length}
          name="email"
          onChange={onEmailChange}
          placeholder="joe@example.com"
          type="email"
          value={email}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <FormInput
          id="password"
          invalid={!!errors.length}
          name="password"
          onChange={onPasswordChange}
          placeholder="Enter your password..."
          type="password"
          value={password}
        />
      </FormGroup>
      {errors.length
        ? resp.error.graphQLErrors.map(({ message }) => (
            <Text color="red" key={message}>
              {message}
            </Text>
          ))
        : null}
      <FormGroup>
        <Button type="submit">Login</Button>
      </FormGroup>
    </Form>
  )
}

export default LoginForm
