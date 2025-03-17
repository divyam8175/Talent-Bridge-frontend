import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How <span className="change-color">Talent Bridge</span> Works</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Create Account</p>
              <p>
                Enter your credentials, get an account and dive into the world of opportunities
              </p>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>Find a Team</p>
              <p>
                Find a team that is inclined towards your skill set and interests
              </p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>Post Team Vacancies</p>
              <p>
                In a team already? Post vacancies to add more members to your team
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;