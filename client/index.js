import React from 'react'
import ReactDOM from 'react-dom'
// FIXME: Upgrade to new version of react-router
import { Router, hashHistory, Route, IndexRoute, Redirect } from 'react-router'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { typeDefs, resolvers } from './resolvers'

import { ThemeProvider } from 'emotion-theming'
import theme from '@rebass/preset'

// FIXME: Remove along with ract-shards
import 'bootstrap/dist/css/bootstrap.min.css'
import 'shards-ui/dist/css/shards.min.css'

import App from './components/App'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'

const cache = new InMemoryCache()
cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
  },
})

const client = new ApolloClient({
  cache,
  dataIdFromObject: o => o.id,
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
    headers: { authorization: localStorage.getItem('token') },
  }),
  resolvers,
  typeDefs,
})

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router history={hashHistory}>
          <Route path="/" component={App}>
            <Route path="login" component={LoginForm}></Route>
            <Route path="signup" component={SignupForm}></Route>
          </Route>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  )
}

ReactDOM.render(<Root />, document.querySelector('#root'))
