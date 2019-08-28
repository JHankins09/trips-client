import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { showDestination } from './api'
import { showTrip } from '../Trips/api'
// import Button from 'react-bootstrap/Button'

class ShowDestination extends Component {
  state = {
    trip: {},
    destination: {}
  }

  async componentDidMount () {
    const { user, setTrip, setDestination } = this.props
    console.log(this.props)
    const tripid = this.props.match.params.id
    const destid = this.props.match
    try {
      showTrip(user, tripid)
        .then((response) =>
          this.setState({ trip: response.data.trip }))
        .then(() =>
          setTrip(this.state.trip))
      showDestination(user, destid)
        .then((response) =>
          this.setState({ trip: response.data.destination }))
        .then(() =>
          setDestination(this.state.destination))
    } catch (error) {
      console.error(error)
    }
  }
  // render
  render () {
    // return
    const { trip, destination } = this.state

    console.log('Trip => ', trip)
    console.log('Destination => ', destination)

    return (
      <h1>Destination Content Goes Here!</h1>
    )
  }
}

export default withRouter(ShowDestination)
