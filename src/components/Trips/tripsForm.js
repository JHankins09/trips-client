import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'

const TripForm = ({ trip, handleChange, handleSubmit, updateTrip, placeHolderTrip }) => (
  <div className="row">
    <div className="col-sm-10 col-md-8 mx-auto mt-5">
      <Jumbotron className='jtron'>
        {updateTrip ? <h3>Making some changes?</h3> : <h3>Build it, do it, trip it</h3>}
        <Form onSubmit={ handleSubmit }>

          <Form.Group controlId="name">
            <Form.Label>Trip Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder={ placeHolderTrip.name ? placeHolderTrip.name : 'Name your adventure!' }
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="type">
            <Form.Label>Trip Type</Form.Label>
            <Form.Control
              name="type"
              as="select"
              placeholder={placeHolderTrip.type ? placeHolderTrip.type : ''}
              onChange={handleChange}
              required
            >
              <option>Road Trip</option>
              <option>Hiking</option>
              <option>Biking</option>
              <option>Camping</option>
              <option>Other</option>
            </Form.Control>
          </Form.Group>

          <Button variant="dark" type="submit">
            Submit
          </Button>

        </Form>
      </Jumbotron>
    </div>
  </div>
)

export default TripForm
