/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import InputField from '../Components/InputField';
import i18n from '../i18n';

const EmploymentType = ({ handleChange }) => {
  const { t } = useTranslation(); // Initialize useTranslation to access translation keys

  return (
    <div>
      <h3 className='text-lg font-medium mb-2'>{t('employmentType.title')}</h3> {/* Use translation key for title */}
      <label className={`sidebar-label-container ${i18n.language === 'fa' ? 'pr-10' : 'pl-10'}`}>
        <input type="radio" id='test' name="test" value="" onChange={handleChange} />
        <span className={`checkmark ${i18n.language === 'fa' ? 'right-0' : 'left-0'}`}></span>{t('employmentType.anyExperience')} {/* Use translation key for "Any experience" */}
      </label>
      <InputField handleChange={handleChange} value={"Full-time"} title={t('employmentType.fullTime')} name="test" /> {/* Use translation key for "Full-time" */}
      <InputField handleChange={handleChange} value={"Part-time"} title={t('employmentType.partTime')} name="test" /> {/* Use translation key for "Part-time" */}
      <InputField handleChange={handleChange} value={"Temporary"} title={t('employmentType.temporary')} name="test" /> {/* Use translation key for "Temporary" */}
    </div>
  );
}

export default EmploymentType;
