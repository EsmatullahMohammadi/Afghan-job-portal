import React from 'react'
import InputField from '../Components/InputField'

const WorkExperience = ({handleChange}) => {
  return (
    <div>
        <h3 className='text-lg font-medium mb-2'>Work Experience</h3>
        <label className='sidebar-label-container'>
            <input type="radio" id='test' name="test" value="" onChange={handleChange} />
            <span className='checkmark'></span>Any experience
        </label>
        <InputField handleChange={handleChange} value={"internship"} title={"Internship"} name="test" />
        <InputField handleChange={handleChange} value={"work remotely"} title={"Work remotely"} name="test" />
    </div>
  )
}

export default WorkExperience