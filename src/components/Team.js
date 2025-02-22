import React from 'react';
import './Team.css';
import Areeb from "../assets/Areeb.jpg"
import Vaishal from "../assets/Vaishal.jpg"
import Aarushi from "../assets/Aarushi.jpg"

const Team = () => {
  return (
    <section className="team-section py-5">
      <div className="container">
          <h2 className="team-title text-center mb-5">Meet Our Team</h2>
        <div className="row justify-content-center">
          {/* Team Member 1: President */}
          <div className="col-md-4 text-center mb-4">
            <img
              src={Areeb}
              alt="President"
              className="team-image"
            />
            <h3 className="team-name">Areeb Salsabil</h3>
            <p className="team-designation">President</p>
            <p className="team-email">salsabil.a@northeastern.edu</p>
          </div>

          {/* Team Member 2: Vice President */}
          <div className="col-md-4 text-center mb-4">
            <img
              src={Vaishal}
              alt="Vice President"
              className="team-image"
            />
            <h3 className="team-name">Vaishal Jariwala</h3>
            <p className="team-designation">Vice President</p>
            <p className="team-email">jariwala.va@northeastern.edu</p>
          </div>

          {/* Team Member 3: Vice President */}
          <div className="col-md-4 text-center mb-4">
            <img
              src={Aarushi}
              alt="Vice President"
              className="team-image"
            />
            <h3 className="team-name">Aarushi Sharma</h3>
            <p className="team-designation">Vice President</p>
            <p className="team-email">sharma.aarush@northeastern.edu</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;