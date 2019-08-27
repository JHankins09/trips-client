import apiUrl from '../../apiConfig'
import axios from 'axios'

// Index Trips Request!

export const showTrip = (user, id) => {
  return axios({
    method: 'GET',
    url: apiUrl + `/trips/${id}`,
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const indexTrips = user => {
  return axios({
    method: 'GET',
    url: apiUrl + '/trips',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const addDestination = (destination, user, trip) => {
  console.log('user info is ', user, 'trip info is ', trip)
  return axios({
    method: 'POST',
    url: `${apiUrl}/destinations`,
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      destination: {
        name: destination.name,
        time_spent: destination.time_spent,
        trip: trip._id
      }
    }
  })
}
