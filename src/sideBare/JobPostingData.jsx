import React from 'react'
import InputField from '../Components/InputField'

const JobPostingData = ({handleChange}) => {
    const now = new Date();
    
    const twentyFourHouerAgo=new Date(now - 24*60*60*1000);
    const sevenDaysAgo=new Date(now - 7*24*60*60*1000);
    const thirtyDaysAgo=new Date(now - 30*24*60*60*1000);

    const twentyFourHouerAgoDate=twentyFourHouerAgo.toISOString().slice(0,10);
    const sevenDaysAgoDate=sevenDaysAgo.toISOString().slice(0,10);
    const thirtyDaysAgoDate=thirtyDaysAgo.toISOString().slice(0,10);

  return (
    <div>
        <h4 className='text-lg font-medium mb-2'>Date of posting</h4>
            <label className='sidebar-label-container'>
                <input type="radio" id='test' name="test" value="" onChange={handleChange} />
                <span className='checkmark'></span>All time
            </label>
            <InputField handleChange={handleChange} value={twentyFourHouerAgoDate} title={"Last 24 hours"} name="test" />
            <InputField handleChange={handleChange} value={sevenDaysAgoDate} title={"Last 7 days"} name="test" />
            <InputField handleChange={handleChange} value={thirtyDaysAgoDate} title={"Last Month"} name="test" />
        </div>
  )
}

export default JobPostingData