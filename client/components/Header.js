import React, { Fragment } from 'react'
import { Link } from 'react-router'
import { useApolloClient, useQuery, useMutation } from '@apollo/react-hooks'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'shards-react'
import { Box, Text } from 'rebass'

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
      router.push('/login')
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    awaitRefetchQueries: true,
  })
  const handleLogout = evt => {
    evt.preventDefault()
    logout()
  }

  return (
    <NavItem>
      <Link to="#" className="nav-link" onClick={handleLogout}>
        Logout
      </Link>
    </NavItem>
  )
}

const WelcomeUser = ({ user }) => <Text>Welcome back, {user.email}!</Text>

const IsLoggedIn = ({ router }) => {
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
  const { data } = useQuery(CURRENT_USER_QUERY, {
    fetchPolicy: 'network-only',
  })

  return (
    <Box as="header" width={[1, 1, 1, 1]}>
      <Navbar type="dark" theme="primary" expand="md">
        <Text>Auth with GraphQL</Text>
        {data && data.user ? <WelcomeUser user={data.user} /> : null}
        <Nav navbar className="ml-auto">
          <IsLoggedIn router={router} />
        </Nav>
      </Navbar>
      {children}
    </Box>
  )
}

export default Header
