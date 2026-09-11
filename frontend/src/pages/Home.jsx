import React from 'react'
import logo from '../assets/drivo-page-logo-white.png'
import wallpaper from '../assets/wallpaper.png'
import{Link} from 'react-router-dom'

const Home = () => {
  return (
    <div>
        
        <div className='h-screen w-full flex justify-between flex-col' style={{ backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className='p-8'>
                <img className='h-20 w-32 object-contain' src={logo} alt="Drivo Logo" />
            </div>
            <div className='bg-white py-4 pb-7 px-4'>
                <h2 className='text-3xl font-bold'>Get Started With Drivo</h2>
                <Link to='/login' className= ' flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
            </div>

        </div>
    </div>
  )
}

export default Home