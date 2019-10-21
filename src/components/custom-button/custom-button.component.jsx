import React from 'react'
import './custom-button.style.scss'

const CustomButton = ({children, type}) => (
  <button className="custom-button" type={type}>
    {children}
  </button>
)

export default CustomButton
