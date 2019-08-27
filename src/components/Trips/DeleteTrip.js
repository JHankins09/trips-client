import { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { deleteTrip, indexTrips } from './api'

class DeleteTrip extends Component {
  componentDidMount () {
    const { history, user } = this.props

    console.log('User | ', user)
    console.log('Trip | ', this.props.match.params.id)
    const trip = this.props.match.params.id
    console.log('Trip II | ', trip)

    deleteTrip(trip, user)
      .then(indexTrips(user))
      .finally(() => history.push('/trips'))
  }

  render () {
    return ''
  }
}

export default withRouter(DeleteTrip)
