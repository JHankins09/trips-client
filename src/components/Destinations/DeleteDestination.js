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
    const removeTrip = () => {
      let array1 = []
      let array2 = []
      const tripStops = []
      for (let i = 0; i < Object.keys(newTrip.destinations).length; i++) {
        tripStops.push(newTrip.destinations[i]._id)
      }
      array1 = tripStops.slice(0, tripStops.indexOf(destination))
      array2 = tripStops.slice(tripStops.indexOf(destination))
      newTrip.destinations = array1.concat(array2)
    }
    removeTrip()
    this.setState({ trip: newTrip })

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
