import React from 'react'
import Button from '../Components/Button'
import InputField from '../Components/InputField'


const Salary = ({handleChange, handleClick}) => {
  return (
    <div>
        <h4 className='text-lg font-medium mb-2'>Salary</h4>
        <div className='mb-4'>
            <Button onClickHandler={handleClick} title={"Hourly"} value={""} />
            <Button onClickHandler={handleClick} title={"Monthly"} value={"Monthly"} />
            <Button onClickHandler={handleClick} title={"Yearly"} value={"Yearly"} />
        </div>
        <div className='mb-4'>
            <label className='sidebar-label-container'>
                <input type="radio" id='test2' name="test" value="" onChange={handleChange} />
                <span className='checkmark'></span>All
            </label>
            <InputField handleChange={handleChange} value={30} title={"<30000k"} name="test" />
            <InputField handleChange={handleChange} value={50} title={"<50000k"} name="test" />
            <InputField handleChange={handleChange} value={80} title={"<80000k"} name="test" />
            <InputField handleChange={handleChange} value={100} title={"<100000k"} name="test" />
        </div>
    </div>
  )
}

export default Salary