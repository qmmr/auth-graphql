import React, { useState } from 'react'
import { useApolloClient, useMutation } from '@apollo/react-hooks'
import { Button, Form, FormInput, FormGroup } from 'shards-react'
import LOGIN from '../mutations/Login'
import CURRENT_USER_QUERY from '../queries/CurrentUser'

const LoginForm = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, { loading, error }] = useMutation(LOGIN, {
    variables: { email, password },
    onCompleted: props => {
      console.log('onCompleted: ', props)
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  })

  const onEmailChange = ({ target: { value } }) => setEmail(value)
  const onPasswordChange = ({ target: { value } }) => setPassword(value)
  const handleSubmit = evt => {
    evt.preventDefault()
    console.log('submitting form...', loading, error)
    login()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <label htmlFor="email">Email:</label>
        <FormInput id="email" placeholder="Enter your email..." value={email} onChange={onEmailChange} />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <FormInput
          type="password"
          id="password"
          placeholder="Enter your password..."
          value={password}
          onChange={onPasswordChange}
        />
      </FormGroup>
      <Button type="submit">Login</Button>
    </Form>
  )
}

export default LoginForm
