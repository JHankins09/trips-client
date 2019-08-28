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
  return axios({
    method: 'POST',
    url: `${apiUrl}/destinations`,
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: { destination }
  })
}

export const showDestination = (user, id) => {
  return axios({
    method: 'GET',
    url: apiUrl + `/destinations/${id}`,
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const deleteDestination = (destination, user) => {
  return (axios({
    method: 'DELETE',
    url: `${apiUrl}/destinations/${destination}`,
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  }))
}

export const updateDestination = (destination, user) => {
  console.log('Here is what we are F`in with... ', destination)
  return (axios({
    method: 'PATCH',
    url: `${apiUrl}/destinations/${destination._id}`,
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: { destination }
  }))
}
