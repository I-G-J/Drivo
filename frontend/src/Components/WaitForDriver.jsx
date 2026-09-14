import React from 'react'
import car from '../assets/car-image.webp'

const WaitForDriver = (props) => {
  return (
    <div>
              <h5 className=' left-1/2 transform -translate-x-1/2  py-2  text-center absolute top-0 pt-2' onClick={()=>
                 { props.setVehicalPanel(false)
                    props.setWaitingForDriver(false)
                 }}>  <i className="ri-arrow-down-wide-fill"></i></h5>
             <div className="flex justify-between  items-center flex-col ">
                         <img className='h-12 w-full object-contain' src={car} alt="Car Image" />
                         <h2 className='text-lg font-bold'>Ramesh</h2>
                         <h4 className='text-sm font-semibold' >JH02BD4285</h4>
                         <p className='text-xs text-gray-600'>Toyota Innova Crysta</p>
                
             </div>
             <div className="flex justify-between gap-5 items-center flex-col ">
             
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
            
            </div>
            </div>
  )
}

export default WaitForDriver