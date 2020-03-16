import React, { useReducer } from 'react'
import { Flex, Box, Text } from 'rebass'
import Header from './Header'

import IS_LOGGED_IN from '../queries/IsLoggedIn'
import { useQuery } from '@apollo/react-hooks'
import CURRENT_USER_QUERY from '../queries/CurrentUser'

const WelcomeUser = props => {
  const { data } = useQuery(CURRENT_USER_QUERY)
  console.log('WelcomeUser:: ', data)
  if (!data) return <Text />

  return <Text>Welcome back, {data.user.email}!</Text>
}

const App = props => {
  const { data } = useQuery(IS_LOGGED_IN)
  console.log('App:: ', data)

  return (
    <Flex px={2} alignItems="center" width="100%" flexDirection="column">
      <Header router={props.router} />
      <Box width={[1, 1, 1]} p={3}>
        {data.isLoggedIn && <WelcomeUser />}
        {props.children}
      </Box>
    </Flex>
  )
}

export default App
