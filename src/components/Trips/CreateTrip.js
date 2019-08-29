import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { createTrip } from './api'

import TripForm from './tripsForm.js'

class CreateTrip extends Component {
  state = {
    trip: {
      type: 'Road Trip',
      private: false,
      completed: false
    }
  }

  handleChange = event => {
    this.setState({ trip: { ...this.state.trip, [event.target.name]: event.target.value } })
  }

  handleSubmit = event => {
    event.preventDefault()
    let createdTrip = {}
    const { user, setTrip } = this.props
    createTrip(this.state.trip, user)
      .then((response) => {
        console.log('This is the created trip => | ', response)
        this.setState({ trips: response.data.trip })
        createdTrip = response.data.trip
        console.log('The current trip is => | ', createdTrip)
      })
      .then(() =>
        setTrip(createdTrip))
      .then(() => {
        this.props.history.push(`/trips/${createdTrip._id}/add-destination`)
      })
      .catch(console.error)
  }

  async componentDidMount () {
    try {
      this.props.clearTrip()
    } catch (error) {
      console.error(error)
    }
  }

  render () {
    return (
      <TripForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        trip={this.state.trip}
        updateTrip={null}
        placeHolderTrip={this.state.trip}
      />
    )
  }
}

export default withRouter(CreateTrip)
