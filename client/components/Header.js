import React from 'react'
import { graphql } from 'react-apollo'
import CurrentUserQuery from '../queries/CurrentUser'

const Header = ({ children, data }) => {
  console.log(data)
  return (
    <heading>
      <h1>{children}</h1>
      {data.loading && <div>Loading...</div>}
      {data.user ? <div>Welcome back {data.user.email}</div> : <div>Please login or signup first...</div>}
    </heading>
  )
}

export default graphql(CurrentUserQuery)(Header)
