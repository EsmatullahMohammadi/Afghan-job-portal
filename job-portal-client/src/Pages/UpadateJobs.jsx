import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
import { useLoaderData, useParams } from 'react-router-dom';

const UpdateJobs = () => {
    const { id } = useParams();
    const {
        _id,
        jobTitle,
        companyName,
        minPrice,
        maxPrice,
        salaryType,
        jobLocation,
        postingDate,
        experienceLevel,
        companyLogo,
        employmentType,
        description,
        posteBy,
        skills,
    } = useLoaderData();

    const [selectOption, setSelectedOption] = useState(skills);
    const [companyLogoFile, setCompanyLogoFile] = useState(null);
    
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        data.skills = selectOption;

        const formData = new FormData();
        formData.append('jobTitle', data.jobTitle);
        formData.append('companyName', data.companyName);
        formData.append('minPrice', data.minPrice);
        formData.append('maxPrice', data.maxPrice);
        formData.append('salaryType', data.salaryType);
        formData.append('jobLocation', data.jobLocation);
        formData.append('postingDate', data.postingDate);
        formData.append('experienceLevel', data.experienceLevel);
        formData.append('employmentType', data.employmentType);
        formData.append('description', data.description);
        formData.append('posteBy', data.posteBy);
        formData.append('skills', JSON.stringify(selectOption));

        // Add the company logo only if a new one is uploaded
        if (companyLogoFile) {
            formData.append('companyLogo', companyLogoFile);
        } else {
            formData.append('companyLogoUrl', companyLogo); // Send the existing URL if no new file is uploaded
        }

        try {
            const response = await fetch(`https://afghan-job-portal-backend.onrender.com/update-job/${_id}`, {
                method: 'PATCH',
                body: formData,
            });

            const result = await response.json();
            if (result.status === true) {
                alert('Job Updated Successfully!!!');
                reset();
            }
        } catch (error) {
            console.error('Error updating job:', error);
        }
    };

    const options = [
        { value: 'HTML', label: 'HTML' },
        { value: 'CSS', label: 'CSS' },
        { value: 'JavaScript', label: 'JavaScript' },
        { value: 'React', label: 'React' },
        { value: 'Redux', label: 'Redux' },
        { value: 'Node', label: 'Node' },
        { value: 'MangoDB', label: 'MangoDB' },
        { value: 'C++', label: 'C++' },
        { value: 'Java', label: 'Java' },
    ];

    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
            <div className="bg-gray-100 py-10 px-4 lg:px-16">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* First row */}
                    <div className="create-job-flex">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Job Title</label>
                            <input
                                type="text"
                                defaultValue={jobTitle}
                                {...register('jobTitle', { required: 'Job title is required' })}
                                className="create-job-input"
                            />
                            {errors.jobTitle && <p className="text-red-600">{errors.jobTitle.message}</p>}
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Company Name</label>
                            <input
                                type="text"
                                defaultValue={companyName}
                                {...register('companyName', { required: 'Company name is required' })}
                                className="create-job-input"
                            />
                            {errors.companyName && <p className="text-red-600">{errors.companyName.message}</p>}
                        </div>
                    </div>

                    {/* Second row */}
                    <div className="create-job-flex">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Minimum Salary</label>
                            <input
                                type="number"
                                defaultValue={minPrice}
                                {...register('minPrice', {
                                    required: 'Minimum salary is required',
                                    min: { value: 1, message: 'Minimum salary must be greater than zero' },
                                })}
                                className="create-job-input"
                            />
                            {errors.minPrice && <p className="text-red-600">{errors.minPrice.message}</p>}
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Maximum Salary</label>
                            <input
                                type="number"
                                defaultValue={maxPrice}
                                {...register('maxPrice', {
                                    required: 'Maximum salary is required',
                                    validate: (value) => value >= minPrice || 'Maximum salary must be higher than minimum salary',
                                })}
                                className="create-job-input"
                            />
                            {errors.maxPrice && <p className="text-red-600">{errors.maxPrice.message}</p>}
                        </div>
                    </div>

                    {/* Third row */}
                    <div className="create-job-flex">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Salary Type</label>
                            <select {...register('salaryType', { required: 'Salary type is required' })} className="create-job-input">
                                <option value={salaryType}>{salaryType}</option>
                                <option value="Hourly">Hourly</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Yearly">Yearly</option>
                            </select>
                            {errors.salaryType && <p className="text-red-600">{errors.salaryType.message}</p>}
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Job Location</label>
                            <input
                                type="text"
                                defaultValue={jobLocation}
                                {...register('jobLocation', { required: 'Job location is required' })}
                                className="create-job-input"
                            />
                            {errors.jobLocation && <p className="text-red-600">{errors.jobLocation.message}</p>}
                        </div>
                    </div>

                    {/* Fourth row */}
                    <div className="create-job-flex">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Job Posting Date</label>
                            <input
                                type="date"
                                defaultValue={postingDate}
                                {...register('postingDate', { required: 'Posting date is required' })}
                                className="create-job-input"
                            />
                            {errors.postingDate && <p className="text-red-600">{errors.postingDate.message}</p>}
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Experience Level</label>
                            <select {...register('experienceLevel', { required: 'Experience level is required' })} className="create-job-input">
                                <option value={experienceLevel}>{experienceLevel}</option>
                                <option value="Any experience">Any experience</option>
                                <option value="Internship">Internship</option>
                                <option value="Work remotely">Work remotely</option>
                            </select>
                            {errors.experienceLevel && <p className="text-red-600">{errors.experienceLevel.message}</p>}
                        </div>
                    </div>

                    {/* Fifth row */}
                    <div>
                        <label className="block mb-2 text-lg">Required Skill Sets: </label>
                        <CreatableSelect
                            className="create-job-input py-4"
                            defaultValue={skills}
                            onChange={setSelectedOption}
                            options={options}
                            isMulti
                        />
                    </div>

                    {/* Sixth row */}
                    <div className="create-job-flex">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Company Logo</label>
                            <div className="relative" dir="rtl">
                                <label className="flex justify-between items-center px-3 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6">
                                    <input
                                        type="file"
                                        onChange={(e) => setCompanyLogoFile(e.target.files[0])}
                                        {...register('companyLogo', {
                                            validate: {
                                                fileType: (value) =>
                                                    value?.length === 0 ||
                                                    ["image/jpeg", "image/png", "image/jpg"].includes(value[0]?.type) ||
                                                    "Only PNG, JPG, or JPEG are allowed",
                                                fileSize: (value) =>
                                                    value?.length === 0 || value[0]?.size < 2000000 ||
                                                    "File size must be smaller than 2MB",
                                            },
                                        })}
                                        className="create-job-input bg-blue py-2 rounded"
                                    />
                                    Choose your company logo here
                                </label>
                                {errors.companyLogo && <p className="text-red-600">{errors.companyLogo.message}</p>}
                            </div>
                        </div>

                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Employment Type</label>
                            <select {...register('employmentType', { required: 'Employment type is required' })} className="create-job-input">
                                <option value={employmentType}>{employmentType}</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Temporary">Temporary</option>
                            </select>
                            {errors.employmentType && <p className="text-red-600">{errors.employmentType.message}</p>}
                        </div>
                    </div>

                    {/* Seventh row */}
                    <div className="w-full">
                        <label className="block mb-2 text-lg">Job Description</label>
                        <textarea
                            className="w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700"
                            rows={6}
                            defaultValue={description}
                            {...register('description', { required: 'Job description is required' })}
                        />
                        {errors.description && <p className="text-red-600">{errors.description.message}</p>}
                    </div>

                    {/* Last row */}
                    <div>
                        <label className="block mb-2 text-lg">Job Posted by</label>
                        <input
                            type="email"
                            defaultValue={posteBy}
                            {...register('posteBy', {
                                required: 'Job posted by is required',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'Invalid email address',
                                },
                            })}
                            className="create-job-input"
                        />
                        {errors.posteBy && <p className="text-red-600">{errors.posteBy.message}</p>}
                    </div>

                    <input
                        type="submit"
                        className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"
                    />
                </form>
            </div>
        </div>
    );
};

export default UpdateJobs;
