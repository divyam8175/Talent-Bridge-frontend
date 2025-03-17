import React from "react";
import { FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io"

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "500+",
      subTitle: "Live Members",
      icon: <FaUsers />,
    },
    {
      id: 2,
      title: "50+",
      subTitle: "Teams",
      icon: <FaSuitcase />,
    },
    {
      id: 3,
      title: "500+",
      subTitle: "Enthusiasts",
      icon: <IoIosPeople />,
    },
    {
      id: 4,
      title: "100+",
      subTitle: "Seniors",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <>
      <div className="heroSection">
        <div className="container">
          <div className="title">
            <h1 className="hero-heading">Find a team that suits</h1>
            <h1>your interests and skills</h1>
            <p>
              Welcome to Talent Bridge - A platform where talent meets its destination. Chin up, be a part of the journey and keep yourself thrilled for exciting opportunities.
            </p>
          </div>
          <div className="image">
            <img src="hero1.png" alt="hero" />
          </div>
        </div>
        <div className="details">
          {details.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="icon">{element.icon}</div>
                <div className="content">
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HeroSection;