import React, { useState } from 'react'
import logo from '../assets/drivo-page-logo.png'
import { Link } from 'react-router-dom'
// bg-[#F59E0B]
const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState('')
  const submitHandler=(e)=>{
    e.preventDefault()
    setUserData({
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
        <p className='text-center'> New here? <Link to='/signup' className='text-blue-600'>Create a new Account</Link></p>
      </form>
   </div>
   <div>
    <Link to='/captain-login'
     className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base ' >Sign in as Captain</Link>
   </div>
    </div>
  )
}

export default UserLogin