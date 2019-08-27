import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { indexTrips } from './api'

class Trips extends Component {
  // constructor
  constructor () {
    super()

    this.state = {
      trips: []
    }
  }

  async componentDidMount () {
    const { user } = this.props
    try {
      const response = await
      indexTrips(user)
      this.setState({ trips: response.data.trips })
      console.log('response ', response.data)
    } catch (error) {
      console.error(error)
    }
  }

  render () {
    // const destinations = this.state.trips._destinations
    const destinationList = function (destinations) {
      if (destinations) {
        return (
          <ul>
            {destinations.map(location => (
              <li key={location._id}>
                <p>Stop {destinations.indexOf(location) + 1}</p>
                <p>{location}</p>
              </li>
            ))}
          </ul>
        )
      }
    }
    const tripsJsx = this.state.trips.filter(trip => trip.owner === this.props.user._id).map(trip => (
      <div key={trip._id}>
        <li>
          <Link to={`trips/${trip._id}`}>{trip.name}</Link>
          { trip._destinations && destinationList(trip._destinations) }
        </li>
      </div>
    ))
    return (
      <Fragment>
        <h4>Trips</h4>
        { this.state.trips.length > 0 ? tripsJsx : 'Loading...' }
      </Fragment>
    )
  }
}

export default Trips
