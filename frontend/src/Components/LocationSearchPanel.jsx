import React from 'react'
import 'remixicon/fonts/remixicon.css'


const LocationSearchPanel = (props) => {
  
    //Sample Location Array
    const locations=[
        "Gali no 6  Ramnagar Hazaribagh",
        
        "Okhni Hazaribagh",
        "Kallu Chowk Hazaribagh",
        "Hazaribagh Railway Station",
        "Lohsinghna Road Hazaribagh",
        "Matwari hazaribagh",
    ]
  return (
    <div>
        {/* Sample Location Search Panel */}
        {
        locations.map(function(address,idx){
            return <div  key={idx} onClick={() =>{
                props.setVehicalPanel(true)
                props.setPanelOpen(false)
            } }className='flex item-center rounded-xl border-gray-300 active:border-black border-1 p-3 active:border-2 justify-start gap-5 my-2'>
            <h2 className='bg-[#eee] h-8 w-8 flex items-center justify-center rounded-full '  ><i className="ri-map-pin-line font-bold"></i></h2>
            <h4 className='font-medium'> {address}</h4>
        </div>
        } )
        
       }
        {/* <h2> Sample data till here */}

        
    </div>
  )
}

export default LocationSearchPanel