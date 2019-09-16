import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import "./DoctorIntro.css";
// import doctorImage from "../images/doctor.png";
import avatar from "../images/avatar.png";

class DoctorIntro extends React.Component {
  render() {
    const {
      name,
      specialization,
      location,
      reviewCount,
      starsGiven,
      desc,
      rate
    } = this.props.info;
    let starDoms = [];
    let startIndex = 0;
    while (startIndex < starsGiven) {
      starDoms.push(
        <span key={startIndex} className="fa fa-star checked"></span>
      );
      startIndex++;
    }
    while (startIndex < 5) {
      starDoms.push(<span key={startIndex} className="fa fa-star"></span>);
      startIndex++;
    }

    return (
      <div className="doctor-intro">
        <Row>
          <Col className="image-left">
            <Image src={avatar} roundedCircle />
          </Col>
          <Col className="intro-right">
            <h4>{name}</h4>
            <span className="profession-text">{specialization}</span>
            <span> | </span>
            <span className="location-text">{location}</span>
            <div className="star-ratings">
              {starDoms}
              <span className="reviews"> ({reviewCount})</span>
            </div>
            <div className="rate">
              R${rate} / 50 Minutes
            </div>
          </Col>
        </Row>
        <Row>
          <div className="description-bottom">
            {desc}
          </div>
        </Row>
      </div>
    );
  }
}

export default DoctorIntro;
