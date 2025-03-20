import React from 'react';
import { Link } from 'react-router-dom';
import './AllTeam.css'; // Import AllTeam.css
import Areeb from "../assets/Areeb.jpg";
import Vaishal from "../assets/Vaishal.jpg";
import Aarushi from "../assets/Aarushi.jpg";
import Yash from "../assets/Yash.jpg";
import Vaibhav from "../assets/Vaibhav.JPG"
import Rahul from "../assets/Rahul.png"
import Soumya from "../assets/Soumya.jpg"
import Vanessa from "../assets/Vanessa.jpg"
import Rishil from "../assets/Rishil_2.JPG"
import Ayush from "../assets/Ayush.jpg"
import Ekanshi from "../assets/Ekanshi.jpg"
import Muskan from "../assets/Muskan.jpg"
import TeamPhoto from "../assets/Team_Photo.JPG";

const AllTeamMembers = () => {
  const teamMembers = [
    { id: 1, name: 'Areeb Salsabil', position: 'President', email: 'salsabil.a@northeastern.edu', image: Areeb },
    { id: 2, name: 'Vaishal Jariwala', position: 'Vice President', email: 'jariwala.va@northeastern.edu', image: Vaishal },
    { id: 3, name: 'Aarushi Sharma', position: 'Vice President', email: 'sharma.aarush@northeastern.edu', image: Aarushi },
    { id: 4, name: 'Yash Trivedi', position: 'Project Manager Head', email: 'trivedi.y@northeastern.edu', image: Yash },
    { id: 5, name: 'Vaibhav Patil', position: 'Project Manager Head', email: 'patil.vai@northeastern.edu', image: Vaibhav },
    { id: 10, name: 'Vanessa Magana', position: 'Project Manager', email: 'magana.v@northeastern.edu', image: Vanessa },
    { id: 6, name: 'Rahul Prajapati', position: 'Technical Head', email: 'prajapati.rah@northeastern.edu', image: Rahul },
    { id: 7, name: 'Soumya Singh', position: 'UI/UX Designer', email: 'singh.soumy@northeastern.edu', image: Soumya },
    { id: 8, name: 'Muskan Purkar', position: 'Outreach Partner', email: 'purkar.m@northeastern.edu', image: Muskan },
    { id: 9, name: 'Ayush', position: 'Social Media Manager', email: 'sharma.aarush@northeastern.edu', image: Ayush },
    { id: 10, name: 'Ekanshi Sharma', position: 'Social Media Manager', email: 'sharma.aarush@northeastern.edu', image: Ekanshi },
    { id: 11, name: 'Rishil', position: 'Social Media Manager', email: 'sharma.aarush@northeastern.edu', image: Rishil }   
    
  ];

  return (
    <div>
      {/* First Section: Full-width background with team photo and heading */}
      <section className="team-hero-section">
        <div className="team-hero-content">
          <img src={TeamPhoto} alt="Our Team" className="team-hero-image" />
          {/* <h1 className="team-hero-title">Our Team</h1> */}
        </div>
      </section>

      {/* Second Section: Grid layout for team members */}
      <section className="team-grid-section">
        <div className="container">
          <div className="row">
            {teamMembers.map(member => (
              <div key={member.id} className="col-lg-3 col-md-4 col-sm-6 text-center mb-4">
                <div className="team-member-square">
                  <img src={member.image} alt={member.name} className="team-member-square-image" />
                  <h3 className="team-member-square-name">{member.name}</h3>
                  <p className="team-member-square-position">{member.position}</p>
                  <p className="team-member-square-email">{member.email}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Back to Home Button inside the second section */}
          <div className="text-center mt-4">
            <Link to="/" className="see-all-btn">
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllTeamMembers;