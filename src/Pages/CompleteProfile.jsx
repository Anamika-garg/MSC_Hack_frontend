import React, { useState } from "react";

const CompleteProfile = () => {
  const [experiences, setExperiences] = useState([
    { company: "", position: "", startDate: "", endDate: "" },
  ]);

  const [educations, setEducations] = useState([
    { course: "", college: "", startDate: "", endDate: "", pursuing: false },
  ]);

  const addExperience = () => {
    setExperiences([
      ...experiences,
      { company: "", position: "", startDate: "", endDate: "" },
    ]);
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = experiences.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    setExperiences(updatedExperiences);
  };

  const addEducation = () => {
    setEducations([
      ...educations,
      { course: "", college: "", startDate: "", endDate: "", pursuing: false },
    ]);
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducations = educations.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    setEducations(updatedEducations);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-[60vw]">
        <h1 className="text-2xl font-bold text-center text-purple-600 mb-6">
          Complete Your Profile
        </h1>

        {/* Profile Photo Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-purple-100 text-purple-600 rounded-full w-20 h-20 flex justify-center items-center mb-3 text-2xl">
            📍
          </div>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-500">
            Upload Photo
          </button>
        </div>

        {/* Skills Input */}
        <div className="mb-4">
          <label htmlFor="skills" className="block text-gray-700 mb-2">
            Skills
          </label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Enter Your Skills (separated by comma)"
          />
        </div>

        {/* Experiences Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Work Experience
          </h2>
          {experiences.map((experience, index) => (
            <div key={index} className="mb-4 space-y-2">
              <input
                type="text"
                placeholder="Company"
                value={experience.company}
                onChange={(e) =>
                  handleExperienceChange(index, "company", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Position"
                value={experience.position}
                onChange={(e) =>
                  handleExperienceChange(index, "position", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              <div className="flex gap-4">
                <input
                  type="date"
                  value={experience.startDate}
                  onChange={(e) =>
                    handleExperienceChange(index, "startDate", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="date"
                  value={experience.endDate}
                  onChange={(e) =>
                    handleExperienceChange(index, "endDate", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addExperience}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-500"
          >
            Add Another Experience
          </button>
        </div>

        {/* Education Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Education
          </h2>
          {educations.map((education, index) => (
            <div key={index} className="mb-4 space-y-2">
              <input
                type="text"
                placeholder="Course"
                value={education.course}
                onChange={(e) =>
                  handleEducationChange(index, "course", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="College"
                value={education.college}
                onChange={(e) =>
                  handleEducationChange(index, "college", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              <div className="flex gap-4 items-center">
                <input
                  type="date"
                  value={education.startDate}
                  onChange={(e) =>
                    handleEducationChange(index, "startDate", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="date"
                  value={education.pursuing ? "" : education.endDate}
                  onChange={(e) =>
                    handleEducationChange(index, "endDate", e.target.value)
                  }
                  disabled={education.pursuing}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={education.pursuing}
                  onChange={(e) =>
                    handleEducationChange(index, "pursuing", e.target.checked)
                  }
                  className="mr-2"
                />
                <label className="text-gray-700">Currently Pursuing</label>
              </div>
            </div>
          ))}
    
        </div>

        {/* Contact Info */}
        <div className="mt-6">
          <label htmlFor="bio" className="block text-gray-700 mb-2">
            Bio
          </label>
          <textarea
            id="bio"
            placeholder="Tell us about yourself"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 h-24"
          ></textarea>
        </div>
        <div className="mt-4">
          <label htmlFor="phone" className="block text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="Enter your phone number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mt-4 flex gap-4">
          <input
            type="text"
            placeholder="City"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            placeholder="Country"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-500"
        >
          Complete Profile
        </button>
      </div>
    </div>
  );
};

export default CompleteProfile;