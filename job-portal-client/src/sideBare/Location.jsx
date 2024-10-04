/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import InputField from '../Components/InputField';
import i18n from '../i18n';

const Location = ({ handleChange }) => {
  const { t } = useTranslation(); // Initialize useTranslation to access translation keys

  return (
    <div>
      <h3 className='text-lg font-semibold mb-2'>{t('location.title')}</h3> {/* Use translation key for title */}
      <div>
        <label className={`sidebar-label-container ${i18n.language === 'fa' ? 'pr-10' : 'pl-10'}`}>
          <input type="radio" id='test' name="test" value="" onChange={handleChange} />
          <span className={`checkmark ${i18n.language === 'fa' ? 'right-0' : 'left-0'}`}></span>{t('location.all')} 
        </label>
        <InputField handleChange={handleChange} value="kabul" title={t('location.kabul')} name="test" /> 
        <InputField handleChange={handleChange} value="kandahar" title={t('location.kandahar')} name="test" /> 
        <InputField handleChange={handleChange} value="balkh" title={t('location.balkh')} name="test" /> 
        <InputField handleChange={handleChange} value="herat" title={t('location.herat')} name="test" /> 
        <InputField handleChange={handleChange} value="nangarhar" title={t('location.nangarhar')} name="test" /> 
      </div>
    </div>
  );
};

export default Location;
