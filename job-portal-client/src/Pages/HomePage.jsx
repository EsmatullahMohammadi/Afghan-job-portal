import React, { useEffect, useState } from 'react'
import Bunner from '../Components/Bunner'
import Card from '../Components/Card';
import Jobs from './Jobs';
import SideBare from '../sideBare/SideBare';
import NewsLatter from '../Components/NewsLatter';
import Skeleton from '../Components/Skeleton';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const [selectedCatagory,setSelectedCatagory]=useState(null);
  const [jobs,setJobs]=useState([]);
  const [isLoading, seIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage=6;

  const { t } = useTranslation();

  useEffect(()=>{
    seIsLoading(true);
    fetch('https://afghan-job-portal-backend.onrender.com/all-jobs').then(res=>res.json()).then(data=>{
      setJobs(data);
      seIsLoading(false);
    })
  },[])

  const [query,setQuery]=useState("");
  const handleInputChange= (event) => {
      setQuery(event.target.value); 
  }
  //filter jobs by title

  const filteredItem= jobs.filter((job)=>job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1);

  //  radio filtring 
  const handleChange=(event)=>{
    setSelectedCatagory(event.target.value);
  }
  // button based filtring
  const handleClick= (event)=>{
    setSelectedCatagory(event.target.value);
  }

  //calculate range pages
  const calculatePageRange=()=>{
    const startIndex=(currentPage-1)* itemPerPage;
    const endIndex=startIndex+itemPerPage;
    return {startIndex, endIndex};
  }
  //function for the next page
  const nextPage=()=>{
    if(currentPage< Math.ceil(filteredItem.length / itemPerPage)){
      setCurrentPage(currentPage+1);
    }
  }
  //function for previouse page
  const prevPage=()=>{
    if(currentPage > 1){
      setCurrentPage(currentPage-1);
    }
  }

  //main function
  const filterData=(jobs , selected , query)=>{
    let filteredJobs=jobs;
    //filtring input item
    if(query){
      filteredJobs=filteredItem;
    }

    //catagory filtring
    if(selected){
      filteredJobs=filteredJobs.filter(({ jobLocation, maxPrice,experienceLevel, salaryType, employmentType, postingDate })=>(
        jobLocation.toLowerCase() === selected.toLowerCase() ||
        parseInt(maxPrice) <= parseInt(selected) ||
        postingDate >=selected  ||       
        salaryType.toLowerCase() === selected.toLowerCase() ||
        experienceLevel.toLowerCase() === selected.toLowerCase() ||
        employmentType.toLowerCase() === selected.toLowerCase() 
      ));
      console.log(filteredJobs)
    }

    //slice the data based on the current page
    const {startIndex,endIndex}=calculatePageRange();
    filteredJobs=filteredJobs.slice(startIndex,endIndex);
    return filteredJobs.map((data , i)=> <Card key={i} data={data}/>)
  }

  const result=filterData(jobs, selectedCatagory, query);
  return (
    <div className='bg-gray-100 h-screen' dir={`${i18n.language === 'fa' ? 'rtl' : 'ltr'}`}>
      <Bunner query={query} handleInputChange={handleInputChange}/>
      {/* main content */}
      <div className='bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12'>
        {/* left side  */}
        <div className='bg-white p-4 rounded'><SideBare handleChange={handleChange} handleClick={handleClick}/></div>

        {/* main content */}
        <div className='bg-white p-4 col-span-2 rounded-sm'> 
          {
            isLoading ? (<Skeleton />) : result.length>0 ? (<Jobs result={result}/>) :
             <>
              <h3 className='text-lg font-bold mb-2'>{result.length} Jobs</h3>
              <p>No data found!</p>
             </>
          }   
          {/* pagination pages */}
          {
            result.length >0 ? (
              <div className='flex justify-center mt-4 space-x-8'>
                <button onClick={prevPage} disabled={currentPage===1} className='hover:underline'>Previouse</button>
                <span className='mx-2'>Page {currentPage} of {Math.ceil(filteredItem.length/itemPerPage)}</span>
                <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredItem.length/itemPerPage)} className='hover:underline'>Next </button>
              </div>
            ) : ""
          }
        </div>

        {/* right side */}
        <div className='bg-white p-4 rounded'><NewsLatter /></div>   
    </div>
    </div>
  )
}

export default HomePage
