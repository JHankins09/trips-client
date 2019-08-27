import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const DestinationsForm = ({ destination, handleChange, handleSubmit, updateDestination }) => (
  <Form onSubmit={ handleSubmit }>

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

    { updateDestination }

    <Button variant="primary" type="submit">
      Submit
    </Button>

  </Form>
)

export default DestinationsForm
