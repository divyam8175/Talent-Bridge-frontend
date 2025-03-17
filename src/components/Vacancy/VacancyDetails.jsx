import React, {useState, useEffect, useContext} from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../main'

const VacancyDetails = () => {

  const {id} = useParams()
  const [vacancy, setVacancy] = useState({})
  const navigate = useNavigate()

  const {isAuthorized, user} = useContext(Context)

  useEffect(()=>{
    axios.get(`https://talentbridge-gprx.onrender.com/api/v1/vacancy/${id}`,{withCredentials:true}).then((res)=>{
      setVacancy(res.data.vacancy)
    }).catch((error)=>{
      navigate('/notfound')
    })
  },[])

  if(!isAuthorized){
    navigate('/login')
  }

  return (
    <section className='jobDetail page'>
      <div className="container">
        <h3>Vacancy Details</h3>
        <div className="banner">
          <p>Title : <span>{vacancy.title}</span></p>
          <p>Description : <span>{vacancy.description}</span></p>
          <p>Team : <span>{vacancy.team}</span></p>
          <p>Vacancy Posted On : <span>{vacancy.vacancyPostedOn}</span></p>
          {user && user.role==='Senior' ? (<></>) : (
            <Link to={`/application/${vacancy._id}`}>Apply Now</Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default VacancyDetails