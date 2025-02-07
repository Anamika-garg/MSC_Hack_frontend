import React from 'react';
import Button from '../Components/Button';
import Card from '../Components/Card';
import CardContent from '../Components/CardContent';
import { FaBrain, FaLaptopCode, FaHeartbeat, FaUsers } from 'react-icons/fa';

const Testimonials = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10 text-indigo-700">What Users Say</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <Card className="text-center shadow-lg hover:shadow-xl transition duration-300">
          <CardContent>
            <p className="italic text-gray-600">“The career guidance was spot-on and helped me find internships I never knew existed!”</p>
            <div className="mt-4 font-semibold text-indigo-700">- Alex J.</div>
          </CardContent>
        </Card>

        <Card className="text-center shadow-lg hover:shadow-xl transition duration-300">
          <CardContent>
            <p className="italic text-gray-600">“The AI mental health support is a game changer. The daily affirmations keep me motivated!”</p>
            <div className="mt-4 font-semibold text-indigo-700">- Taylor M.</div>
          </CardContent>
        </Card>

        <Card className="text-center shadow-lg hover:shadow-xl transition duration-300">
          <CardContent>
            <p className="italic text-gray-600">“I connected with amazing creators through the platform. Our startup is now thriving!”</p>
            <div className="mt-4 font-semibold text-indigo-700">- Jordan K.</div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Testimonials;
