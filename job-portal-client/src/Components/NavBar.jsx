import { useState } from 'react';

import { FaBarsStaggered, FaXmark } from 'react-icons/fa6';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
  const [isMenuOpen,setIsMenuOpen]=useState(false);
  
  const handleMenuToggler=()=>{
    setIsMenuOpen(!isMenuOpen)
  }

  const photoURL = sessionStorage.getItem("photoURL");
  const handleLogout=()=>{
      sessionStorage.removeItem('isAuthenticated');
      window.location.reload();
  }
 
  const navItem=[
    {path:"/",title:"Start A Search"},
    {path:"/my-job",title:"My Jobs"},
    {path:"/salary",title:"Salary Estimate"},
    {path:"/post-job",title:"Post A Job"}
  ]
  return (
    <header className='max-w-screen-2xl container mx-auto xl:px-24  px-4 '>
      <nav className='flex justify-between items-center py-6 '>
        <a href="/" className=''><img src="images/result (1).png" alt=""  className=' h-10 w-52'/></a>
        {/* nav Item for large device */}
        <ul className='hidden md:flex gap-12'>
          {
            navItem.map(({path,title})=>(
              <li key={path} className='text-base text-primary'>
                <NavLink to={path} className={({isActive})=> isActive?"active":""}>
                  {title}
                </NavLink>
              </li>
            ))
          }
        </ul>
        {/* sign up and login buttons */}
        {sessionStorage.getItem('isAuthenticated') ? (
          <div className='text-base text-primary font-medium space-x-5 hidden lg:block'>
            <button onClick={handleLogout} className='py-2 px-5 border rounded bg-blue text-white'>Logout</button>
            <img src={photoURL} className='w-12 h-12 inline rounded-full border border-white object-cover' alt="" />
          </div>
        ):(
          <div className='text-base text-primary font-medium space-x-5 hidden lg:block'>
            <Link to="/login" className='py-2 px-5 border rounded'>Login</Link>
            <Link to="/sign-up" className='py-2 px-5 border rounded bg-blue text-white'>Sign up</Link>
          </div>
        )}
        
        {/* mobile menu */}
        <div className='md:hidden block'>
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? <FaXmark className='w-5 h-5 text-primary' /> : <FaBarsStaggered  className='w-5 h-5 text-primary'/>}
          </button>
        </div>
      </nav>
      {/* navitem for mobile */}
      <div className={`px-4 py-5 bg-black rounded-sm ${isMenuOpen? '' : 'hidden'}`}>
        <ul>
        {
            navItem.map(({path,title})=>(
              <li key={path} className='text-base text-white first:text-white py-1'>
                <NavLink to={path} className={({isActive})=>isActive ? 'active' : ''}>
                  {title}
                </NavLink>
              </li>
            ))
          }
          <li className='text-white text-base'><Link to="/login">Login</Link></li>
        </ul>
      </div>
    </header>
  )
}

export default NavBar