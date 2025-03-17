import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className='page notfound'>
        <div className="content">
            <img className='notfoundphoto' src='/notfound2.png' alt='Page not found' />
            <Link to={'/'}>BACK TO HOME</Link>
        </div>
    </section>
  )
}

export default NotFound