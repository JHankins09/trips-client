import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'

class Home extends Component {
  // render
  render () {
    const loggedinHome = () => (
      <Fragment>
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <Jumbotron variant="dark" className="jtron">

              <h1>Welcome, {this.props.user.email}!</h1>
              <p>
                    Adventure awaits - get started with some trips!
              </p>
              <p>
                <Button variant="dark" href='#/trips'>Go to your trips, now!</Button>
              </p>
            </Jumbotron>
          </div>
        </div>
      </Fragment>
    )

    const noLoginHome = () => (
      <Fragment>
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <Jumbotron variant="dark" className='jtron'>
              <h1>Hello, and welcome to Trips!</h1>
              <p>
                  This is a simple app, designed to help you create future adventure ideas!
                  Looking for a hike? Want to see the highlights of where you have been on
                  your road trip? Just add them to you account and you will be off in no time!
              </p>
              <p>
                <Button variant="dark" href="#/sign-up">get started</Button>
              </p>
            </Jumbotron>
          </div>
        </div>
      </Fragment>
    )

    return (
      <Fragment>
        { this.props.user ? loggedinHome() : noLoginHome() }
      </Fragment>
    )
  }
}

export default withRouter(Home)
