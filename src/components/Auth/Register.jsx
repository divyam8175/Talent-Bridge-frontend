import React, {useContext, useState} from 'react'
import { Context } from '../../main'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link, Navigate } from 'react-router-dom'
import { FaPencilAlt, FaRegUser } from 'react-icons/fa'
import {FaPhoneFlip} from 'react-icons/fa6'
import { MdOutlineMailOutline } from 'react-icons/md'
import {RiLock2Fill} from 'react-icons/ri'

const Register = () => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [role, setRole] = useState('')

    const {isAuthorized, setIsAuthorized, user, setUser} = useContext(Context)

    const handleRegister = async(e) => {
        e.preventDefault()
        try {
            const {data} = await axios.post('https://talentbridge-gprx.onrender.com/api/v1/user/register', {name,phone,email,role,password}, 
                {
                    headers:{
                        'Content-Type' : 'application/json'
                    },
                    withCredentials: true
                }
            )
            toast.success(data.message)
            setIsAuthorized(true)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    if(isAuthorized){
        return <Navigate to={'/'} />
    }

  return (
    <>
        <section className='authPage'>
            <div className="container">
                <div className="header">
                    <img src='/administration.png' alt='logo' />
                    <h3>Create a new account</h3>
                </div>
                <form>
                    <div className="inputTag">
                        <div>
                            <select value={role} onChange={(e)=>setRole(e.target.value)}>
                                <option value=''>Select Role</option>
                                <option value='Senior'>Senior</option>
                                <option value='Junior'>Junior</option>
                            </select>
                            <FaRegUser/>
                        </div>
                    </div>
                    <div className="inputTag">
                        <div>
                            <input type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Your Name' />
                            <FaPencilAlt/>
                        </div>
                    </div>
                    <div className="inputTag">
                        <div>
                            <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your Email' />
                            <MdOutlineMailOutline/>
                        </div>
                    </div>
                    <div className="inputTag">
                        <div>
                            <input type='number' value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder='Enter Your Phone Number' />
                            <FaPhoneFlip/>
                        </div>
                    </div>
                    <div className="inputTag">
                        <div>
                            <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Your Password' />
                            <RiLock2Fill/>
                        </div>
                    </div>
                    <button type='submit' onClick={handleRegister}>Register</button>
                    <Link to={'/login'}>Already a user? Login Now!</Link>
                </form>
            </div>
            <div className="banner">
                <img src="/register1.png" alt="login" />
            </div>
        </section>
    </>
  )
}

export default Register