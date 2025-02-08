import React, { useEffect , useState} from 'react';
import Card from '../Components/Card';
import CardContent from '../Components/CardContent';
import Button from '../Components/Button';
import { MapPin, Briefcase, GraduationCap, Phone, Mail, Info } from "lucide-react";
import axios from 'axios';

const Profile = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetchDetails();
    }, []);

    async function fetchDetails() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_USER_URL}/profile` , {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            console.log(response.data)
            setData(response.data.profile);
        }
        catch (err) {
            console.log(err);
        }
    }

  if (!data) return <div>Loading...</div>;

  const { fullName, email, details } = data;
    return (
        <div className="max-w-4xl mx-auto p-4 mt-[90px]">
        <Card className="p-4 shadow-lg rounded-2xl">
          <CardContent className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center text-purple-500 text-2xl font-bold">
              {/* {fullName.charAt(0)} */}
              <img src={details.photoURL} alt="" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{fullName}</h1>
              <p className="text-gray-600 flex items-center mt-1"><Mail className="w-4 h-4 mr-2" /> {email}</p>
              <p className="text-gray-600 flex items-center mt-1"><Phone className="w-4 h-4 mr-2" /> {details.Phone}</p>
            </div>
          </CardContent>
        </Card>
  
        <div className="bg-gray-50 mt-6 p-4 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Bio</h2>
          <p className="text-gray-700 flex items-center"><Info className="w-4 h-4 mr-2" /> {details.Bio}</p>
        </div>
  
        <div className="bg-gray-50 mt-6 p-4 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills</h2>
          <ul className="list-disc list-inside text-gray-700">
            {details.Skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
  
        <div className="bg-gray-50 mt-6 p-4 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Location</h2>
          <p className="text-gray-700 flex items-center"><MapPin className="w-4 h-4 mr-2" /> {details.location[0].city}, {details.location[0].country}</p>
        </div>
  
        <div className="bg-gray-50 mt-6 p-4 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Work Experience</h2>
          {details.Experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <p className="text-gray-900 font-medium flex items-center"><Briefcase className="w-4 h-4 mr-2" /> {exp.title} - {exp.company}</p>
              <p className="text-gray-600">{exp.location}</p>
              <p className="text-gray-600">{new Date(exp.startDate).toLocaleDateString()} - {exp.currentlyWorking ? "Present" : new Date(exp.endDate).toLocaleDateString()}</p>
              <p className="text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
  
        <div className="bg-gray-50 mt-6 p-4 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Education</h2>
          {details.Education.map((edu, index) => (
            <div key={index} className="mb-4">
              <p className="text-gray-900 font-medium flex items-center"><GraduationCap className="w-4 h-4 mr-2" /> {edu.course} - {edu.college}</p>
              <p className="text-gray-600">{new Date(edu.startDate).toLocaleDateString()} - {new Date(edu.endDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
  
        <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white text-lg py-3 rounded-2xl">Edit Profile</Button>
      </div>
    );
  };
  
  export default Profile;
  