import React, { useState } from 'react'
import { useApolloClient, useMutation } from '@apollo/react-hooks'
import { Alert, Button, Form, FormInput, FormGroup } from 'shards-react'
import { Text } from 'rebass'
import LOGIN from '../mutations/Login'

const LoginForm = ({ router }) => {
  // console.log('LoginForm:: ', props)
  const client = useApolloClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const [login, resp] = useMutation(LOGIN, {
    variables: { email, password },
    onCompleted: props => {
      console.log('LOGIN::onCompleted: ', props)
      localStorage.setItem('token', props.login.id)
      client.writeData({ data: { isLoggedIn: true } })
      router.push('/')
    },
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
