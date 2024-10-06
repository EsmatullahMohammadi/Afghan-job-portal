import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';

const CreateJob = () => {
    const [selectOption, setSelectedOption] = useState(null);
    const [companyLogo, setCompanyLogo] = useState(null); 
    
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        data.skills = selectOption;

        // Create FormData
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
        if (companyLogo) {
            formData.append('file', companyLogo);
        }
        
        fetch("https://afghan-job-portal-api.onrender.com/post-job", {
            method: "POST",
            body: formData,
        })
        .then(res => res.json())
        .then((result) => {
            if (result.acknowledged === true) {
                alert("Job Posted Successfully!!!");
            }
            reset();
            setSelectedOption(null);
            setCompanyLogo(null);
        })
        .catch(err => console.log(err));
    };

    const option = [
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
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 '>
            <div className='bg-gray-100 py-10 px-4 lg:px-16'>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                    {/* First Row */}
                    <div className='create-job-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Job Title</label>
                            <input
                                type="text"
                                placeholder={"Web Developer"}
                                {...register("jobTitle", { required: "Job Title is required" })}
                                className='create-job-input'
                            />
                            {errors.jobTitle && <p className="text-red-600">{errors.jobTitle.message}</p>}
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Company Name</label>
                            <input
                                type="text"
                                placeholder='Ex: Microsoft'
                                {...register("companyName", { required: "Company Name is required" })}
                                className='create-job-input'
                            />
                            {errors.companyName && <p className="text-red-600">{errors.companyName.message}</p>}
                        </div>
                    </div>

                    {/* Second Row */}
                    <div className='create-job-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Minimum Salary</label>
                            <input
                                type="number"
                                placeholder='20'
                                {...register("minPrice", { required: "Minimum Salary is required", min: 0 })}
                                className='create-job-input'
                            />
                            {errors.minPrice && <p className="text-red-600">{errors.minPrice.message}</p>}
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Maximum Salary</label>
                            <input
                                type="number"
                                placeholder='50'
                                {...register("maxPrice", { required: "Maximum Salary is required", min: 0 })}
                                className='create-job-input'
                            />
                            {errors.maxPrice && <p className="text-red-600">{errors.maxPrice.message}</p>}
                        </div>
                    </div>

                    {/* Third Row */}
                    <div className='create-job-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Salary Type</label>
                            <select {...register("salaryType", { required: "Salary Type is required" })} className='create-job-input'>
                                <option value="">Choose your salary</option>
                                <option value="Hourly">Hourly</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Yearly">Yearly</option>
                            </select>
                            {errors.salaryType && <p className="text-red-600">{errors.salaryType.message}</p>}
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Job Location</label>
                            <input
                                type="text"
                                placeholder='Ex: Kabul'
                                {...register("jobLocation", { required: "Job Location is required" })}
                                className='create-job-input'
                            />
                            {errors.jobLocation && <p className="text-red-600">{errors.jobLocation.message}</p>}
                        </div>
                    </div>

                    {/* Fourth Row */}
                    <div className='create-job-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Job Posting Date</label>
                            <input
                                type="date"
                                placeholder='Ex: 2023-10-28'
                                {...register("postingDate", { required: "Job Posting Date is required" })}
                                className='create-job-input'
                            />
                            {errors.postingDate && <p className="text-red-600">{errors.postingDate.message}</p>}
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Experience Level</label>
                            <select {...register("experienceLevel", { required: "Experience Level is required" })} className='create-job-input'>
                                <option value="">Choose your experience</option>
                                <option value="Any experience">Any experience</option>
                                <option value="Internship">Internship</option>
                                <option value="Work remotely">Work remotely</option>
                            </select>
                            {errors.experienceLevel && <p className="text-red-600">{errors.experienceLevel.message}</p>}
                        </div>
                    </div>

                    {/* Fifth Row */}
                    <div>
                        <label className='block mb-2 text-lg'>Required Skill Sets: </label>
                        <CreatableSelect
                            className='create-job-input py-4'
                            defaultValue={selectOption}
                            onChange={setSelectedOption}
                            options={option}
                            isMulti
                        />
                        {errors.skills && <p className="text-red-600">{errors.skills.message}</p>}
                    </div>

                    {/* Sixth Row */}
                    <div className='create-job-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Company Logo</label>
                            <div className='relative' dir='rtl'>
                                <label className='flex justify-between items-center px-3 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6'>
                                    <input
                                        type="file"
                                        placeholder='upload'
                                        {...register("companyLogo", {
                                            required: "Company logo is required",
                                            validate: {
                                                fileSize: (value) =>
                                                    value && value[0].size < 2000000 || "Logo must be smaller than 2MB",
                                                fileType: (value) =>
                                                    value && ["image/jpeg", "image/png", "image/jpg"].includes(value[0]?.type) || "Only PNG, JPG, or JPEG are allowed",
                                            }
                                        })}
                                        onChange={(e) => {
                                            setCompanyLogo(e.target.files[0]);  // Set state for logo file
                                        }}
                                        className='create-job-input bg-blue py-2 rounded'
                                    />
                                    Choose your company logo here
                                </label>
                            </div>
                            {/* Display file input errors */}
                            {errors.companyLogo && <p className="text-red-600">{errors.companyLogo.message}</p>}
                        </div>



                        
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Employment Type</label>
                            <select {...register("employmentType", { required: "Employment Type is required" })} className='create-job-input'>
                                <option value="">Choose employment type</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Temporary">Temporary</option>
                            </select>
                            {errors.employmentType && <p className="text-red-600">{errors.employmentType.message}</p>}
                        </div>
                    </div>

                    {/* Seventh Row */}
                    <div className='w-full'>
                        <label className='block mb-2 text-lg'>Job Description</label>
                        <textarea
                            className='w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700'
                            rows={6}
                            defaultValue={"Develop and maintain web applications using modern technologies. Collaborate with cross-functional teams to define project requirements and deliver solutions. Write clean, maintainable, and efficient code. Troubleshoot and debug applications to ensure smooth operation. Stay updated with the latest industry trends and technologies to enhance project performance."}
                            placeholder='Job Description'
                            {...register("description", { required: "Job Description is required" })}
                        />
                        {errors.description && <p className="text-red-600">{errors.description.message}</p>}
                    </div>

                    {/* Last Row */}
                    <div>
                        <label className='block mb-2 text-lg'>Job Posted by</label>
                        <input
                            type="email"
                            placeholder='your email'
                            {...register("posteBy", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email" } })}
                            className='create-job-input'
                        />
                        {errors.posteBy && <p className="text-red-600">{errors.posteBy.message}</p>}
                    </div>
                    <input type="submit" className='block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer' />
                </form>
            </div>
        </div>
    );
};

export default CreateJob;
