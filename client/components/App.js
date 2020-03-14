import React from 'react'
import { Container, Col, Row } from 'shards-react'
import Header from './Header'

const App = props => (
  <Container className="dr-example-container" fluid>
    <Header />
    <Row>
      <Col sm="12" md="4" lg="3"></Col>
      <Col sm="12" md="4" lg="6">
        {props.children}
      </Col>
      <Col sm="12" md="4" lg="3"></Col>
    </Row>
  </Container>
)

export default App
