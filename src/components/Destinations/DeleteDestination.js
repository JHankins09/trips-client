import { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { deleteDestination } from './api'
import { updateTrip, showTrip } from '../Trips/api'

class DeleteDestination extends Component {
  state = {
    trip: {},
    destiantion: {}
  }

  componentDidMount () {
    const { history, user, trip } = this.props

    const destination = this.props.match.params.id
    let newTrip = {}
    newTrip = trip
    console.log('User | ', user)
    console.log('Trip II | ', trip)
    console.log('New Trip | ', newTrip)
    console.log('Original Destiations | ', newTrip.destinations)
    console.log('Destination | ', destination)
    console.log('History | ', history)
    console.log('Would have deleted!')
    const removeTrip = () => {
      let array1 = []
      let array2 = []
      const tripStops = []
      for (let i = 0; i < Object.keys(newTrip.destinations).length; i++) {
        tripStops.push(newTrip.destinations[i]._id)
      }
      array1 = tripStops.slice(0, tripStops.indexOf(destination))
      console.log('First array of destinations | ', array1)
      array2 = tripStops.slice(tripStops.indexOf(destination))
      console.log('Second array of destinations | ', array2)
      newTrip.destinations = array1.concat(array2)
      console.log('New array of destiantions | ', newTrip.destinations)
    }
    removeTrip()
    console.log('New Trip 2 | ', newTrip)
    this.setState({ trip: newTrip })
    console.log('This dot State dot Trip | ', this.state.trip)

    // history.push('/trips')

    deleteDestination(destination, user)
    updateTrip(newTrip, user)
      .then(showTrip(user, newTrip._id))
      .finally(() => history.push(`/trips/${newTrip._id}`))
  }

  render () {
    return ''
  }
}

export default withRouter(DeleteDestination)
