import React, { Fragment } from 'react'
import { Link } from 'react-router'
import { useApolloClient, useQuery, useMutation } from '@apollo/react-hooks'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'shards-react'

import CURRENT_USER_QUERY from '../queries/CurrentUser'
import IS_LOGGED_IN from '../queries/IsLoggedIn'
import LOGOUT from '../mutations/Logout'

function LogoutLink(props) {
  const client = useApolloClient()
  const [logout, data] = useMutation(LOGOUT, {
    onCompleted: props => {
      console.log('logout is complete:: ', props)
      client.writeData({ data: { isLoggedIn: false } })
    },
  })
  console.log('LogoutLink:: ', props, data)

  return (
    <NavItem>
      <Link to="#" className="nav-link" onClick={logout}>
        Logout
      </Link>
    </NavItem>
  )
}

function IsLoggedIn({ logout }) {
  const { data } = useQuery(IS_LOGGED_IN)
  console.log('isLoggedIn:: ', data)

  return data.isLoggedIn ? (
    <LogoutLink />
  ) : (
    <Fragment>
      <NavItem>
        <Link to="/signup" className="nav-link">
          Signup
        </Link>
      </NavItem>
      <NavItem>
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </NavItem>
    </Fragment>
  )
}

const Header = ({ children }) => {
  return (
    <header>
      <Navbar type="dark" theme="primary" expand="md">
        <NavbarBrand href="#">Auth with GraphQL</NavbarBrand>
        <Nav navbar className="ml-auto">
          <IsLoggedIn />
        </Nav>
      </Navbar>
      {children}
    </header>
  )
}

export default Header
