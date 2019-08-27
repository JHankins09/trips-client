import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { addDestination } from './api'
import { updateTrip } from '../Trips/api'

import DestinationForm from './DestinationsForm.js'

class AddDestination extends Component {
  state = {
    destination: {
      name: '',
      time_spent: '',
      pit: '',
      peak: '',
      trip: ''
    },
    trip: {}
  }

  handleChange = event => {
    this.setState({ destination: { ...this.state.destination, [event.target.name]: event.target.value } })
  }

  handleSubmit = event => {
    event.preventDefault()
    // console.log('props => ', this.props)
    const { user } = this.props
    const { trip } = this.props
    this.setState({ trip: trip })
    addDestination(this.state.destination, user, trip)
      .then((response) => {
        console.log('Destination is ', response.data.destination)
        console.log('Old trip is ', this.state.trip)
        this.state.trip.destinations.push(response.data.destination)
        const newDuration = this.state.destinations.length()
        this.setState({ trip: { _duration: newDuration } })
        console.log('New Trip is', this.state.trip)
        updateTrip(this.state.trip, user)
          .then((response) =>
            console.log('Update Trip is ', response))
      })
      .finally(() => {
        // this.props.history.push(`/trips/${response.data.book._id}`)  <--- Pushes to unique trip.
        this.props.history.push(`/trips/${this.state.trip._id}`)
      })
      .catch(console.error)
  }

  render () {
    return (
      <DestinationForm
        destination={this.state.destination}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default withRouter(AddDestination)
