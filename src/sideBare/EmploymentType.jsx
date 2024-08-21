import React from 'react'
import InputField from '../Components/InputField'

const EmploymentType = ({handleChange}) => {
  return (
    <div>
        <h3 className='text-lg font-medium mb-2'>Type of employment</h3>
        <label className='sidebar-label-container'>
            <input type="radio" id='test' name="test" value="" onChange={handleChange} />
            <span className='checkmark'></span>Any experience
        </label>
        <InputField handleChange={handleChange} value={"Full-time"} title={"Full-time"} name="test" />
        <InputField handleChange={handleChange} value={"Part-time"} title={"Part-time"} name="test" />
        <InputField handleChange={handleChange} value={"Temporary"} title={"Temporary"} name="test" />
    </div>
  )
}

export default EmploymentType