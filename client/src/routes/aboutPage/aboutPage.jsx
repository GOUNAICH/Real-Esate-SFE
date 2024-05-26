import React from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./aboutPage.scss";

function AboutPage() {
  return (
    <div className="aboutPage">
      <div className="imgContainer">
        <img src="/logofinale.png" alt="Company Logo" />
      </div>
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">About Us</h1>
          <p>
            We are a leading company dedicated to providing top-notch services and innovative solutions. Our expert team works tirelessly to ensure exceptional results and client satisfaction in every project we undertake.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
