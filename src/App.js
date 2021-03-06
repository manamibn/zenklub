import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Appointment from './components/Appointment';
import DoctorIntro from './components/DoctorIntro';
import { profile } from './data/profile';

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <DoctorIntro info={profile} />
        </Col>
        <Col>
          <Appointment />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
