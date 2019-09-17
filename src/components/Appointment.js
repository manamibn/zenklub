import React from "react";
import { Col, Modal, Row} from "react-bootstrap";
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
    schedules: {},
    showMore: false
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch("https://api.myjson.com/bins/hvf05")
      .then(response => response.json())
      .then(data => this.setState({ schedules: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
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

  toggleShowMore = () => {
    this.setState({showMore: !this.state.showMore});
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
    const { currentDate1, currentDate2, currentDate3, currentDate4, schedules, showMore } = this.state;
    const getClassName = (booked) => booked ? 'center-text active-slot disabled' : 'center-text active-slot enabled';
    const slots = ['8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00'];
    let i = 0;
    const rows = [[], [], [], [], [], [], [], []];
    if(Object.keys(schedules).length) {
      while (i < 8) {
        const slotName = `slot${i+1}`;
        if (schedules[currentDate1]) {
          const day1Slot = schedules[currentDate1][slotName];
          rows[i].push(<Col className={getClassName(day1Slot)}>{day1Slot !== 'na' ? slots[i] : '-'}</Col>);
        } else {
          rows[i].push(<Col className="center-text active-slot">-</Col>);
        }
        if (schedules[currentDate2]) {
          const day2Slot = schedules[currentDate2][slotName];
          rows[i].push(<Col className={getClassName(day2Slot)}>{day2Slot !== 'na' ? slots[i] : '-'}</Col>);
        } else {
          rows[i].push(<Col className="center-text active-slot">-</Col>);
        }
        if (schedules[currentDate3]) {
          const day3Slot = schedules[currentDate3][slotName];
          rows[i].push(<Col className={getClassName(day3Slot)}>{day3Slot !== 'na' ? slots[i] : '-'}</Col>);
        } else {
          rows[i].push(<Col className="center-text active-slot">-</Col>);
        }
        if (schedules[currentDate4]) {
          const day4Slot = schedules[currentDate4][slotName];
          rows[i].push(<Col className={getClassName(day4Slot)}>{day4Slot !== 'na' ? slots[i] : '-'}</Col>);
        } else {
          rows[i].push(<Col className="center-text active-slot">-</Col>);
        }
        i++;
      }
    }
    return (
        <Row>
          <Col sm={2} />
          <Col sm={8} className="schedule-table">
            <Row>{rows[0]}</Row>
            <Row>{rows[1]}</Row>
            <Row>{rows[2]}</Row>
            <Row>{rows[3]}</Row>
            {showMore && (
              <div>
                <Row>{rows[4]}</Row>
                <Row>{rows[5]}</Row>
                <Row>{rows[6]}</Row>
                <Row>{rows[7]}</Row>
              </div>
            )}
            <Row>
              <button className="show-more-btn" onClick={this.toggleShowMore}>{showMore ? 'Show Less' : 'Show More'}</button>
            </Row>
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
