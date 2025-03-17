import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyVacancies = () => {

  const [myVacancies, setMyVacancies] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const { data } = await axios.get(
          "https://talentbridge-gprx.onrender.com/api/v1/vacancy/getMyVacancies",
          { withCredentials: true }
        );
        setMyVacancies(data.myVacancies);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyVacancies([]);
      }
    }
    fetchVacancies();
  }, [])
  if (!isAuthorized || (user && user.role !== "Senior")) {
    navigate("/")
  }

  const handleEnableEdit = (vacancyId) => {
    setEditingMode(vacancyId);
  }

  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  const handleUpdateVacancy = async (vacancyId) => {
    const updatedVacancy = myVacancies.find((vacancy) => vacancy._id === vacancyId);
    await axios.put(`https://talentbridge-gprx.onrender.com/api/v1/vacancy/update/${vacancyId}`, updatedVacancy, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
  }

  const handleDeleteVacancy = async (vacancyId) => {
    await axios.delete(`https://talentbridge-gprx.onrender.com/api/v1/vacancy/delete/${vacancyId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyVacancies((prevVacancies) => prevVacancies.filter((vacancy) => vacancy._id !== vacancyId))
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (vacancyId, field, value) => {
    setMyVacancies((prevVacancies) =>
      prevVacancies.map((vacancy) =>
        vacancy._id === vacancyId ? { ...vacancy, [field]: value } : vacancy
      )
    )
  }

  return (
    <>
      <div className="myJobs page">
        <div className="container">
          <h1>Your Posted Vacancies</h1>
          {myVacancies.length > 0 ? (
            <>
              <div className="banner">
                {myVacancies.map((element) => (
                  <div className="card" key={element._id}>
                    <div className="content">
                      <div className="short_fields">
                        <div>
                          <span>Title:</span>
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.title}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "title",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          {" "}
                          <span>Team Name:</span>
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.team}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "team",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <span>Branch:</span>
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.branch}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "branch",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <span>Category:</span>
                          <select
                            value={element.category}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "category",
                                e.target.value
                              )
                            }
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                          >
                            <option value="">Select Category</option>
                              <option value="Technical Team">Technical Team</option>
                              <option value="Cultural Team">
                                Cultural Team
                              </option>
                              <option value="Sports Team">
                                Sports Team
                              </option>
                              <option value="Management Team">
                                Management Team
                              </option>
                              <option value="Branch Society">Branch Society</option>
                              <option value="Other Team">
                                Other Team
                              </option>
                          </select>
                        </div>
                        <div>
                          {" "}
                          <span>Expired:</span>
                          <select
                            value={element.expired}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "expired",
                                e.target.value
                              )
                            }
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                          >
                            <option value={true}>TRUE</option>
                            <option value={false}>FALSE</option>
                          </select>
                        </div>
                      </div>
                      <div className="long_field">
                        <div>
                          <span>Description:</span>{" "}
                          <textarea
                            rows={5}
                            value={element.description}
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "description",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="button_wrapper">
                      <div className="edit_btn_wrapper">
                        {editingMode === element._id ? (
                          <>
                            <button
                              onClick={() => handleUpdateVacancy(element._id)}
                              className="check_btn"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => handleDisableEdit()}
                              className="cross_btn"
                            >
                              <RxCross2 />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleEnableEdit(element._id)}
                            className="edit_btn"
                          >
                            Edit
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteVacancy(element._id)}
                        className="delete_btn"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>
              You have not posted any vacancy or may be you deleted all of your vacancies!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyVacancies