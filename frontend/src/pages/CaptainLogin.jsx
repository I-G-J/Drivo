import React, { useState } from 'react'
import logo from '../assets/drivo-page-logo.png'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
  
  const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [captainData, setCaptainData] = useState('')
    const submitHandler=(e)=>{
      e.preventDefault()
      setCaptainData({
        email:email,
        password:password
      })
      
      setEmail('')
      setPassword('')
  
    }

  return (
    <div className='p-7  h-screen flex flex-col justify-between'>
   <div>
     <img className='mb-10 w-16 object-contain' src={logo} alt="Drivo Logo" />
      
      <form onSubmit={(e)=>{
        submitHandler(e)
      }}>
    
        <h3 className='text-xl mb-2 font-semibold'>What's your email ID</h3>
        <input
        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base '
         type="email" 
         value={email}
         onChange={(e)=>{
          setEmail(e.target.value);
         }}
         required 
         placeholder='youremail@email.com'
          />

        <h3 className='text-xl mb-2 font-semibold'>Enter Your Password</h3>
        <input
         type="password" 
         value={password}
         onChange={(p)=>{
          setPassword(p.target.value);
         }}
        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base '
         required
          placeholder='Your password'
           />

        
        <button 
        className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base '
        >Login</button>
        <p className='text-center'> Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
      </form>
   </div>
   <div>
    <Link to='/login'
     className='bg-[#F59E0B] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base ' >Sign in as User</Link>
   </div>
    </div>
  )
}

export default CaptainLogin