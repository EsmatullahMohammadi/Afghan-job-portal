/* eslint-disable react/prop-types */
import React from 'react';
import { FiMapPin, FiSearch } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const Bunner = ({ query, handleInputChange }) => {
  const { t } = useTranslation();

  return (
    <div className='max-w-screen-2xl container max-auto xl:px-24 px-4 md:py-20 py-14' dir={`${i18n.language === 'fa' ? 'rtl' : 'ltr'}`}>
        
        {i18n.language === 'fa'? (<h1 className='text-5xl font-bold mb-3' dir='rtl'>امروز <span className='text-blue'>شغل جدید</span> خود را پیدا کنید</h1>):(<h1 className='text-5xl font-bold mb-3' dir='ltr'>Find Your <span className='text-blue'>New Job</span> Today</h1>)}

      <p className='text-black/70 text-lg mb-8'>{t('bunner.description')}</p>
      <form >
        <div className='flex justify-start md:flex-row flex-col md:gap-0 gap-4'>
          <div className='flex md:rounded-s-md rounded shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/2 w-full'>
            <input
              type="text"
              name='title'
              id='title'
              placeholder={t('bunner.position_placeholder')}
              className={`block flex-1 border-0 bg-transparent py-1.5 ${i18n.language === 'fa' ? 'pr-8' : 'pl-8'} text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6`}
              onChange={handleInputChange}
              value={query}
            />
            <FiSearch className={`absolute mt-2.5 text-gray-400 ${i18n.language === 'fa' ? 'mr-2' : 'ml-2'}`} />
          </div>
          <div className='flex md:rounded-s-none rounded shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/3 w-full'>
            <input
              type="text"
              name='location'
              id='location'
              placeholder={t('bunner.location_placeholder')}
              className={`block flex-1 border-0 bg-transparent py-1.5 ${i18n.language === 'fa' ? 'pr-8' : 'pl-8'} text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6`}
            />
            <FiMapPin className={`absolute mt-2.5 text-gray-400 ${i18n.language === 'fa' ? 'mr-2' : 'ml-2'}`}/>
          </div>
          <button type='submit' className='bg-blue py-2 px-8 md:rounded-s-none rounded text-white'>
            {t('bunner.search_button')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Bunner;
