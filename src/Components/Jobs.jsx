import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
const Jobs = () => {
    const navigate = useNavigate();
    const [myData, setMyData] = useState([]);
    const [formData, setFormData] = useState({
        jobTitle: '',
        location: ''
    })
    const findJob = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('jobTitle', formData.jobTitle);
        data.append('location', formData.location);

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_JOB_URL}/jobs`, data, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log(res.data);
            // navigate('/findJobs' , {state : res.data})

        }
        catch (err) {
            console.log(err);
        }
        // navigate('/findJobs');
    }

    useEffect(() => {
        fetchDetails();
    }, [])

    async function fetchDetails() {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_JOB_URL}/jobsInterestedIn`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log(res.data);
            setMyData(res.data.data)

        }
        catch (err) {
            console.log(err);
        }
    }

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className="bg-white text-gray-800 font-sans">
            {/* Hero Section */}
            <header className="text-center bg-purple-50 py-16 mt-[70px] px-4 sm:px-8 md:px-16 lg:px-32">
                <h2 className="text-3xl sm:text-4xl font-bold text-purple-700">Get Your Desired Job!</h2>
                <p className="text-gray-600 mt-4 text-sm sm:text-base">Find Jobs, Employment & Career Opportunities</p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                    <input type="text" placeholder="Job Title" className="border border-gray-300 p-3 w-full sm:w-1/3 rounded-md" name="jobTitle" value={FormData.jobTitle} onChange={changeHandler} />
                    <input type="text" placeholder="City or State" className="border border-gray-300 p-3 w-full sm:w-1/3 rounded-md" name="location" value={FormData.location} onChange={changeHandler} />
                    <button className="bg-purple-700 text-white px-6 py-3 rounded-md hover:bg-purple-800 w-full sm:w-auto" onClick={findJob}>Find a Job</button>
                </div>
                <p className="mt-4 text-gray-500 text-xs sm:text-sm">Trending Keywords: Automotive, Education, Health & Care, Engineering</p>
            </header>

            {/* Jobs Section */}
            <section className="bg-purple-50 py-16 px-4 sm:px-8 md:px-16 lg:px-32">
                <h3 className="text-center text-2xl sm:text-3xl font-bold text-purple-700">Jobs You May Be Interested In</h3>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myData.map((job, index) => (
                        <div
                            key={index}
                            className="p-6 border border-gray-200 rounded-md bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <h4 className="text-lg font-semibold text-purple-700">{job.title}</h4>
                            <p className="text-gray-600 mt-1">{job.organization}</p>
                            <p className="text-gray-500 text-sm mt-1">{job.employment_type[0].replace('_', '-')}</p>
                            <a
                                href={job.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                View Job Posting
                            </a>
                        </div>
                    ))}
                    {/* {[
                        { title: "Post-Room Operate", company: "Tour Design LTD", time: "1 Hr Ago" },
                        { title: "Data Entry", company: "Via Technos Inc.", time: "3 Hr Ago" },
                        { title: "Graphic Designer", company: "Daven Design", time: "4 Hr Ago" },
                        { title: "Web Developer", company: "Web Magnews", time: "5 Hr Ago" },
                        { title: "Digital Marketer", company: "VIA Marketer LTD", time: "6 Hr Ago" },
                        { title: "UI/UX Designer", company: "Via Design Hunter", time: "7 Hr Ago" },
                    ].map((job, index) => (
                        <div
                            key={index}
                            className="p-6 border border-gray-200 rounded-md bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <h4 className="text-lg font-semibold text-purple-700">{job.title}</h4>
                            <p className="text-gray-600 mt-1">{job.company}</p>
                            <p className="text-gray-500 text-sm mt-1">{job.time}</p>
                        </div>
                    ))} */}
                </div>
            </section>
        </div>
    );
};

export default Jobs;
