import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { showDestination } from './api'
import Button from 'react-bootstrap/Button'

class ShowDestination extends Component {
  state = {
    trip: {},
    destination: {}
  }

  async componentDidMount () {
    const { user, setDestination } = this.props
    try {
      this.setState({ trip: this.props.trip })
      const dest =
      await showDestination(user, this.props.match.params.id)
      this.setState({ destination: dest.data.destination })
      setDestination(this.state.destination)
    } catch (error) {
      console.error(error)
    }
  }

  // render
  render () {
    const { destination } = this.state
    const { trip } = this.props
    const stops = []
    for (let i = 0; i < Object.keys(trip.destinations).length; i++) {
      stops.push(trip.destinations[i]._id)
    }
    console.log('Length Formula ', stops.length - stops.indexOf(destination._id) - 1)

    return (
      <Fragment>
        <div key={destination._id}>
          <ul>
            <li> You are at: {destination.name} </li>
            <li> This is stop {stops.indexOf(destination._id) + 1} on your journey! </li>
            <li> Only {stops.length - stops.indexOf(destination._id) - 1} stops remaining! </li>
            <li> <Button href={`#/trips/${trip._id}/destinations/${destination._id}/edit`}>Edit this destination</Button></li>
            <li> <Button href={`#/trips/${trip._id}/destinations/${destination._id}/delete`}>
            Delete this destination from your trip
            </Button></li>
          </ul>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(ShowDestination)