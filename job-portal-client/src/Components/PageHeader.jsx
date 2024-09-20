import React from 'react'


const PageHeader = ({path , salary}) => {
  return (
    <div className='py-24 bg-[#FAFAFA] rounded flex justify-center items-center'>
        <div>
            <h2 className='text-3xl text-blue font-medium mb-1 text-center'>{path}</h2>
            <p className='text-sm text-center'><a href="/">Home</a> / {salary}</p>
        </div>
    </div>
  )
}

export default PageHeader