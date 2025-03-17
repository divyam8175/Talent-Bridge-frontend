import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModel from "./ResumeModel";

const MyApplication = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Senior") {
        axios.get("https://talentbridge-gprx.onrender.com/api/v1/application/senior/getAll", {
            withCredentials: true}).then((res) => {
            setApplications(res.data.applications);
          })
      } else {
        axios.get("https://talentbridge-gprx.onrender.com/api/v1/application/junior/getAll", {withCredentials: true}).then((res) => {
            setApplications(res.data.applications);
          })
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigate("/");
  }

  const deleteApplication = (id) => {
    try {
      axios.delete(`https://talentbridge-gprx.onrender.com/api/v1/application/delete/${id}`, {
          withCredentials: true}).then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          )
        })
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl)
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <section className="my_applications page">
      {user && user.role === "Junior" ? (
        <div className="container">
          <h1>My Applications</h1>
          {applications.length <= 0 ? (
            <>
              {" "}
              <h4>No Applications Found</h4>{" "}
            </>
          ) : (
            applications.map((element) => {
              return (
                <JuniorCard element={element} key={element._id} deleteApplication={deleteApplication} openModal={openModal}/>
              )
            })
          )}
        </div>
      ) : (
        <div className="container">
          <h1>Applications From Juniors</h1>
          {applications.length <= 0 ? (
            <>
              <h4>No Applications Found</h4>
            </>
          ) : (
            applications.map((element) => {
              return (
                <SeniorCard element={element} key={element._id} openModal={openModal}/>
              )
            })
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModel imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplication

const JuniorCard = ({ element, deleteApplication, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p><span>Name:</span> {element.name}</p>
          <p><span>Email:</span> {element.email}</p>
          <p><span>Phone:</span> {element.phone}</p>
          <p><span>Branch:</span> {element.branch}</p>
        </div>
        <div className="resume">
          <img src={element.resume.url} alt="resume" onClick={() => openModal(element.resume.url)}/>
        </div>
        <div className="btn_area">
          <button onClick={() => deleteApplication(element._id)}>Delete Application</button>
        </div>
      </div>
    </>
  );
};

const SeniorCard = ({ element, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p><span>Name:</span> {element.name}</p>
          <p><span>Email:</span> {element.email}</p>
          <p><span>Phone:</span> {element.phone}</p>
          <p><span>Branch:</span> {element.branch}</p>
        </div>
        <div className="resume">
          <img src={element.resume.url} alt="resume" onClick={() => openModal(element.resume.url)}/>
        </div>
      </div>
    </>
  );
};