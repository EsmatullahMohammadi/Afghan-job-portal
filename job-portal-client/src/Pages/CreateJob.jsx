import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import CreatableSelect from 'react-select/creatable'

const CreateJob = () => {
    const [selectOption, setSelectedOption] = useState(null);
    const [companyLogo, setCompanyLogo] = useState(null);  // Updated to store file

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm();

    const onSubmit = (data) => {
        data.skills=selectOption
        // Use FormData to send files and other data
        const formData = new FormData();
        formData.append('jobTitle', data.jobTitle);
        formData.append('companyName', data.companyName);
        formData.append('minPrice', data.minPrice);
        formData.append('maxPrice', data.maxPrice);
        formData.append('salaryType', data.salaryType);
        formData.append('jobLocation', data.jobLocation);
        formData.append('postingDate', data.postingDate);
        formData.append('experienceLevel', data.experienceLevel); 
        formData.append('skills', JSON.stringify(selectOption)); // Add skills array as JSON string
        formData.append('employmentType', data.employmentType);
        formData.append('description', data.description);
        formData.append('posteBy', data.posteBy);

        // If a company logo is selected, add it to the FormData
        if (companyLogo) {
            formData.append('file', companyLogo);
        }

        // Send POST request to server
        fetch("http://localhost:3000/post-job", {
            method: "POST",
            body: formData,  // FormData is sent directly, no need for headers
        })
        .then(res => res.json())
        .then((result) => {
            console.log(result);
            if (result.acknowledged === true) {
                alert("Job Posted Successfully!!!");
            }
            reset();
            setSelectedOption(null);  // Reset skills select
            setCompanyLogo(null);     // Reset file input
        })
        .catch(err => console.log(err));
    };

    const option = [
        { value: "HTML", label: "HTML" },
        { value: "CSS", label: "CSS" },
        { value: "JavaScript", label: "JavaScript" },
        { value: "React", label: "React" },
        { value: "Redux", label: "Redux" },
        { value: "Node", label: "Node" },
        { value: "MongoDB", label: "MongoDB" },
        { value: "C++", label: "C++" },
        { value: "Java", label: "Java" }
    ];

    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 '>
            {/* Form */}
            <div className='bg-gray-100 py-10 px-4 lg:px-16'>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                    {/* First Row */}
                    <div className='create-job-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Job Title</label>
                            <input type="text" defaultValue={"Web Developer"} {...register("jobTitle")} className='create-job-input' />
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Company Name</label>
                            <input type="text" placeholder='Ex: Microsoft' {...register("companyName")} className='create-job-input' />
                        </div>
                    </div>

                    {/* Second Row */}
                    <div className='create-job-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Minimum Salary</label>
                            <input type="text" placeholder='20' {...register("minPrice")} className='create-job-input' />
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Maximum Salary</label>
                            <input type="text" placeholder='50' {...register("maxPrice")} className='create-job-input' />
                        </div>
                    </div>

                    {/* Third Row */}
                    <div className='create-job-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Salary Type</label>
                            <select {...register("salaryType")} className='create-job-input'>
                                <option value="">Choose your salary</option>
                                <option value="Hourly">Hourly</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Yearly">Yearly</option>
                            </select>
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Job Location</label>
                            <input type="text" placeholder='Ex: Kabul' {...register("jobLocation")} className='create-job-input' />
                        </div>
                    </div>

                    {/* Fourth Row */}
                    <div className='create-job-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Job Posting Date</label>
                            <input type="date" placeholder='Ex: 2023-10-28' {...register("postingDate")} className='create-job-input' />
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Experience Level</label>
                            <select {...register("experienceLevel")} className='create-job-input'>
                                <option value="">Choose your experience</option>
                                <option value="Any experience">Any experience</option>
                                <option value="Internship">Internship</option>
                                <option value="Work remotely">Work remotely</option>
                            </select>
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
                                        onChange={(e) => setCompanyLogo(e.target.files[0])}  // Updated for file input
                                        className='create-job-input bg-blue py-2 rounded'
                                    />
                                    Choose your company logo here
                                </label>
                            </div>
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Employment Type</label>
                            <select {...register("employmentType")} className='create-job-input'>
                                <option value="">Choose employment type</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Temporary">Temporary</option>
                            </select>
                        </div>
                    </div>

                    {/* Seventh Row */}
                    <div className='w-full'>
                        <label className='block mb-2 text-lg'>Job Description</label>
                        <textarea className='w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700' rows={6}
                            defaultValue={"Develop and maintain web applications using modern technologies. Collaborate with cross-functional teams to define project requirements and deliver solutions. Write clean, maintainable, and efficient code. Troubleshoot and debug applications to ensure smooth operation. Stay updated with the latest industry trends and technologies to enhance project performance.."}
                            placeholder='Job Description' {...register("description")} />
                    </div>

                    {/* Last Row */}
                    <div>
                        <label className='block mb-2 text-lg'>Job Posted by</label>
                        <input type="email" placeholder='your email' {...register("posteBy")} className='create-job-input' />
                    </div>
                    <input type="submit" className='block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer' />
                </form>
            </div>
        </div>
    )
}

export default CreateJob
