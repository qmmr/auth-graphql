import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Router, hashHistory, Route, IndexRoute } from 'react-router'

// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'shards-ui/dist/css/shards.min.css'

import App from './components/App'

const client = new ApolloClient({
  dataIdFromObject: o => o.id,
})

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}></Route>
      </Router>
    </ApolloProvider>
  )
}

ReactDOM.render(<Root />, document.querySelector('#root'))
