import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
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

    let destinationJsx = 'Loading'
    if (trip.destinations) {
      destinationJsx = this.state.trip.destinations.map(stop => (
        <li key={stop._id}>
          Stop {this.state.trip.destinations.indexOf(stop) + 1} is: <Link to={`/trips/${trip._id}/destinations/${stop._id}`}>{stop.name}</Link>
        </li>
      ))
    }

    return (
      <Fragment>
        {trip && (
          <Fragment>
            <h1>{trip.name}</h1>
            <h2>{trip.type || 'No Author Available'}</h2>
            <ul>
              {destinationJsx}
              {addDestination}
              {editButton}
              {deleteButton}
            </ul>
          </Fragment>
        )}
      </Fragment>
    )
  }
}

export default withRouter(Trip)
