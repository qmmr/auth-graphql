import React, { useReducer } from 'react'
import { Flex, Box, Text } from 'rebass'
import Header from './Header'

const App = props => {
  return (
    <Flex px={2} alignItems="center" width="100%" flexDirection="column">
      <Header />
      <Box width={[1, 1, 1]} p={3}>
        {props.children}
      </Box>
    </Flex>
  )
}

export default App
