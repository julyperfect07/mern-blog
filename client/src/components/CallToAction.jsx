import { Button } from 'flowbite-react'
import React from 'react'

const CallToAction = () => {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
      <div className=' flex-1 justify-center flex flex-col '>
        <h2 className=' text-2xl'>
          Want to learn about JavaScript ?
        </h2>
        <p className=' text-gray-500 my-2'>
          Checkout these resources with 100 JavaScript projects
        </p>
        <Button gradientDuoTone='purpleToPink' className=' rounded-tl-xl rounded-bl-none'>
          <a href="#" target='_blank' rel='noopener noreferrer'>
            100 Javascript projects
          </a>
        </Button>
      </div>
      <div className=' p-7 flex-1'>
        <img src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20221114110410/Top-10-JavaScript-Project-Ideas-For-Beginners-2023.png" alt="" />
      </div>
    </div>
  )
}

export default CallToAction