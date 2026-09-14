import React from 'react'
import car from '../assets/car-image.webp'


const ConfirmRide = (props) => {
  return (
    <div>
      <h5 className=' left-1/2 transform -translate-x-1/2  py-2  text-center absolute top-0 pt-2' onClick={()=> { props.setVehicalPanel(false)}}>  <i className="ri-arrow-down-wide-fill"></i></h5>
     <h3 className='text-xl font-semibold mb-5'>Confirm Your Ride</h3>
     <div className="flex justify-between gap-5 items-center flex-col ">
     <img className='h-20 w-full object-contain' src={car} alt="Car Image" />
    <div className='w-full mt-5'>
     <div className='flex items-center gap-5 p-3 border-b-2 border-gray-300'> 
      <i className="ri-user-location-line font-meduim text-lg"></i>
     <div>
          <h2 className='text-lg font-medium'>562/11 </h2>
          <p className='text-gray-600 text-base text-sm -m-1'>netwest Ground hazaribagh</p>
      </div>
      </div>

     <div className='flex items-center gap-5 p-3 border-b-2 border-gray-300' >
      <i className=" text-lg ri-map-pin-fill"></i>
     <div>
          <h2 className='text-lg font-medium'>562/11 </h2>
          <p className='text-gray-600 text-base text-sm -m-1'>netwest Ground hazaribagh</p>
      </div>
     </div>

     <div className='flex items-center gap-5  p-3  border-gray-300' >
     <i className="ri-cash-line"></i>
     <div>
          <h2 className='text-lg font-medium'>193.20 </h2>
          <p className='text-gray-600 text-base text-sm -m-1'>Amount</p>
      </div>
     </div>

    </div>
    <button onClick={()=>{
      props.setVehicalFound(true)
      props.setConfirmRidePanel(false)
      }} className='bg-black mt-5 text-white font-semibold w-full py-3 rounded-lg'>Confirm Ride</button>
    </div>
    </div>
  )
}

export default ConfirmRide