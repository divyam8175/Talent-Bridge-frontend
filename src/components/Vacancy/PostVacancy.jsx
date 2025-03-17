import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const PostVacancy = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [team, setTeam] = useState("");
  const [branch, setBranch] = useState("");
  const [category, setCategory] = useState("");

  const { isAuthorized, user } = useContext(Context);

  const handleVacancyPost = async (e) => {
    e.preventDefault();
    await axios.post("https://talentbridge-gprx.onrender.com/api/v1/vacancy/post",
            {
              title, description, category, team, branch
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
  }

  const navigate = useNavigate();
  if (!isAuthorized || (user && user.role !== "Senior")) {
    navigate("/");
  }

  return (
    <>
      <div className="job_post page">
        <div className="container">
          <h3>POST NEW VACANCY</h3>
          <form onSubmit={handleVacancyPost}>
            <div className="wrapper">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Vacancy Title"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
            <div className="wrapper">
              <input
                type="text"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                placeholder="Team Name"
              />
            </div>
            <input
              type="text"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              placeholder="Branch Name"
            />
            <textarea
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Vacancy Description"
            />
            <button type="submit">Post Vacancy</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostVacancy