import React, { useState, useContext } from 'react'
import logo from '../assets/drivo-page-logo.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom' 
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainLogin = () => {
  const navigate = useNavigate()
  const { setCaptain, setIsLoading, setError: setContextError } = useContext(CaptainDataContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setIsLoading(true)

    const captainData = {
      email: email,
      password: password
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        captainData
      )

      if (response.status === 200) {
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captain-home')
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.'
      setError(errorMessage)
      setContextError(errorMessage)
      console.error('Login failed:', err)
    } finally {
      setLoading(false)
      setIsLoading(false)
      setEmail('')
      setPassword('')
    }
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='mb-10 w-16 object-contain' src={logo} alt="Drivo Logo" />
        
        <form onSubmit={submitHandler}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <h3 className='text-xl mb-2 font-semibold'> Our Captain's email ID</h3>
          <input
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            placeholder='youremail@email.com'
          />

          <h3 className='text-xl mb-2 font-semibold'>Enter Your Password</h3>
          <input
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            required
            placeholder='Your password'
          />

          <button 
            disabled={loading}
            className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          
          <p className='text-center'>
            Join a fleet?{' '}
            <Link to='/captain-signup' className='text-blue-600'>
              Register as a Captain
            </Link>
          </p>
        </form>
      </div>

      <div>
        <Link 
          to='/login'
          className='bg-[#F59E0B] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        >
          Sign in as User
        </Link>
      </div>
    </div>
  )
}

export default CaptainLogin