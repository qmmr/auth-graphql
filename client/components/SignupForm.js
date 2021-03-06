import React, { useState } from 'react'
import { useApolloClient, useMutation } from '@apollo/react-hooks'
import { Box, Button, Text } from 'rebass'
import { Label, Input, Select, Textarea, Radio, Checkbox } from '@rebass/forms'
import SIGNUP from '../mutations/Signup'

const SignupForm = ({ router }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const [signup, data] = useMutation(SIGNUP, {
    variables: { email, password },
    onCompleted: ({ signup }) => {
      console.log('Signup completed:: ', signup)
      router.push('/login')
    },
    onError: ({ graphQLErrors }) => setErrors(graphQLErrors.map(e => e.message)),
  })

  const onEmailChange = ({ target: { value } }) => setEmail(value)
  const onPasswordChange = ({ target: { value } }) => setPassword(value)
  const onSubmit = evt => {
    evt.preventDefault()
    signup()
  }

  return (
    <Box as="form" py={3} onSubmit={onSubmit}>
      <h1>Signup</h1>
      <Label htmlFor="email">email</Label>
      <Input type="email" id="email" name="email" placeholder="joe@gmail.com" value={email} onChange={onEmailChange} />
      <Label htmlFor="password">password</Label>
      <Input
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        value={password}
        onChange={onPasswordChange}
      />
      {errors.length
        ? errors.map(msg => (
            <Text color="red" key={msg}>
              {msg}
            </Text>
          ))
        : null}
      <Button type="submit">Signup</Button>
    </Box>
  )
}

export default SignupForm
