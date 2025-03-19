import React from 'react';
import { Link } from 'react-router-dom';
import './Team.css'; // Import Team.css
import Areeb from "../assets/Areeb.jpg";
import Vaishal from "../assets/Vaishal.jpg";
import Aarushi from "../assets/Aarushi.jpg";

const Team = () => {
  const teamMembers = [
    { id: 1, name: 'Areeb Salsabil', position: 'President', email: 'salsabil.a@northeastern.edu', image: Areeb },
    { id: 2, name: 'Vaishal Jariwala', position: 'Vice President', email: 'jariwala.va@northeastern.edu', image: Vaishal },
    { id: 3, name: 'Aarushi Sharma', position: 'Vice President', email: 'sharma.aarush@northeastern.edu', image: Aarushi },
  ];

  return (
    <section id='team' className="team-section">
      {/* Unique class for the main team hero section */}
      <div className="main-team-hero-section">
        <div className="team-hero-content">
          {/* Unique class for the "Our Team" heading on the main team page */}
          <h1 className="main-team-hero-title">Our Team</h1>
        </div>
      </div>
      {/* Unique class for the main team grid section */}
      <div className="main-team-grid-section">
        <div className="container">
          <div className="row">
            {teamMembers.map(member => (
              <div key={member.id} className="col-lg-4 col-md-6 text-center mb-4">
                <img src={member.image} alt={member.name} className="team-image" />
                <h3 className="team-name">{member.name}</h3>
                <p className="team-designation">{member.position}</p>
                <p className="team-email">{member.email}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/team" className="see-all-btn">
              See All <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;