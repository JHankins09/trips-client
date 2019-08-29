import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { showDestination } from './api'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Badge from 'react-bootstrap/Badge'

class ShowDestination extends Component {
  state = {
    trip: {},
    destination: {}
  }

  async componentDidMount () {
    const { user, setDestination } = this.props
    try {
      this.setState({ trip: this.props.trip })
      const dest =
      await showDestination(user, this.props.match.params.id)
      this.setState({ destination: dest.data.destination })
      setDestination(this.state.destination)
    } catch (error) {
      console.error(error)
    }
  }

  // render
  render () {
    const { destination } = this.state
    const { trip } = this.props
    const stops = []
    for (let i = 0; i < Object.keys(trip.destinations).length; i++) {
      stops.push(trip.destinations[i]._id)
    }
    const peak = () => (
      destination.peak
        ? <div>
          <Badge variant='success'>Peak - {destination.peak}</Badge><hr/>
          <p>{destination.peak}</p>
        </div>
        : ''
    )
    const pit = () => (destination.pit
      ? <div>
        <Badge variant='danger'>Pit...</Badge> <hr/>
        <p>{destination.pit}</p>
      </div>
      : ''
    )

    return (
      <Fragment>
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <Jumbotron className='jtron'>
              <div key={destination._id}>
                <h3>{destination.name}</h3>
                <p>stop {stops.indexOf(destination._id) + 1} of {stops.length} on your journey!</p>
                <hr/>
                <p>{stops.indexOf(destination._id) + 1} down, {stops.length - (stops.indexOf(destination._id) + 1)} to go </p>
                <hr/>
                <div className='row d-flex justify-content-around'>
                  <Fragment>
                    { peak() }
                  </Fragment>
                  <Fragment>
                    { pit() }
                  </Fragment>
                </div>
              </div>
            </Jumbotron>
          </div>
        </div>
        <div className='row toolbar col-12 d-flex justify-content-around'>                  <Button variant='dark' href={`#/trips/${trip._id}/destinations/${destination._id}/edit`}>Edit this destination</Button>
          <Button variant='dark' href={`#/trips/${trip._id}/destinations/${destination._id}/delete`}>
              Delete this stop
          </Button>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(ShowDestination)
