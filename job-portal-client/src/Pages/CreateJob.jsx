import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import CreatableSelect from 'react-select/creatable'

const CreateJob = () => {
    const [selectOption, setSelectedOption]= useState(null);
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const onSubmit = (data) =>{
        data.skills=selectOption;
        //  console.log(data)
        fetch("http://localhost:3000/post-job",{
            method : "POST",
            headers : {'content-type': 'application/json'},
            body : JSON.stringify(data)
        }) 
            .then(res=>res.json()) 
            .then((result)=>{
                console.log(result)
                if(result.acknowledged === true){
                    alert("Job Posted Successfully!!!")
                }
                reset();
            })   
      }

    const option=[
        {value: "HTML" , label:"HTML"},
        {value: "CSS" , label:"CSS"},
        {value: "JavaScript" , label:"JavaScript"},
        {value: "React" , label:"React"},
        {value: "Redux" , label:"Redux"},
        {value: "Node" , label:"Node"},
        {value: "MangoDB" , label:"MangoDB"},
        {value: "C++" , label:"C++"},
        {value: "Java" , label:"Java"}
    ]
    
  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 '>
        {/* Form */}
        <div className='bg-gray-100 py-10 px-4 lg:px-16'>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                {/* first row */}
                <div className='create-job-flex'>
                    <div className='lg:w-1/2 w-full'>
                        <label className='block mb-2 text-lg'>Job Title</label>
                        <input type="text" defaultValue={"Web Developer"} {...register("jobTitle")} className='create-job-input'/>
                    </div>
                    <div className='lg:w-1/2 w-full'>
                        <label className='block mb-2 text-lg'>company Name</label>
                        <input type="text" placeholder='Ex: Microsoft' {...register("companyName")} className='create-job-input'/>
                    </div>
                </div>

                {/* second row */}
                <div className='create-job-flex'>
                    <div className='lg:w-1/2 w-full'>
                        <label className='block mb-2 text-lg'>Minimum Salary</label>
                        <input type="text" placeholder='20' {...register("minPrice")} className='create-job-input'/>
                    </div>
                    <div className='lg:w-1/2 w-full'>
                        <label className='block mb-2 text-lg'>Maximum Salary</label>
                        <input type="text" placeholder='50' {...register("maxPrice")} className='create-job-input'/>
                    </div>
                </div>

                {/* third row */}
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
                        <input type="text" placeholder='Ex: New York' {...register("jobLocation")} className='create-job-input'/>
                    </div>
                </div>

                {/* forth row */}
                <div className='create-job-flex'>
                    <div className='lg:w-1/2 w-full'>
                        <label className='block mb-2 text-lg'>Job Posting Date</label>
                        <input type="date" placeholder='Ex: 2023-10-28' {...register("postingDate")} className='create-job-input'/>
                    </div>
                    <div className='lg:w-1/2 w-full'>
                        <label className='block mb-2 text-lg'>Experience Level</label>
                        <select {...register("experienceLevel")} className='create-job-input'>
                            <option value="">Choose your experience</option>
                            <option value="Any experience">Any experience</option>
                            <option value="Intership">Intership</option>
                            <option value="Work remotely">Work remotely</option>
                        </select>
                    </div>
                </div>

                {/* fifth row */}
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

                {/* sixth row */}
                <div className='create-job-flex'>
                    <div className='lg:w-1/2 w-full'>
                        <label className='block mb-2 text-lg'>Company Logo</label>
                        <input type="url" placeholder='Past your company logo url: https://weshare.com/img1' {...register("companyLogo")} className='create-job-input'/>
                    </div>
                    <div className='lg:w-1/2 w-full'>
                        <label className='block mb-2 text-lg'>Employment Type</label>
                        <select {...register("employmentType")} className='create-job-input'>
                            <option value="">Choose your experience</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Temporary">Temporary</option>
                        </select>
                    </div>
                </div>

                {/* seventh row */}
                <div className='w-full'>
                    <label className='block mb-2 text-lg'>Job Description</label>
                    <textarea className='w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700' rows={6} defaultValue={"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt sunt, totam debitis a modi voluptatum dolore iste molestiae amet non fuga sequi molestias nesciunt eaque distinctio corporis rerum velit nulla eligendi repudiandae. Ab reprehenderit quisquam iste maiores sit nostrum ea dolore quam quis incidunt vitae mollitia fugit."}
                    placeholder='Job Description' {...register("description")}/>
                </div>

                {/* last row */}
                <div>
                    <label className='block mb-2 text-lg'>Job Posted by</label>
                    <input type="email" placeholder='your email' {...register("posteBy")} className='create-job-input'/>
                </div>
                <input type="submit" className='block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer'/>
            </form>
        </div>
    </div>
  )
}

export default CreateJob