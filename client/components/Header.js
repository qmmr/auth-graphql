import React from 'react'
import { Link } from 'react-router'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'shards-react'

import CURRENT_USER_QUERY from '../queries/CurrentUser'
import LOGUT from '../mutations/Logout'

const Header = ({ children }) => {
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY)
  const [logout, { data: logoutData }] = useMutation(LOGUT)

  console.log(`Header: `, loading, error, data)
  console.log('logoutData: ', logoutData)

  if (loading) return <div>Loading...</div>

  const isLoggedIn = data.user && data.user.email && typeof data.user.email === 'string'

  return (
    <header>
      <Navbar type="dark" theme="primary" expand="md">
        <NavbarBrand href="#">Auth with GraphQL</NavbarBrand>
        {isLoggedIn && `Welcome back ${data.user.email}`}
        <Nav navbar className="ml-auto">
          <NavItem>
            <Link to="/signup" className="nav-link">
              Signup
            </Link>
          </NavItem>
          {!isLoggedIn ? (
            <NavItem>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </NavItem>
          ) : (
            <NavItem>
              <Link to="#" className="nav-link" onClick={logout}>
                Logout
              </Link>
            </NavItem>
          )}
        </Nav>
      </Navbar>
      {children}
    </header>
  )
}

// {loading && <div>Loading...</div>}
// {data.user ? <div>Welcome back {data.user.email}</div> : <div>Please login or signup first...</div>}
export default Header
