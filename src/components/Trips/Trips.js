import React, { Component, Fragment } from 'react'
// import { Link } from 'react-router-dom'
import { indexTrips } from './api'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class Trips extends Component {
  // constructor
  constructor () {
    super()

    this.state = {
      trips: []
    }
  }

  async componentDidMount () {
    const { user } = this.props
    try {
      const response = await
      indexTrips(user)
      this.setState({ trips: response.data.trips })
    } catch (error) {
      console.error(error)
    }
  }

  render () {
    const tripsJsx = this.state.trips.filter(trip => trip.owner === this.props.user._id).map(trip => (
      <Card style={{ width: '18rem' }} key={trip._id}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            {`Some quick example text to build on the card title and make up the bulk of
            the card's content.`}
          </Card.Text>
          <Button variant="primary" href={`#/trips/${trip._id}`}>Go somewhere</Button>
        </Card.Body>
      </Card>
    ))
    return (
      <Fragment>
        <h4>Trips</h4>
        { this.state.trips.length > 0 ? tripsJsx : 'Loading...' }
      </Fragment>
    )
  }
}

export default Trips
