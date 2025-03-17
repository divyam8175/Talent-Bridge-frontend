import React from "react";
import { GrTechnology } from "react-icons/gr";
import {  GiMusicalNotes } from "react-icons/gi";
import { MdElectricalServices } from "react-icons/md";

const PopularTeams = () => {
  const teams = [
    {
      id: 1,
      title: "PCON",
      location: "Technical Team",
      openPositions: 10,
      icon: <GrTechnology />,
    },
    {
      id: 2,
      title: "Team Rooh",
      location: "Cultural Team",
      openPositions: 5,
      icon: <GiMusicalNotes />,
    },
    {
      id: 3,
      title: "EES",
      location: "Branch Society",
      openPositions: 20,
      icon: <MdElectricalServices />,
    },
  ];
  return (
    <div className="companies">
      <div className="container">
        <h3>POPULAR TEAMS</h3>
        <div className="banner">
          {teams.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="content">
                  <div className="icon">{element.icon}</div>
                  <div className="text">
                    <p>{element.title}</p>
                    <p>{element.location}</p>
                  </div>
                </div>
                <button>Positions Open</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularTeams;