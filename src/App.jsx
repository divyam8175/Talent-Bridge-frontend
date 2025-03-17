import React, {useState, useContext, useEffect} from 'react'
import './App.css'
import { Context } from './main'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import Home from './components/Home/Home'
import Vacancies from './components/Vacancy/Vacancies'
import VacancyDetails from './components/Vacancy/VacancyDetails'
import MyVacancies from './components/Vacancy/MyVacancies'
import PostVacancy from './components/Vacancy/PostVacancy'
import Application from './components/Application/Application'
import MyApplication from './components/Application/MyApplication'
import NotFound from './components/NotFound/NotFound'
import axios from 'axios'
import {Toaster} from 'react-hot-toast'

const App = () => {

  const {isAuthorized, setIsAuthorized, setUser} = useContext(Context)
  
  useEffect(()=>{
    const getUser = async () => {
      try {
        const res = await axios.get('https://talentbridge-gprx.onrender.com/api/v1/user/getUser', {withCredentials:true})
        setUser(res.data.user)
        setIsAuthorized(true)
      } catch (error) {
        setIsAuthorized(false)
      }
    }
    getUser()
  },[isAuthorized])


  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/' element={<Home/>} />
          <Route path='/vacancy/getAll' element={<Vacancies/>} />
          <Route path='/vacancy/:id' element={<VacancyDetails/>} />
          <Route path='/vacancy/post' element={<PostVacancy/>} />  
          <Route path='/vacancy/me' element={<MyVacancies/>} />  
          <Route path='/application/:id' element={<Application/>} /> 
          <Route path='/applications/me' element={<MyApplication/>} /> 
          <Route path='*' element={<NotFound/>} /> 
        </Routes>
        <Footer/>
        <Toaster/>
      </BrowserRouter>
    </>
  )
}

export default App
