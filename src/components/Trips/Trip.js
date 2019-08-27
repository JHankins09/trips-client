import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { showTrip } from './api'
import Button from 'react-bootstrap/Button'

class Trip extends Component {
  state = {
    trip: {}
  }

  async componentDidMount () {
    const { user, setTrip } = this.props
    const id = this.props.match.params.id
    try {
      showTrip(user, id)
        .then((response) =>
          this.setState({ trip: response.data.trip }))
        .then(() =>
          setTrip(this.state.trip))
    } catch (error) {
      console.error(error)
    }
  }
  // render
  render () {
    // return
    const { trip } = this.state

    let editButton = ''

    const fillEditButton = () => {
      if (this.props.user && trip) {
        if (this.props.user._id === trip.owner) {
          editButton = (
            <Button href={`#trips/${trip._id}/edit`}>Edit Trip</Button>
          )
        }
      }
    }
    fillEditButton()

    const deleteButton = (<Button href={`#trips/${trip._id}/delete`}>Delete trip</Button>)

    const addDestination = (
      <Button href={`#trips/${trip._id}/add-destination`}>Add a destination</Button>
    )

    return (
      <Fragment>
        {trip && (
          <Fragment>
            <h1>{trip.name}</h1>
            <h2>{trip.type || 'No Author Available'}</h2>
            {addDestination}
            {editButton}
            {deleteButton}
          </Fragment>
        )}
      </Fragment>
    )
  }
}

export default withRouter(Trip)
