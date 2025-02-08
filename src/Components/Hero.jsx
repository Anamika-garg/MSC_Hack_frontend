import React from 'react'
import Button from '../Components/Button';

const Hero = () => {
  return (
    <>
        <section className="text-center py-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white mt-[75px]">
        <h1 className="text-4xl font-bold mb-4">Empowering Youth with AI Solutions</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Discover personalized career paths, improve mental well-being, connect with young creators, and enhance learning with our AI-powered platforms.
        </p>
        <div className="mt-6">
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-full text-lg">Get Started</Button>
          <Button variant="outline" className="ml-4 px-6 py-3 rounded-full text-lg border-white text-white hover:bg-white hover:text-purple-500">
            Explore More
          </Button>
        </div>
      </section>
    </>
  )
}

export default Hero