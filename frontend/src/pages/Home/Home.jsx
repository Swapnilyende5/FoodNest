import React from 'react'
import Hero from '../../components/Hero'
import FeaturedMenu from '../../components/FeaturedMenuCard/FeaturedMenuCard'
import About from './About'
import PartnerWithUs from '../../components/PartnerWithUs'

const Home = () => {
    return (
        <>
            <Hero />
            <FeaturedMenu />
            <PartnerWithUs />
            <About />
        </>
    )
}

export default Home
