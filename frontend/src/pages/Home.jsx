import { useState } from 'react'
// import wallpaper from '../assets/wallpaper.png'
import logo from '../assets/drivo-page-logo.png'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react' 
import { useRef } from 'react'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../Components/LocationSearchPanel'
import car from "../assets/car-image.webp"
import bike from "../assets/Bike.webp"
import auto from "../assets/auto.webp"


const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const vehicalPanelRef=useRef(null)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [vehicalPanel, setVehicalPanel] = useState(false)


  useGSAP(() => {
    gsap.to(panelRef.current, {
      height: panelOpen ? '70%' : 0,
      autoAlpha: panelOpen ? 1 : 0,
      duration: 0.35,
      ease: 'power2.out',
      padding:'25px'
    })

    gsap.to(panelCloseRef.current, {
      opacity: panelOpen ? 1 : 0,
      duration: 0.2,
      delay: panelOpen ? 0.35 : 0,
      ease: 'power2.out'
    })
  }, { dependencies: [panelOpen] })

  useGSAP(function(){
    if(vehicalPanel){
         gsap.to(vehicalPanelRef.current, {
      transform:'translateY(0%)'
    })
    }
      else{
       gsap.to(vehicalPanelRef.current, {
      transform:'translateY(100%)'
    })
    }

  },{dependencies:[vehicalPanel]})

 const  SubmitHandler =(e) =>{
    e.preventDefault()


  }
  return (
    <div className='h-screen relative overflow-hidden'>
    <img className='h-15 w-15 object-contain' src={logo} alt="Drivo Logo" />
    <div> 
      {/* temproryimage 
       */}
      <img className='h-full w-full object-cover' src="https://www.shutterstock.com/image-vector/city-map-dhaka-coxs-bazar-260nw-2277305657.jpg" alt="City map" />

    </div>
    <div className=' flex flex-col h-screen justify-end shadow-md absolute top-0 w-full '>
      <div className='h-[30%] shrink-0 bg-white p-6 relative'>
        <h5 ref={panelCloseRef} onClick={()=> setPanelOpen(false)} className='absolute top-2 left-1/2 transform -translate-x-1/2 text-xl opacity-0'><i className="ri-arrow-down-wide-line"></i></h5>
        <h4 className='text-3xl font-semibold'>Find a trip</h4>
      <form onSubmit={(e) => {SubmitHandler(e)}} className='flex flex-col'>
        <div className="line absolute h-15 w-1 top-[45%] left-7 rounded-full  bg-black "></div>
        <input
        onClick={() => setPanelOpen(true)}
        value={pickup} 
        onChange={(e) => setPickup(e.target.value)}
         className='bg-[#eee] px-12 py-2 text-base  rounded-lg w-full mt-5 mb-3'
          type="text" placeholder="Add a pick-up location">

          </input>


        <input 
         className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full  mb-3'
          type="text" placeholder="Enter Your destination"
          onClick={() => setPanelOpen(true)}
           value={destination}
           
            onChange={(e) => setDestination(e.target.value)}>

          </input>
      </form>
      </div>
      <div ref={panelRef} className='h-0 shrink-0 bg-white overflow-hidden'>
            <LocationSearchPanel setPanelOpen={setPanelOpen} setVehicalPanel={setVehicalPanel}/>
      </div>
    </div>
    <div ref={vehicalPanelRef} className='fixed z-5 bottom-0 w-full bg-white px-3 py-6 translate-y-full'>
    <h5 className=' left-1/2 transform -translate-x-1/2  py-2  text-center absolute top-0 pt-2' onClick={()=> { setVehicalPanel(false)}}>  <i className="ri-arrow-down-wide-fill"></i></h5>
     <h3 className='text-xl font-semibold mb-5'>Choose Your Ride</h3>
        <div className=' border-2 hover:border-black bg-gray-100 mb-3 rounded-xl flex w-full items-center gap-4 -500 p-3'>
          <img className='h-16 w-24 shrink-0 object-contain' src={car} alt="Car Image" />
          <div className='min-w-0 flex-1 -500 px-3 py-2'>
            <h4 className='truncate font-medium text-sm'>Drivo GO <span><i className="ri-map-pin-user-fill"></i>4</span></h4>
            <h5 className='font-normal text-xs text-gray-600'>2 min away</h5>
            <p className='truncate text-sm'>Ride Easy. Go Anywhere.</p>
                </div>
          <h2 className='shrink-0 text-lg font-semibold'>193.62</h2>
            </div>
           

            
        <div className=' border-2 active:border-black bg-gray-100 mb-3 rounded-xl flex w-full items-center gap-4 -500 p-3'>
          <img className='h-16 w-24 shrink-0 object-contain' src={bike} alt="Car Image" />
          <div className='min-w-0 flex-1 -500 px-3 py-2'>
            <h4 className='truncate font-medium text-sm'>Drivo GO <span><i className="ri-map-pin-user-fill"></i>1</span></h4>
            <h5 className='font-normal text-xs text-gray-600'>2 min away</h5>
            <p className='truncate text-sm'>Ride Easy. Go Anywhere.</p>
                </div>
          <h2 className='shrink-0 text-lg font-semibold'>92.00</h2>
            </div>



            <div className=' border-2 hover:border-black bg-gray-100 mb-3  rounded-xl flex w-full items-center gap-4 -500 p-3'>
          <img className='h-16 w-24 shrink-0 object-contain' src={auto} alt="Car Image" />
          <div className='min-w-0 flex-1 -500 px-3 py-2'>
            <h4 className='truncate font-medium text-sm'>Drivo GO <span><i className="ri-map-pin-user-fill"></i>5</span></h4>
            <h5 className='font-normal text-xs text-gray-600'>2 min away</h5>
            <p className='truncate text-sm'>Ride Easy. Go Anywhere.</p>
                </div>
          <h2 className='shrink-0 text-lg font-semibold'>120.60</h2>
            </div>



        </div>
    </div>
  )
}

export default Home