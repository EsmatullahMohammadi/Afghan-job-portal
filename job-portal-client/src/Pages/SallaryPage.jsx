import React, { useEffect, useState } from 'react'
import PageHeader from '../Components/PageHeader'

const SallaryPage = () => {
    const [searchText,setSearchText] = useState('');
    const [salarys,setSalarys]= useState([]);

    useEffect(()=>{
        fetch('salary.json').then(res=>res.json()).then(data=>setSalarys(data))
    } ,[searchText])
    const handleSearch= ()=>{
        const filter= salarys.filter((salary)=>salary.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
        setSalarys(filter);
    }

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-gray-100'>
        <PageHeader path={"Estimate Salary"} salary={"Salary"}/>
        <div className='mt-5'>
            <div className='search-box p-2 text-center mb-2'>
                <input type="text" name='search' id='search' className='py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full'  onChange={e => setSearchText(e.target.value)}  />
                <button onClick={handleSearch} className='bg-blue text-white font-semibold px-8 py-2 mb-4'>Search</button>
            </div>
        </div>
        {/* salary display card */}
        <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-12 my-12 items-center'>
            {
                salarys.map((salary)=>(
                    <div key={salary.id} className='shadow px-4 py-8'> 
                        <h4 className='font-semibold text-xl'>{salary.title}</h4>
                        <p className='my-2 font-medium text-blue text-lg'>{salary.salary}</p>
                        <div className='flex flex-wrap gap-4'>
                            <a href="/" className='underline'>{salary.status}</a>
                            <a href="/" className='underline'>{salary.skills}</a>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default SallaryPage