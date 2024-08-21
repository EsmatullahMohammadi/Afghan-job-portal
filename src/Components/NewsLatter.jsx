import React from 'react'
import { FaEnvelopeOpenText, FaRocket } from 'react-icons/fa6'

const NewsLatter = () => {
  return (
    <div>
        <div>
            <h3 className='text-lg flex items-center gap-2 font-bold mb-2'>
                Email neeed for jobs
                <FaEnvelopeOpenText />
            </h3>
            <p className='text-primary/75 mb-4 text-base'>email me for a job that you like that please your resume and get the job.</p>
            <div className='space-y-4 w-full'>
                <input type="email" name='email' id='email' placeholder='name@gmail.com' className='w-full block py-2 pl-3 border focus:outline-none'/>
                <input type="submit" value={"Subscribe"} className='w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold'/>
            </div>
        </div>
        {/* second part */}
        <div className='mt-20'>
            <h3 className='text-lg flex items-center gap-2 font-bold mb-2'>
                Get noteced faster
                <FaRocket />
            </h3>
            <p className='text-primary/75 mb-4 text-base'>email me for a job that you like that please your resume and get the job.</p>
            <div className='space-y-4 w-full'>
                <input type="submit" value={"Upload your resume"} className='w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold'/>
            </div>
        </div>
    </div>
  )
}

export default NewsLatter