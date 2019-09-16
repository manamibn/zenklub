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

  onGoForward = () => {
    let { currentDate1, currentDate2, currentDate3, currentDate4 } = this.state;
    currentDate1 = moment(currentDate1).add(1, 'days').format("MM/DD/YYYY");
    currentDate2 = moment(currentDate2).add(1, 'days').format("MM/DD/YYYY");
    currentDate3 = moment(currentDate3).add(1, 'days').format("MM/DD/YYYY");
    currentDate4 = moment(currentDate4).add(1, 'days').format("MM/DD/YYYY");
    this.setState({ currentDate1, currentDate2, currentDate3, currentDate4  });
  }

  onGoBack = () => {
    let { currentDate1, currentDate2, currentDate3, currentDate4 } = this.state;
    currentDate1 = moment(currentDate1).subtract(1, 'days').format("MM/DD/YYYY");
    currentDate2 = moment(currentDate2).subtract(1, 'days').format("MM/DD/YYYY");
    currentDate3 = moment(currentDate3).subtract(1, 'days').format("MM/DD/YYYY");
    currentDate4 = moment(currentDate4).subtract(1, 'days').format("MM/DD/YYYY");
    this.setState({ currentDate1, currentDate2, currentDate3, currentDate4  });
  }

  renderCalendar = () => {
    const { currentDate1, currentDate2, currentDate3, currentDate4 } = this.state;
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return (
      <Row>
        <Col sm={2}>
          <span
            className="date-nav-btn"
            onClick={this.onGoBack}
          >
            {'<'}
          </span>
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
          <span 
            className="date-nav-btn"
            onClick={this.onGoForward}
          >
            {'>'}
          </span>
        </Col>
      </Row>
    );
  }

  renderSchedules = () => {
    const { currentDate1, currentDate2, currentDate3, currentDate4, schedules } = this.state;
    const getClassName = (booked) => booked ? 'center-text active-slot disabled' : 'center-text active-slot';
    const slots = ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30'];
    let i = 0;
    const rows = [[], [], [], [], [], [], [], []];
    if(Object.keys(schedules).length) {
      while (i < 8) {
        const slotName = `slot${i+1}`;
        if (schedules[currentDate1]) {
          rows[i].push(<Col className={getClassName(schedules[currentDate1][slotName])}>{schedules[currentDate1][slotName] !== 'na' ? slots[i] : '-'}</Col>);
          rows[i].push(<Col className={getClassName(schedules[currentDate2][slotName])}>{schedules[currentDate2][slotName] !== 'na' ? slots[i] : '-'}</Col>);
          rows[i].push(<Col className={getClassName(schedules[currentDate3][slotName])}>{schedules[currentDate3][slotName] !== 'na' ? slots[i] : '-'}</Col>);
          rows[i].push(<Col className={getClassName(schedules[currentDate4][slotName])}>{schedules[currentDate4][slotName] !== 'na' ? slots[i] : '-'}</Col>);
        }
        i++;
      }
    }
    return (
        <Row>
          <Col sm={2} />
          <Col sm={8}>
            <Row>{rows[0]}</Row>
            <Row>{rows[1]}</Row>
            <Row>{rows[2]}</Row>
            <Row>{rows[3]}</Row>
            <Row>{rows[4]}</Row>
            <Row>{rows[5]}</Row>
            <Row>{rows[6]}</Row>
            <Row>{rows[7]}</Row>
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
