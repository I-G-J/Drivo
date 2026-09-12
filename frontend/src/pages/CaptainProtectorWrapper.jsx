import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainProtectorWrapper = ({ children }) => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const { captain, setCaptain } = useContext(CaptainDataContext)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    if (!token) {
      navigate('/captain-login')
      setIsChecking(false)
      return
    }

    const fetchCaptainProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        if (response.status === 200) {
          setCaptain(response.data.captain)
          setIsChecking(false)
        }
      } catch (error) {
        console.error('Profile fetch error:', error)
        navigate('/captain-login')
        setIsChecking(false)
      }
    }

    fetchCaptainProfile()
  }, [token, navigate, setCaptain])

  if (isChecking) {
    return (
      <div className="flex items-center justify-center h-screen">
        Checking authentication...
      </div>
    )
  }

  return (
    <>
      {children}
    </>
  )
}

export default CaptainProtectorWrapper

