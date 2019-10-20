import React from 'react'
import './form-input.style.scss'

const FormInput = ({ handleChange, label, name, type, value}) => (
  <div className="group">
    <input className='form-input'
      name={name}
      type={type}
      onChange={ handleChange }
      value={value}
      required
    />
  {
    label ?
    (
      <label className={ `${value.length ? 'shirnk' : ''} form-input-label` }>
        { label }
      </label>
    )
    : null
  }
  </div>
)

export default FormInput