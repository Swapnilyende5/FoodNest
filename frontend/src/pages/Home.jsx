import React from 'react'
import Hero from '../components/Hero'
import FeaturedMenu from '../components/FeaturedMenuCard/FeaturedMenuCard'
import About from './About'
import Contact from './Contact'

const Home = () => {
    return (
        <>
            <Hero />
            <FeaturedMenu />
            <About />
            <Contact />
        </>
    )
}

export default Home
