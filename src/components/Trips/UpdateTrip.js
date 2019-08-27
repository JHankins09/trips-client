import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { createTrip } from './api'
import Form from 'react-bootstrap/Form'

import TripForm from './tripsForm.js'

class CreateTrip extends Component {
  state = {
    trip: {}
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
        // this.props.history.push(`/trips/${response.data.book._id}`)  <--- Pushes to unique trip.
        this.props.history.push('/trips')
      })
      .catch(console.error)
  }

  render () {
    let updateTrip = ''
    const shouldUpdate = (handleChange) => {
      if (this.state.trip._duration > 1) {
        updateTrip = (
          <Fragment>
            <Form.Check
              type={'checkbox'}
              name='completed'
              value={true}
              label={'Have you completed your trip?'}
              onChange={handleChange}
            />
          </Fragment>
        )
      }
      if (this.state.trip._duration < 2) {
        updateTrip = (
          <Fragment>
            <h1>Time to add some destinations!</h1>
          </Fragment>
        )
      }
    }
    shouldUpdate()
    return (
      <TripForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        trip={this.state.trip}
        updateTrip={updateTrip}
      />
    )
  }
}

export default withRouter(CreateTrip)
