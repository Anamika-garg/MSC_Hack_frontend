import React, { useState } from 'react';
import Card from './Card';
import CardContent from './CardContent';
import Button from './Button';

const internshipsData = [
  {
    company: 'Google',
    title: 'Software Engineering Internship',
    type: 'Internship',
    workType: 'Remote',
    deadline: '31-03-2025',
    description: 'Gain hands-on experience in software development and work on real-world projects.'
  },
  {
    company: 'Microsoft',
    title: 'Product Management Internship',
    type: 'Internship',
    workType: 'Hybrid',
    deadline: '15-04-2025',
    description: 'Collaborate with cross-functional teams to bring innovative products to market.'
  },
  {
    company: 'Amazon',
    title: 'Web Development Contract',
    type: 'Contract',
    workType: 'Onsite',
    deadline: '10-05-2025',
    description: 'Develop and maintain scalable web applications for Amazon services.'
  },
];

export default function FindJobs() {
  const [filters, setFilters] = useState({ workType: [], jobType: [] });

  const handleFilterChange = (filterCategory, value) => {
    setFilters((prevFilters) => {
      const updatedCategory = prevFilters[filterCategory].includes(value)
        ? prevFilters[filterCategory].filter((item) => item !== value)
        : [...prevFilters[filterCategory], value];

      return { ...prevFilters, [filterCategory]: updatedCategory };
    });
  };

  const filteredInternships = internshipsData.filter((internship) => {
    const workTypeMatch =
      filters.workType.length === 0 || filters.workType.includes(internship.workType);
    const jobTypeMatch =
      filters.jobType.length === 0 || filters.jobType.includes(internship.type);

    return workTypeMatch && jobTypeMatch;
  });

  return (
    <div className="flex flex-col md:flex-row p-4 bg-gray-100 min-h-screen mt-[70px]">
      {/* Sidebar Filters */}
      <div className="w-[70%] relative pl-7 md:w-1/4 mb-6 md:mb-0 md:pr-4">
        <h2 className="text-xl font-semibold mb-4">Filter by Work Type</h2>
        {['Remote', 'Hybrid', 'Onsite'].map((workType) => (
          <div key={workType} className="mb-2">
            <input
              type="checkbox"
              id={`workType-${workType}`}
              checked={filters.workType.includes(workType)}
              onChange={() => handleFilterChange('workType', workType)}
              className="mr-2"
            />
            <label htmlFor={`workType-${workType}`} className="text-gray-700">
              {workType}
            </label>
          </div>
        ))}

        <h2 className="text-xl font-semibold mt-6 mb-4">Filter by Job Type</h2>
        {['Internship', 'Job', 'Contract'].map((jobType) => (
          <div key={jobType} className="mb-2">
            <input
              type="checkbox"
              id={`jobType-${jobType}`}
              checked={filters.jobType.includes(jobType)}
              onChange={() => handleFilterChange('jobType', jobType)}
              className="mr-2"
            />
            <label htmlFor={`jobType-${jobType}`} className="text-gray-700">
              {jobType}
            </label>
          </div>
        ))}
      </div>

      {/* Internship Cards */}
      <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredInternships.map((internship, index) => (
          <Card key={index} className="shadow-lg flex flex-col justify-between">
            <CardContent className="p-4 flex flex-col">
              <div>
                <h3 className="text-lg font-bold mb-1">{internship.company}</h3>
                <p className="text-md font-medium text-gray-800 mb-2">{internship.title}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                    {internship.workType}
                  </span>
                  <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                    {internship.deadline}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{internship.description}</p>
              </div>
              <div className="flex space-x-2 mt-auto">
                <Button className="w-full">Apply Now</Button>
                <Button variant="outline" className="w-full">Learn More</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
