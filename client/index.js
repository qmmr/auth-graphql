import React from 'react'
import ReactDOM from 'react-dom'
import { Router, hashHistory, Route, IndexRoute, Redirect } from 'react-router'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { typeDefs, resolvers } from './resolvers'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'shards-ui/dist/css/shards.min.css'

import App from './components/App'
import LoginForm from './components/LoginForm'

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
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="login" component={LoginForm}></Route>
        </Route>
      </Router>
    </ApolloProvider>
  )
}

ReactDOM.render(<Root />, document.querySelector('#root'))
