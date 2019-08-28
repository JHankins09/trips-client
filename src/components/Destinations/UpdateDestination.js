import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { updateDestination } from './api'
import { showTrip } from './../Trips/api.js'

import DestinationsForm from './DestinationsForm.js'

class UpdateDestination extends Component {
    state = {
      destination: {
        _id: this.props.destination._id
      }
    }

  handleChange = event => {
    this.setState({ destination: { ...this.state.destination, [event.target.name]: event.target.value } })
    console.log(this.state.destination)
  }

  handleSubmit = event => {
    event.preventDefault()
    updateDestination(this.state.destination, this.props.user)
      .then(showTrip(this.props.user, this.props.trip._id))
      .finally(() => this.props.history.push(`/trips/${this.props.trip._id}`))
  }

  async componentDidMount () {
  }

  render () {
    const shouldUpdate = (handleChange) => {
    }

    const updateDestination = true

    shouldUpdate()
    return (
      <DestinationsForm
        destination={this.state.destination}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        placeHolderDestination={this.props.destination}
        tripId={this.props.trip._id}
        updateDestination={updateDestination}
      />
    )
  }
}

export default withRouter(UpdateDestination)
