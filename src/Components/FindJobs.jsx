import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';
import { useLocation } from 'react-router-dom';

export default function FindJobs() {
  const [data, setData] = useState([]);
  const { state } = useLocation();

  useEffect(() => {
    if (state && state.data) {
      setData(state.data);
    }
  }, [state]);

  // Filters for both Work Type and Job Type (mutually exclusive)
  const [filters, setFilters] = useState({ workType: '', jobType: '' });

  // Handle mutually exclusive Work Type filters
  const handleWorkTypeChange = (value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      workType: prevFilters.workType === value ? '' : value, // Uncheck if clicked again
    }));
  };

  // Handle mutually exclusive Job Type filters
  const handleJobTypeChange = (value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      jobType: prevFilters.jobType === value ? '' : value, // Uncheck if clicked again
    }));
  };

  // Filtering logic
  const filteredData = data.filter((job) => {
    const workTypeMatch =
      !filters.workType ||
      (filters.workType === 'Remote' && job.remote_derived) ||
      (filters.workType === 'Onsite' && !job.remote_derived) ||
      (filters.workType === 'Hybrid' && job.location_type === 'Hybrid');

    const jobTypeMatch =
      !filters.jobType || job.employment_type.includes(filters.jobType);

    return workTypeMatch && jobTypeMatch;
  });

  return (
    <div className="flex flex-col md:flex-row p-4 bg-gray-100 min-h-screen mt-[70px]">
      {/* Sidebar Filters */}
      <div className="w-[70%] relative pl-7 md:w-1/4 mb-6 md:mb-0 md:pr-4">
        {/* Work Type Filters */}
        <h2 className="text-xl font-semibold mb-4">Filter by Work Type</h2>
        {['Remote', 'Hybrid', 'Onsite'].map((workType) => (
          <div key={workType} className="mb-2">
            <input
              type="checkbox"
              id={`workType-${workType}`}
              checked={filters.workType === workType}
              onChange={() => handleWorkTypeChange(workType)}
              className="mr-2"
            />
            <label htmlFor={`workType-${workType}`} className="text-gray-700">
              {workType}
            </label>
          </div>
        ))}

        {/* Job Type Filters */}
        <h2 className="text-xl font-semibold mt-6 mb-4">Filter by Job Type</h2>
        {['FULL_TIME', 'PART_TIME', 'CONTRACT'].map((jobType) => (
          <div key={jobType} className="mb-2">
            <input
              type="checkbox"
              id={`jobType-${jobType}`}
              checked={filters.jobType === jobType}
              onChange={() => handleJobTypeChange(jobType)}
              className="mr-2"
            />
            <label htmlFor={`jobType-${jobType}`} className="text-gray-700 capitalize">
              {jobType.replace('_', ' ')}
            </label>
          </div>
        ))}
      </div>

      {/* Job Cards */}
      <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.length > 0 ? (
          filteredData.map((job, index) => (
            <JobCard jobData={job} key={index} />
          ))
        ) : (
          <p className="text-center col-span-full">No jobs found for the selected filters.</p>
        )}
      </div>
    </div>
  );
}
