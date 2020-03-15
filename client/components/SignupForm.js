import React, { useState } from 'react'
import { useApolloClient, useMutation } from '@apollo/react-hooks'
import { Box, Button } from 'rebass'
import { Label, Input, Select, Textarea, Radio, Checkbox } from '@rebass/forms'
import SIGNUP from '../mutations/Signup'

const SignupForm = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signup, data] = useMutation(SIGNUP, {
    onCompleted: ({ signup }) => {
      console.log('Signup completed:: ', signup)
    },
  })
  const onSubmit = evt => {
    evt.preventDefault()
    signup(email, password)
  }

  return (
    <Box as="form" py={3} onSubmit={onSubmit}>
      <h1>Signup</h1>
      <Label htmlFor="email">email</Label>
      <Input type="email" id="email" placeholder="Enter your email" value={email} onChange={setEmail} />
      <Label htmlFor="password">password</Label>
      <Input type="password" id="password" placeholder="Enter your password" value={password} onChange={setPassword} />
      <Button type="submit">Signup</Button>
    </Box>
  )
}

export default SignupForm
