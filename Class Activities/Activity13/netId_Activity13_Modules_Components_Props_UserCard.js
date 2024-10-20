// UserCards.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card } from 'react-bootstrap';

export function UserCard({ picture, name, amount, married, points, address }) {
  return (
    <Container className="p-4">
      <Card style={{ width: '15rem' }}>
        <Card.Img variant="top" src={picture} alt={`${name}'s picture`} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>Salary: 💲{amount}</Card.Text>
          <Card.Text>{married ? "Married" : "Single"}</Card.Text>
          <Card.Text>Address:</Card.Text>
          <ul>
            <li>Street: {address.street}</li>
            <li>City: {address.city}</li>
            <li>State: {address.state}</li>
          </ul>
          <Card.Text>Points: {points.join(', ')}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
