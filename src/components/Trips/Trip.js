import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { showTrip } from './api'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'

class Trip extends Component {
  state = {
    trip: {}
  }

  async componentDidMount () {
    const { user, setTrip } = this.props
    const id = this.props.match.params.id
    try {
      showTrip(user, id)
        .then((response) =>
          this.setState({ trip: response.data.trip }))
        .then(() =>
          setTrip(this.state.trip))
    } catch (error) {
      console.error(error)
    }
  }
  // render
  render () {
    // return
    const { trip } = this.state

    let editButton = ''

    const fillEditButton = () => {
      if (this.props.user && trip) {
        if (this.props.user._id === trip.owner) {
          if (trip.destinations.length > 1) {
            editButton = (
              <Button variant="dark" href={`#trips/${trip._id}/edit`}>Edit Trip</Button>
            )
          } else {
            editButton = (
              <Fragment>
                <Badge variant='danger'>Min 2 destinations required to edit trip</Badge>
              </Fragment>
            )
          }
        }
      }
    }
    fillEditButton()

    const deleteButton = (<Button variant="dark"
      href={`#trips/${trip._id}/delete`}>
      Delete trip</Button>)

    const addDestination = (
      <Button variant="dark" href={`#trips/${trip._id}/add-destination`}>Add a destination</Button>
    )

    let destinationJsx = 'Loading'
    if (trip.destinations) {
      destinationJsx = this.state.trip.destinations.map(stop => (
        <Card style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '15px' }} key={stop._id} className='col-sm-8 col-md-5 col-lg-5 stopcard'>
          <Card.Body>
            <Card.Text>
              {`Dest. ${this.state.trip.destinations.indexOf(stop) + 1}:`}<br/>
              {stop.name}
            </Card.Text>
            <hr/>
            <Card.Text>
              {stop.peak || stop.pit
                ? <Fragment>
                  {stop.peak && <Badge variant="success">{stop.peak}</Badge>}
                  {stop.pit && <Badge variant="danger">{stop.pit}</Badge>}
                </Fragment>
                : '' }
            </Card.Text>
            <Button variant="dark" href={`#trips/${trip._id}/destinations/${stop._id}`}>See more</Button>
          </Card.Body>
        </Card>
      ))
    }

    return (
      <Fragment>
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <Jumbotron className='jtron'>
              {trip && (
                <Fragment>
                  <h1>{trip.name}</h1>
                  <Badge variant="warning">{trip.type} style adventure!</Badge>
                  <hr/>
                </Fragment>
              )}
              <div className='row d-flex justify-content-around'>
                {destinationJsx}
              </div>
            </Jumbotron>
          </div>
        </div>
        <div className='row toolbar col-12 d-flex justify-content-around'>
          {editButton}
          {addDestination}
          {deleteButton}
        </div>
      </Fragment>
    )
  }
}

export default withRouter(Trip)
