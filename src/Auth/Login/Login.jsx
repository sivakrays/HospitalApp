import React from 'react'
import '../Login/Login.css'
import '../../Utility/Utility.css'
import { Link } from 'react-router-dom'

const Login = () => {


  return (
    <section className='login'>
      <form className='login__form rounded shadow'>
        <h2 className='text-center py-3 text-uppercase'>ABC Hospital</h2>
        <p className='text-center login__des'>Enter Your Email and Password To Login</p>
        <p className='bottom__line'></p>
        <div className="login__input">
          <label htmlFor="" className='mb-2'>Email Address</label>
          <input type="text" name="" id=""  className='form-control mb-3' placeholder='Enter your email'/>
          <label htmlFor="" className='mb-2'>Password</label>
          <input type="password" name="" id="" className='form-control' placeholder='Enter your Password'/>
        </div>
        <div className="login__btn">
          <Link to={'/DoctorView'} className='btn  login__button button'>Login</Link>
        </div>



      </form>
    </section>
  )
}

export default Login