/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import InputField from '../Components/InputField';
import i18n from '../i18n';

const WorkExperience = ({ handleChange }) => {
  const { t } = useTranslation(); // Initialize useTranslation to access translation keys

  return (
    <div>
      <h3 className='text-lg font-medium mb-2'>{t('workExperience.title')}</h3> {/* Use translation key for title */}
      <label className={`sidebar-label-container ${i18n.language === 'fa' ? 'pr-10' : 'pl-10'}`}>
        <input type="radio" id='test' name="test" value="" onChange={handleChange} />
        <span className={`checkmark ${i18n.language === 'fa' ? 'right-0' : 'left-0'}`}></span>{t('workExperience.anyExperience')} {/* Use translation key for "Any experience" */}
      </label>
      <InputField handleChange={handleChange} value={"internship"} title={t('workExperience.internship')} name="test" /> {/* Use translation key for "Internship" */}
      <InputField handleChange={handleChange} value={"work remotely"} title={t('workExperience.workRemotely')} name="test" /> {/* Use translation key for "Work remotely" */}
    </div>
  );
}

export default WorkExperience;
