/* eslint-disable react/prop-types */
import React from 'react'
import i18n from '../i18n'

const InputField = ({handleChange, value, title, name}) => {
  return (
    <label className={`sidebar-label-container ${i18n.language === 'fa' ? 'pr-10' : 'pl-10'}`}>
        <input type="radio" name={name} value={value} onChange={handleChange} />
        <span className={`checkmark ${i18n.language === 'fa' ? 'right-0' : 'left-0'}`}></span>{title}
    </label>
  )
}

export default InputField