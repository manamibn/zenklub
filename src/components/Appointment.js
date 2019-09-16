import React from "react";
import { Col, Modal, Row, Table } from "react-bootstrap";
import moment from "moment";
import "./appointment.css";

class Appointment extends React.Component {
  state = {
    startDate: "8/1/2019",
    endDate: "10/30/2019",
    currentDate1: moment().format("MM/DD/YYYY"),
    currentDate2: moment().add(1, 'days').format("MM/DD/YYYY"),
    currentDate3: moment().add(2, 'days').format("MM/DD/YYYY"),
    currentDate4: moment().add(3, 'days').format("MM/DD/YYYY"),
    isLoading: false,
    error: null,
    schedules: {}
  };

  componentDidMount() {
    fetch("https://api.myjson.com/bins/umh8l")
      .then(response => response.json())
      .then(data => this.setState({ schedules: data }));
  }

  renderCalendar = () => {
    const { currentDate1, currentDate2, currentDate3, currentDate4 } = this.state;
    console.log(currentDate1);
    console.log(currentDate2);
    console.log(currentDate3);
    console.log(currentDate4);
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return (
      <Row>
        <Col sm={2}>
          <span className="date-nav-btn">{'<'}</span>
        </Col>
        <Col sm={2}>
            <div className="center-text">{days[moment(currentDate1).day()]}</div>
            <div className="center-text">{moment(currentDate1).format('MMM DD')}</div>
        </Col>
        <Col sm={2}>
            <div className="center-text">{days[moment(currentDate2).day()]}</div>
            <div className="center-text">{moment(currentDate2).format('MMM DD')}</div>
        </Col>
        <Col sm={2}>
            <div className="center-text">{days[moment(currentDate3).day()]}</div>
            <div className="center-text">{moment(currentDate3).format('MMM DD')}</div>
        </Col>
        <Col sm={2}>
            <div className="center-text">{days[moment(currentDate4).day()]}</div>
            <div className="center-text">{moment(currentDate4).format('MMM DD')}</div>
        </Col>
        <Col sm={2}>
          <span className="date-nav-btn">{'>'}</span>
        </Col>
      </Row>
    );
  }

  renderSchedules = () => {
    const { currentDate1, currentDate2, currentDate3, currentDate4, schedules } = this.state;
    
    return (
        <Row>
          <Col sm={2} />
          <Col sm={8}>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td>{schedules[currentDate1] && schedules[currentDate1].slot1 !== 'na' ? '8:00' : '-'}</td>
                  <td>{schedules[currentDate2] && schedules[currentDate2].slot1 !== 'na' ? '8:00' : '-'}</td>
                  <td>{schedules[currentDate3] && schedules[currentDate3].slot1 !== 'na' ? '8:00' : '-'}</td>
                  <td>{schedules[currentDate4] && schedules[currentDate4].slot1 !== 'na' ? '8:00' : '-'}</td>
                </tr>
                <tr>
                  <td>{schedules[currentDate1] && schedules[currentDate1].slot2 !== 'na' ? '8:30' : '-'}</td>
                  <td>{schedules[currentDate2] && schedules[currentDate2].slot2 !== 'na' ? '8:30' : '-'}</td>
                  <td>{schedules[currentDate3] && schedules[currentDate3].slot2 !== 'na' ? '8:30' : '-'}</td>
                  <td>{schedules[currentDate4] && schedules[currentDate4].slot2 !== 'na' ? '8:30' : '-'}</td>
                </tr>
                <tr>
                  <td>{schedules[currentDate1] && schedules[currentDate1].slot3 !== 'na' ? '9:00' : '-'}</td>
                  <td>{schedules[currentDate2] && schedules[currentDate2].slot3 !== 'na' ? '9:00' : '-'}</td>
                  <td>{schedules[currentDate3] && schedules[currentDate3].slot3 !== 'na' ? '9:00' : '-'}</td>
                  <td>{schedules[currentDate4] && schedules[currentDate4].slot4 !== 'na' ? '9:00' : '-'}</td>
                </tr>
                <tr>
                  <td>{schedules[currentDate1] && schedules[currentDate1].slot4 !== 'na' ? '9:30' : '-'}</td>
                  <td>{schedules[currentDate2] && schedules[currentDate2].slot4 !== 'na' ? '9:30' : '-'}</td>
                  <td>{schedules[currentDate3] && schedules[currentDate3].slot4 !== 'na' ? '9:30' : '-'}</td>
                  <td>{schedules[currentDate4] && schedules[currentDate4].slot4 !== 'na' ? '9:30' : '-'}</td>
                </tr>
                <tr>
                  <td>{schedules[currentDate1] && schedules[currentDate1].slot5 !== 'na' ? '10:00' : '-'}</td>
                  <td>{schedules[currentDate2] && schedules[currentDate2].slot5 !== 'na' ? '10:00' : '-'}</td>
                  <td>{schedules[currentDate3] && schedules[currentDate3].slot5 !== 'na' ? '10:00' : '-'}</td>
                  <td>{schedules[currentDate4] && schedules[currentDate4].slot5 !== 'na' ? '10:00' : '-'}</td>
                </tr>
                <tr>
                  <td>{schedules[currentDate1] && schedules[currentDate1].slot6 !== 'na' ? '10:30' : '-'}</td>
                  <td>{schedules[currentDate2] && schedules[currentDate2].slot6 !== 'na' ? '10:30' : '-'}</td>
                  <td>{schedules[currentDate3] && schedules[currentDate3].slot6 !== 'na' ? '10:30' : '-'}</td>
                  <td>{schedules[currentDate4] && schedules[currentDate4].slot6 !== 'na' ? '10:30' : '-'}</td>
                </tr>
                <tr>
                  <td>{schedules[currentDate1] && schedules[currentDate1].slot7 !== 'na' ? '11:00' : '-'}</td>
                  <td>{schedules[currentDate2] && schedules[currentDate2].slot7 !== 'na' ? '11:00' : '-'}</td>
                  <td>{schedules[currentDate3] && schedules[currentDate3].slot7 !== 'na' ? '11:00' : '-'}</td>
                  <td>{schedules[currentDate4] && schedules[currentDate4].slot7 !== 'na' ? '11:00' : '-'}</td>
                </tr>
                <tr>
                  <td>{schedules[currentDate1] && schedules[currentDate1].slot8 !== 'na' ? '11:30' : '-'}</td>
                  <td>{schedules[currentDate2] && schedules[currentDate2].slot8 !== 'na' ? '11:30' : '-'}</td>
                  <td>{schedules[currentDate3] && schedules[currentDate3].slot8 !== 'na' ? '11:30' : '-'}</td>
                  <td>{schedules[currentDate4] && schedules[currentDate4].slot8 !== 'na' ? '11:30' : '-'}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col sm={2} />
        </Row>
    );
  }

  render() {
    return (
      <div className="appointment">
        {this.state.isLoading && <span>Loading...</span>}
        <Modal.Dialog>
          <Modal.Header className="calendar-header">
            <div className="title-text">
              <div className="main-text">Schedule your session!</div>
              <div className="timezone">Timezone: Lisbon (+1)</div>
            </div>
          </Modal.Header>
          <Modal.Body>
            {this.renderCalendar()}
          </Modal.Body>
        </Modal.Dialog>
        <Modal.Dialog>
          <Modal.Body>
            {this.renderSchedules()}
          </Modal.Body>
        </Modal.Dialog>
        {this.state.error}
      </div>
    );
  }
}

export default Appointment;
