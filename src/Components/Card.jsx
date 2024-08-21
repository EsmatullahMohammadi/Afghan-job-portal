import React from 'react'
import { FiCalendar, FiClock, FiDollarSign, FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Card = ({data}) => {
    const {companyName, jobTitle, companyLogo, minPrice, maxPrice, jobLocation, postingDate, employmentType, description}= data;
  return (
    <section className='card'>
        <Link to={"/"} className='flex gap-4 flex-col sm:flex-row items-start'>
            <img src={companyLogo} alt="" />
            <div>
                <h4 className='text-primary mb-1'>{companyName}</h4>
                <h3 className='text-primary font-semibold mb-2'>{jobTitle}</h3>
                <div className='text-primary/70 text-base flex flex-wrap gap-2 mb-2'>
                    <span className='flex items-center gap-1'><FiMapPin />{jobLocation}</span>
                    <span className='flex items-center gap-1'><FiClock />{employmentType}</span>
                    <span className='flex items-center gap-1'><FiDollarSign />{minPrice}-{maxPrice}k</span>
                    <span className='flex items-center gap-1'><FiCalendar />{postingDate}</span>
                    <p className='text-base text-primary/70'>{description}</p>
                </div>
            </div>
        </Link>
    </section>
  )
}

export default Card