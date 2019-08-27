import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { addDestination } from './api'

import DestinationForm from './DestinationsForm.js'

class AddDestination extends Component {
  state = {
    destination: {
      name: '',
      time_spent: '',
      pit: '',
      peak: '',
      trip: ''
    }
  }

  handleChange = event => {
    this.setState({ destination: { ...this.state.destination, [event.target.name]: event.target.value } })
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log('props => ', this.props)
    const { user } = this.props
    const { trip } = this.props
    addDestination(this.state.destination, user, trip)
      .then((response) => {
        // this.props.history.push(`/trips/${response.data.book._id}`)  <--- Pushes to unique trip.
        this.props.history.push('/trips')
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
