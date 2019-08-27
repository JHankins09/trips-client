import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import Trips from '../Trips/Trips'
import CreateTrip from '../Trips/CreateTrip'
import Trip from '../Trips/Trip'
import UpdateTrip from '../Trips/UpdateTrip'
import AddDestination from '../Destinations/AddDestination.js'
import DeleteTrip from '../Trips/DeleteTrip'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: [],
      trip: null
    }
  }

  setTrip = trip => this.setState({ trip })

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = ({ heading, message, variant }) => {
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
  }

  render () {
    const { alerts, user, trip } = this.state

    return (
      <Fragment>
        <Header user={user} trip={trip}/>
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            heading={alert.heading}
            variant={alert.variant}
            message={alert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute exact user={user} path='/trips' render={() => (
            < Trips alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute exact user={user} path='/createtrip/' render={() => (
            <CreateTrip user={user} />
          )} />
          <AuthenticatedRoute exact user={user} path='/trips/:id' render={() => (
            < Trip user={user} setTrip={this.setTrip} />
          )} />
          <AuthenticatedRoute exact user={user} path='/trips/:id/edit' render={() => (
            < UpdateTrip user={user} trip={trip}/>
          )} />
          <AuthenticatedRoute exact user={user} path='/trips/:id/add-destination' render={() => (
            < AddDestination user={user} trip={trip} />
          )} />
          <AuthenticatedRoute exact user={user} path='/trips/:id/delete' render={() => (
            < DeleteTrip user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
