import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'
import UserProtectorWrapper from './pages/userProtectorWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectorWrapper from './pages/CaptainProtectorWrapper'


const App = () => {
  return (
    <div ><Routes>
      <Route path='/' element={<Start/>}/>
      <Route path='/login' element={<UserLogin/>}/>
      <Route path='/signup' element={<UserSignup/>}/>
      <Route path='/captain-login' element={<CaptainLogin/>}/>
      <Route path='/captain-signup' element={<CaptainSignup/>}/>
      <Route path='/home' element={
        <UserProtectorWrapper><Home/></UserProtectorWrapper>
      }/>
      <Route path='/user/logout' element={
        <UserProtectorWrapper><UserLogout/></UserProtectorWrapper>
      }/>


      <Route path='/captain-home' element={
       <CaptainProtectorWrapper><CaptainHome/></CaptainProtectorWrapper> 
      }/>
      
      </Routes>
      
      </div> 
  )
}

export default App