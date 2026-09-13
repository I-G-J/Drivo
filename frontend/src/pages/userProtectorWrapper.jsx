import { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const UserProtectorWrapper = ({ children }) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { setUser } = useContext(UserDataContext)
    const [isChecking, setIsChecking] = useState(true)

    useEffect(() => {
      if (!token) {
        navigate('/login')
        return
      }

      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/users/profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )

          if (response.status === 200) {
            setUser(response.data.user)
            setIsChecking(false)
          }
        } catch (error) {
          console.error('Profile fetch error:', error)
          navigate('/login')
          setIsChecking(false)
        }
      }

      fetchUserProfile()
    }, [token, navigate, setUser])

    if (isChecking) {
      return (
        <div className="flex items-center justify-center h-screen">
          Checking authentication...
        </div>
      )
    }
    
    return <>{children}</>
}

export default UserProtectorWrapper

