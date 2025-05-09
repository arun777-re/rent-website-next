import React from 'react'
import Navbar from '../Components/Navbar'
import Banner from '../Components/Banner'
import HowItWorks from '../Components/HowItWorks'
import Footer from '../Components/Footer'
import BrokerageCalc from '../Components/BrokerageCalc'

const SellPage = () => {
  return (
    <div>
        <Navbar/>
        <Banner heading='Sell Faster. Save Thousands.' image={'/images/banner-main.jpg'}/>
        <HowItWorks paddingtop={true}/>
        <BrokerageCalc/>
        <Footer/>
    </div>
  )
}

export default SellPage