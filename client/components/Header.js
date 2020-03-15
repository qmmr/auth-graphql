import React, { Fragment } from 'react'
import { Link } from 'react-router'
import { useApolloClient, useQuery, useMutation } from '@apollo/react-hooks'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'shards-react'

import CURRENT_USER_QUERY from '../queries/CurrentUser'
import IS_LOGGED_IN from '../queries/IsLoggedIn'
import LOGOUT from '../mutations/Logout'

function LogoutLink(props) {
  const router = props.router
  const client = useApolloClient()
  const [logout, data] = useMutation(LOGOUT, {
    onCompleted: props => {
      console.log('logout is complete:: ', props)
      localStorage.removeItem('token')
      client.writeData({ data: { isLoggedIn: false } })
      console.log('router:: ', router)
      // TODO: Redirect only when location is different that /
      router.push('/')
    },
  })
  const handleLogout = evt => {
    evt.preventDefault()
    logout()
  }

  // console.log('LogoutLink:: ', props, data)

  return (
    <NavItem>
      <Link to="#" className="nav-link" onClick={handleLogout}>
        Logout
      </Link>
    </NavItem>
  )
}

function IsLoggedIn({ router }) {
  const { data } = useQuery(IS_LOGGED_IN)
  console.log('isLoggedIn:: ', data)

  return data.isLoggedIn ? (
    <LogoutLink router={router} />
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

const Header = ({ children, router }) => {
  return (
    <header>
      <Navbar type="dark" theme="primary" expand="md">
        <NavbarBrand href="#">Auth with GraphQL</NavbarBrand>
        <Nav navbar className="ml-auto">
          <IsLoggedIn router={router} />
        </Nav>
      </Navbar>
      {children}
    </header>
  )
}

export default Header
