import React,{useContext, useEffect} from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'


const userProtectorWrapper = ({children}) => {

    const token =localStorage.getItem('token')
    const Navigate= useNavigate()
    useEffect(() => {
      if (!token){
        Navigate('/login')

      }
    }, [token])
    
  return (
    <> 
    {children}
    </>
  )
}

export default userProtectorWrapper

