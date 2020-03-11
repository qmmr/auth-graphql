import React from 'react'
import Header from './Header'

const App = props => (
  <div>
    <Header>Auth with GraphQL</Header>
    {props.children}
  </div>
)

export default App
