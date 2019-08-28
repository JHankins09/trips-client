import apiUrl from '../../apiConfig'
import axios from 'axios'

// Show Trip Request
export const showTrip = (user, id) => {
  return axios({
    method: 'GET',
    url: apiUrl + `/trips/${id}`,
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

// Index Trips Request!
export const indexTrips = user => {
  return axios({
    method: 'GET',
    url: apiUrl + '/trips',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

// Create Trip Request
export const createTrip = (trip, user) => {
  console.log('user info is ', user, 'trip info is ', trip)
  return axios({
    method: 'POST',
    url: `${apiUrl}/trips`,
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      trip: {
        name: trip.name,
        type: trip.type,
        private: trip.private,
        completed: trip.completed,
        _duration: trip._duration
      }
    }
  })
}

// Update Trip Requiest
export const updateTrip = (trip, user) => {
  console.log('Patch Trip Is ', trip)
  return axios({
    method: 'PATCH',
    url: `${apiUrl}/trips/${trip._id}`,
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: { trip }
  })
}

// Delete Trip Request
export const deleteTrip = (trip, user) => {
  return (axios({
    method: 'DELETE',
    url: `${apiUrl}/trips/${trip}`,
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  }))
}
