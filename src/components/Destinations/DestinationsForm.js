import React, { Fragment } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const DestinationsForm = ({ destination, handleChange, handleSubmit, placeHolderDestination, tripId, updateDestination }) => (

  <Form onSubmit={ handleSubmit }>
    { !updateDestination
      ? <Fragment>
        <Form.Group controlId="name">
          <Form.Label>Destination</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Where you headed?"
            value={destination.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="time_spent">
          <Form.Label>How long will you stay?</Form.Label>
          <Form.Control
            name="time_spent"
            type="number"
            placeholder="In days, please."
            value={destination.time_spent}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </Fragment>
      : <Fragment>
        <Form.Group controlId="name">
          <Form.Label>Change of plans?</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder={placeHolderDestination.name}
            value={destination.name !== '' ? destination.name : placeHolderDestination.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="time_spent">
          <Form.Label>How long will you stay?</Form.Label>
          <Form.Control
            name="time_spent"
            type="number"
            placeholder={placeHolderDestination.time_spent}
            value={destination.time_spent}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="peak">
          <Form.Label>What was the best part of {destination.name ? destination.name : placeHolderDestination.name}?</Form.Label>
          <Form.Control
            name="peak"
            type="text"
            placeholder={placeHolderDestination.peak}
            value={destination.peak}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="pit">
          <Form.Label>Where was the most room for improvement?</Form.Label>
          <Form.Control
            name="pit"
            type="text"
            placeholder={placeHolderDestination.pit}
            value={destination.pit}
            onChange={handleChange}
          />
        </Form.Group>

      </Fragment>}

    <Button variant="primary" type="submit">
      Submit
    </Button>

  </Form>
)

export default DestinationsForm
