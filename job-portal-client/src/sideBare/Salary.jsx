/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import Button from '../Components/Button';
import InputField from '../Components/InputField';
import i18n from '../i18n';

const Salary = ({ handleChange, handleClick }) => {
  const { t } = useTranslation(); // Initialize useTranslation to access translation keys

  return (
    <div>
      <h4 className='text-lg font-medium mb-2'>{t('salary.title')}</h4> {/* Use translation key for title */}
      <div className='mb-4'>
        <Button onClickHandler={handleClick} title={t('salary.hourly')} value="Hourly" /> {/* Use translation key for "Hourly" */}
        <Button onClickHandler={handleClick} title={t('salary.monthly')} value="Monthly" /> {/* Use translation key for "Monthly" */}
        <Button onClickHandler={handleClick} title={t('salary.yearly')} value="Yearly" /> {/* Use translation key for "Yearly" */}
      </div>
      <div className='mb-4'>
        <label className={`sidebar-label-container ${i18n.language === 'fa' ? 'pr-10' : 'pl-10'}`}>
          <input type="radio" id='test2' name="test" value="" onChange={handleChange} />
          <span className={`checkmark ${i18n.language === 'fa' ? 'right-0' : 'left-0'}`}></span>{t('salary.all')} {/* Use translation key for "All" */}
        </label>
        <InputField handleChange={handleChange} value={30} title={t('salary.lessThan30')} name="test" /> {/* Use translation key for "<30000k" */}
        <InputField handleChange={handleChange} value={50} title={t('salary.lessThan50')} name="test" /> {/* Use translation key for "<50000k" */}
        <InputField handleChange={handleChange} value={80} title={t('salary.lessThan80')} name="test" /> {/* Use translation key for "<80000k" */}
        <InputField handleChange={handleChange} value={100} title={t('salary.lessThan100')} name="test" /> {/* Use translation key for "<100000k" */}
      </div>
    </div>
  );
};

export default Salary;
