/* eslint-disable react/prop-types */
import React from 'react';
import { FiCalendar, FiClock, FiDollarSign, FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Main Card Component
const Card = ({ data }) => {
  const { t } = useTranslation();
  
  const {
    companyName,
    jobTitle,
    companyLogo,
    minPrice,
    maxPrice,
    jobLocation,
    postingDate,
    employmentType,
    description,
  } = data;

  return (
    <section className="card" dir="ltr">
      <Link to="/" className="flex gap-4 flex-col sm:flex-row items-start">
        <div className="w-64 h-64">
          <img
            src={`http://localhost:3000/public/images/${companyLogo}`}
            alt={`logo`}
            className="rounded-sm object-cover"
          />
        </div>
        <div>
          <h4 className="text-primary mb-1">{companyName}</h4>
          <h3 className="text-primary font-semibold mb-2">{jobTitle}</h3>
          <div className="text-primary/70 text-base flex flex-wrap gap-2 mb-2">
            <span className="flex items-center gap-1">
              <FiMapPin />
              {jobLocation}
            </span>
            <span className="flex items-center gap-1">
              <FiClock />
              {employmentType}
            </span>
            <span className="flex items-center gap-1">
              <FiDollarSign />
              {minPrice}-{maxPrice}k
            </span>
            <span className="flex items-center gap-1">
              <FiCalendar />
              {postingDate}
            </span>
          </div>
          <p className="text-base text-primary/70">{description}</p>
        </div>
      </Link>
    </section>
  );
};

export default Card;
