import React from 'react'
import { Link } from 'react-router-dom'; 
import '../styles/Pricing.css'; 

export default function Pricing() {
  return (
    <div className='pricing'>
        <h2 className='pricing-header'>Our Subscription Models</h2>
        <img src='images/pricing.png' alt='pricing-model'className='pricing-model'/>
    </div>
  )
}
