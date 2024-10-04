import React, { useState } from 'react';
import { FaEnvelopeOpenText, FaRocket } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';

const NewsLetter = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('resume', resume);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        alert(t('newsletter.success_message'));
      } else {
        alert(t('newsletter.error_message'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert(t('newsletter.error_message'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Email Subscription Section */}
      <div>
        <h3 className='text-lg flex items-center gap-2 font-bold mb-2'>
          {t('newsletter.subscribe_title')}
          <FaEnvelopeOpenText />
        </h3>
        <p className='text-primary/75 mb-4 text-base'>
          {t('newsletter.subscribe_desc')}
        </p>
        <input
          type="email"
          name='email'
          id='email'
          placeholder={t('newsletter.email_placeholder')}
          className='w-full block py-2 pl-3 border focus:outline-none'
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>

      {/* Resume Upload Section */}
      <div className='mt-20'>
        <h3 className='text-lg flex items-center gap-2 font-bold mb-2'>
          {t('newsletter.upload_title')}
          <FaRocket />
        </h3>
        <p className='text-primary/75 mb-4 text-base'>
          {t('newsletter.upload_desc')}
        </p>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleResumeChange}
          required
          className='w-full block py-2 pl-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
        />
        <input
          type="submit"
          value={t('newsletter.submit_text')}
          className='w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold mt-4'
        />
      </div>
    </form>
  );
};

export default NewsLetter;
