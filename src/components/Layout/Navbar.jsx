import React, { useContext, useState } from 'react'
import { Context } from '../../main'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import {GiHamburgerMenu} from 'react-icons/gi'

const Navbar = () => {

    const [show, setShow] = useState(false)
    const {isAuthorized, setIsAuthorized, user} = useContext(Context)
    const navigate = useNavigate()

    const handleLogout = async() => {
        try {
            const res = await axios.get('https://talentbridge-gprx.onrender.com/api/v1/user/logout', {withCredentials:true})
            toast.success(res.data.message)
            setIsAuthorized(false)
            navigate('/login')
        } catch (error) {
            toast.error(error.res.data.message)
            setIsAuthorized(true)
        }
    }

  return (
    <>
        <nav className={isAuthorized ? 'navbarShow' : 'navbarHide'}>
            <div className="container">
                <div className="logo nav-logo">
                    <img src='/problem-solving.png' alt='logo'/>
                </div>
                <ul className={!show ? 'menu' : 'show-menu menu'}>
                    <li>
                        <Link to={'/'} onClick={()=>setShow(false)}>
                            HOME
                        </Link>
                    </li>
                    <li>
                        <Link to={'/vacancy/getAll'} onClick={()=>setShow(false)}>
                            ALL VACANCIES
                        </Link>
                    </li>
                    <li>
                        <Link to={'/applications/me'} onClick={()=>setShow(false)}>
                            {user && user.role==='Senior' ? 'APPLICATIONS' : 'MY APPLICATIONS' }
                        </Link>
                    </li>
                    {user && user.role==='Senior' ? (
                        <>
                            <li>
                                <Link to={"/vacancy/post"} onClick={() => setShow(false)}>
                                    POST NEW VACANCY
                                </Link>
                            </li>
                            <li>
                                <Link to={"/vacancy/me"} onClick={() => setShow(false)}>
                                    VIEW YOUR VACANCIES
                                </Link>
                            </li>
                        </>
                    ) : (
                        <></>
                    )}
                    <button onClick={handleLogout}>LOGOUT</button>
                </ul>
                <div className="hamburger">
                    <GiHamburgerMenu onClick={() => setShow(!show)} />
                </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar