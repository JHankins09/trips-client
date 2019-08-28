import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { addDestination } from './api'
import { updateTrip, showTrip } from '../Trips/api'

import DestinationForm from './DestinationsForm.js'

class AddDestination extends Component {
  state = {
    destination: {
      name: '',
      time_spent: '',
      pit: '',
      peak: ''
    },
    trip: {}
  }

  handleChange = event => {
    this.setState({ destination: { ...this.state.destination, [event.target.name]: event.target.value } })
  }

  handleSubmit = event => {
    event.preventDefault()
    addDestination(this.state.destination, this.state.user, this.state.trip)
      .then((response) => {
        this.state.trip.destinations.push(response.data.destination._id)
        updateTrip(this.state.trip, this.state.user)
          .then((response2) => {
            showTrip(this.state.user, this.state.trip._id)
              .then((response3) => {
                console.log('Response Data => ', response3)
                this.props.history.push(`/trips/${response3.data.trip._id}`)
              })
          })
      })
      .catch(console.error)
  }

  async componentDidMount () {
    try {
      this.setState({ user: this.props.user })
      this.setState({ trip: this.props.trip })
      this.setState({ destination: {
        trip: this.props.trip._id
      } })
    } catch (error) {
      console.error(error)
    }
  }

  render () {
    return (
      <DestinationForm
        destination={this.state.destination}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        tripId={this.state.trip._id}
      />
    )
  }
}

export default withRouter(AddDestination)
