import car from '../assets/car-image.webp'
import bike from '../assets/Bike.webp'
import auto from '../assets/auto.webp'

const VehicalPanel = (props) => {
  return (
    <div>
        <h5 className=' left-1/2 transform -translate-x-1/2  py-2  text-center absolute top-0 pt-2' onClick={()=> { props.setVehicalPanel(false)}}>  <i className="ri-arrow-down-wide-fill"></i></h5>
     <h3 className='text-xl font-semibold mb-5'>Choose Your Vehicle</h3>
        <div onClick={() => props.setConfirmRidePanel(true)} className=' border-2 hover:border-black bg-gray-100 mb-3 rounded-xl flex w-full items-center gap-4 -500 p-3'>
          <img className='h-16 w-24 shrink-0 object-contain' src={car} alt="Car Image" />
          <div className='min-w-0 flex-1 -500 px-3 py-2'>
            <h4 className='truncate font-medium text-sm'>Drivo GO <span><i className="ri-map-pin-user-fill"></i>4</span></h4>
            <h5 className='font-normal text-xs text-gray-600'>2 min away</h5>
            <p className='truncate text-sm'>Ride Easy. Go Anywhere.</p>
                </div>
          <h2 className='shrink-0 text-lg font-semibold'>193.62</h2>
            </div>
           

            
        <div onClick={() => props.setConfirmRidePanel(true)}  className=' border-2 active:border-black bg-gray-100 mb-3 rounded-xl flex w-full items-center gap-4 -500 p-3'>
          <img className='h-16 w-24 shrink-0 object-contain' src={bike} alt="Car Image" />
          <div className='min-w-0 flex-1 -500 px-3 py-2'>
            <h4 className='truncate font-medium text-sm'>Drivo GO <span><i className="ri-map-pin-user-fill"></i>1</span></h4>
            <h5 className='font-normal text-xs text-gray-600'>2 min away</h5>
            <p className='truncate text-sm'>Ride Easy. Go Anywhere.</p>
                </div>
          <h2 className='shrink-0 text-lg font-semibold'>92.00</h2>
            </div>



            <div onClick={() => props.setConfirmRidePanel(true)}  className=' border-2 hover:border-black bg-gray-100 mb-3  rounded-xl flex w-full items-center gap-4 -500 p-3'>
          <img className='h-16 w-24 shrink-0 object-contain' src={auto} alt="Car Image" />
          <div className='min-w-0 flex-1 -500 px-3 py-2'>
            <h4 className='truncate font-medium text-sm'>Drivo GO <span><i className="ri-map-pin-user-fill"></i>5</span></h4>
            <h5 className='font-normal text-xs text-gray-600'>2 min away</h5>
            <p className='truncate text-sm'>Ride Easy. Go Anywhere.</p>
                </div>
          <h2 className='shrink-0 text-lg font-semibold'>120.60</h2>
            </div>

    </div>
  )
}

export default VehicalPanel