import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { createTrip } from './api'

import TripForm from './tripsForm.js'

class CreateTrip extends Component {
  state = {
    trip: {
      name: '',
      type: 'Road Trip',
      private: false,
      completed: false,
      _duration: 0
    }
  }

  handleChange = event => {
    this.setState({ trip: { ...this.state.trip, [event.target.name]: event.target.value } })
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log('event ', event)
    const { user } = this.props
    createTrip(this.state.trip, user)
      .then((response) => {
        this.props.history.push(`/trips/${response.data.trip._id}/add-destination`)
      })
      .catch(console.error)
  }

  render () {
    return (
      <TripForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        trip={this.state.trip}
        placeHolderTrip={this.state.trip}
      />
    )
  }
}

export default withRouter(CreateTrip)
