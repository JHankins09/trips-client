import React, { Component, Fragment } from 'react'
// import { Link } from 'react-router-dom'
import { indexTrips } from './api'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'

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
    console.log(this.state.trips[0])
    const tripsJsx = this.state.trips.filter(trip => trip.owner === this.props.user._id).map(trip => (
      <Card style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '15px' }} key={trip._id} className='col-sm-3 tripcard'>
        <Card.Body>
          <Card.Title>{trip.name}</Card.Title>
          <Badge variant="warning">{trip.type}</Badge>
          <hr/>
          <Card.Text>
            {`Get your journey rolling through ${trip.destinations.length} locations`}
          </Card.Text>
          <Button variant="outline-dark" href={`#/trips/${trip._id}`}>Journey on {trip.name}</Button>
        </Card.Body>
      </Card>
    ))
    return (
      <Fragment>
        <div className='row d-flex justify-content-around' style={{ marginTop: '15px' }}>
          { this.state.trips.length > 0 ? tripsJsx : 'Loading...' }
        </div>
        <div className='row toolbar d-flex justify-content-around'>
          <Button variant='dark' href={'#/createtrip'}>Create a new adventure</Button>
        </div>
      </Fragment>
    )
  }
}

export default Trips
