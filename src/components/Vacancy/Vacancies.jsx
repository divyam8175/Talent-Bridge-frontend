import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../../main'

const Vacancies = () => {

  const [vacancies, setVacancies] = useState([])
  const {isAuthorized} = useContext(Context)
  const navigate = useNavigate()

  useEffect(()=>{
    try {
      axios.get('https://talentbridge-gprx.onrender.com/api/v1/vacancy/getAll', {withCredentials:true}).then((res)=>{
        setVacancies(res.data)
      })
    } catch (error) {
      console.log(error)
    }
  },[])

  if(!isAuthorized){
    navigate('/')
  }

  return (
    <section className='jobs page'>
      <div className="container">
        <h1>AVAILABLE VACANCIES</h1>
        <div className="banner">
          {vacancies.vacancies && vacancies.vacancies.map((element)=>{
            return (
              <div className="card" key={element._id}>
                <p>{element.title}</p>
                <p>{element.category}</p>
                <p>{element.country}</p>
                <Link to={`/vacancy/${element._id}`}>Vacancy Details</Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}

export default Vacancies