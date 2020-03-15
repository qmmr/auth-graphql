import React, { useState } from 'react'
import { useApolloClient, useMutation } from '@apollo/react-hooks'
import { Alert, Button, Form, FormInput, FormGroup } from 'shards-react'
import LOGIN from '../mutations/Login'

const LoginForm = ({ router }) => {
  // console.log('LoginForm:: ', props)
  const client = useApolloClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, resp] = useMutation(LOGIN, {
    variables: { email, password },
    onCompleted: props => {
      console.log('LOGIN::onCompleted: ', props)
      localStorage.setItem('token', props.login.id)
      client.writeData({ data: { isLoggedIn: true } })
      router.push('/')
    },
    onError: ({ graphQLErrors }) => {
      const errors = graphQLErrors.map(e => e.message)
      console.log(errors)
    },
  })

  const onEmailChange = ({ target: { value } }) => setEmail(value)
  const onPasswordChange = ({ target: { value } }) => setPassword(value)
  const handleSubmit = evt => {
    evt.preventDefault()
    login()
  }
  const hasErrors = resp && resp.error && Array.isArray(resp.error.graphQLErrors)

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <label htmlFor="email">Email:</label>
        <FormInput
          id="email"
          invalid={hasErrors}
          onChange={onEmailChange}
          placeholder="Enter your email..."
          type="email"
          value={email}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <FormInput
          id="password"
          invalid={hasErrors}
          onChange={onPasswordChange}
          placeholder="Enter your password..."
          type="password"
          value={password}
        />
      </FormGroup>
      {hasErrors
        ? resp.error.graphQLErrors.map(({ message }) => (
            <Alert theme="danger" key={message}>
              {message}
            </Alert>
          ))
        : null}
      <FormGroup>
        <Button type="submit">Login</Button>
      </FormGroup>
    </Form>
  )
}

export default LoginForm
