import React from 'react'
import InputField from '../Components/InputField'

const Location = ({handleChange}) => {
  return (
    <div>
        <h3 className='text-lg font-medium mb-2'>Location</h3>
        <div>
            <label className='sidebar-label-container'>
                <input type="radio" id='test' name="test" value="" onChange={handleChange} />
                <span className='checkmark'></span>All
            </label>
            <InputField handleChange={handleChange} value={"london"} title={"London"} name="test" />
            <InputField handleChange={handleChange} value={"seattle"} title={"Seattle"} name="test" />
            <InputField handleChange={handleChange} value={"madrid"} title={"Madrid"} name="test" />
            <InputField handleChange={handleChange} value={"boston"} title={"Boston"} name="test" />
        </div>
    </div>
  )
}

export default Location