import { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { deleteTrip, indexTrips } from './api'

class DeleteTrip extends Component {
  componentDidMount () {
    const { history, user } = this.props
    const trip = this.props.match.params.id
    deleteTrip(trip, user)
      .then(indexTrips(user))
      .finally(() => history.push('/trips'))
  }

  render () {
    return ''
  }
}

export default withRouter(DeleteTrip)
