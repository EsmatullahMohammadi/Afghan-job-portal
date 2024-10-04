/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import InputField from '../Components/InputField';
import i18n from '../i18n';

const JobPostingData = ({ handleChange }) => {
  const { t } = useTranslation(); // Initialize useTranslation to access translation keys
  const now = new Date();

  const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);

  const twentyFourHoursAgoDate = twentyFourHoursAgo.toISOString().slice(0, 10);
  const sevenDaysAgoDate = sevenDaysAgo.toISOString().slice(0, 10);
  const thirtyDaysAgoDate = thirtyDaysAgo.toISOString().slice(0, 10);

  return (
    <div>
      <h4 className='text-lg font-medium mb-2'>{t('jobPostingData.title')}</h4> {/* Use translation key for title */}
      <label className={`sidebar-label-container ${i18n.language === 'fa' ? 'pr-10' : 'pl-10'}`}>
        <input type="radio" id='test' name="test" value="" onChange={handleChange} />
        <span className={`checkmark ${i18n.language === 'fa' ? 'right-0' : 'left-0'}`}></span>{t('jobPostingData.allTime')} {/* Use translation key for "All time" */}
      </label>
      <InputField handleChange={handleChange} value={twentyFourHoursAgoDate} title={t('jobPostingData.last24Hours')} name="test" /> {/* Use translation key for "Last 24 hours" */}
      <InputField handleChange={handleChange} value={sevenDaysAgoDate} title={t('jobPostingData.last7Days')} name="test" /> {/* Use translation key for "Last 7 days" */}
      <InputField handleChange={handleChange} value={thirtyDaysAgoDate} title={t('jobPostingData.lastMonth')} name="test" /> {/* Use translation key for "Last Month" */}
    </div>
  );
}

export default JobPostingData;
