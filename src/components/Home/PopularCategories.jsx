import React from "react";
import { MdElectricalServices, MdManageAccounts, MdOutlineSportsMartialArts} from "react-icons/md";
import {  GiMusicalNotes } from "react-icons/gi";
import { GrTechnology } from "react-icons/gr";
import { RiPsychotherapyFill } from "react-icons/ri";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Technical Teams",
      subTitle: "Positions Open",
      icon: <GrTechnology />,
    },
    {
      id: 2,
      title: "Cultural Teams",
      subTitle: "Positions Open",
      icon: <GiMusicalNotes />,
    },
    {
      id: 3,
      title: "Sports Teams",
      subTitle: "Positions Open",
      icon: <MdOutlineSportsMartialArts />,
    },
    {
      id: 4,
      title: "Management Teams",
      subTitle: "Positions Open",
      icon: <MdManageAccounts />,
    },
    {
      id: 5,
      title: "Branch Societies",
      subTitle: "Positions Open",
      icon: <MdElectricalServices />,
    },
    {
      id: 6,
      title: "Other Teams",
      subTitle: "Positions Open",
      icon: <RiPsychotherapyFill />,
    }
  ];
  return (
    <div className="categories">
      <h3>POPULAR CATEGORIES</h3>
      <div className="banner">
        {categories.map((element) => {
          return (
            <div className="card" key={element.id}>
              <div className="icon">{element.icon}</div>
              <div className="text">
                <p>{element.title}</p>
                <p>{element.subTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularCategories;