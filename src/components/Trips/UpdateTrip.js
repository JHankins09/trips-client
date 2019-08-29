import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { updateTrip } from './api'
import Form from 'react-bootstrap/Form'

import TripForm from './tripsForm.js'

class UpdateTrip extends Component {
    state = {
      trip: {
        _id: this.props.trip._id
      }
    }

  handleChange = event => {
    this.setState({ trip: { ...this.state.trip, [event.target.name]: event.target.value } })
  }

  handleSubmit = event => {
    event.preventDefault()
    updateTrip(this.state.trip, this.props.user)
      .then((response) => {
        this.props.history.push(`/trips/${this.state.trip._id}`)
        // this.props.history.push('/trips')
      })
      .catch(console.error)
  }

  render () {
    let updateTrip = ''
    const { trip } = this.props
    const shouldUpdate = (handleChange) => {
      if (trip.destinations.length > 1) {
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
    }
    shouldUpdate()
    return (
      <TripForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        trip={this.state.trip}
        updateTrip={updateTrip}
        placeHolderTrip={this.props.trip}
      />
    )
  }
}

export default withRouter(UpdateTrip)
