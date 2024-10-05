import { useState } from 'react';
import { FaBarsStaggered, FaXmark } from 'react-icons/fa6';
import { Link, NavLink } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { FiGlobe } from 'react-icons/fi';

const NavBar = () => {
  const [isMenuOpen,setIsMenuOpen]=useState(false);
  const { t } = useTranslation()
  
  
  const handleMenuToggler=()=>{
    setIsMenuOpen(!isMenuOpen)
  }
  const photoURL = sessionStorage.getItem("photoURL");
  const handleLogout=()=>{
    const auth = getAuth();
    signOut(auth).then(() => {
      // console.log("logout successful")
    }).catch((error) => {
      // console.log("an error with logout")
    });
      sessionStorage.removeItem('isAuthenticated');
      window.location.reload();
  }
 
  const navItem=[
    {path:"/",title: t('startSearch') },
    {path:"/salary",title: t('salaryEstimate') },
    {path:"/post-job",title: t('postJob') },
    {path:"/my-job",title: t('myJobs') }
  ]
  
  return (
    <header className='max-w-screen-2xl container mx-auto xl:px-24  px-4 sticky top-0 z-500 bg-white shadow-md border-b-2 border-b-gray-500'>
      <nav className={`flex justify-between items-center py-6 `}>
        <a href="/" className=''><img src="images/result (1).png" alt="Afghn Jop Portal"  className=' h-10 w-52 border-0'/></a>
        {/* nav Item for large device */}
        <ul dir={`${i18n.language === 'fa' ? 'rtl' : 'ltr'}`} className='hidden md:flex gap-12 font-iransans'>
          {
            navItem.map(({path,title})=>(
              <li key={path} className={`text-base text-primary hover:font-semibold ${i18n.language === 'fa' ? 'text-lg' : 'text-base'}`}>
                <NavLink to={path} className={({isActive})=> isActive?"active":""}>
                  {title}
                </NavLink>
              </li>
            ))
          }
        </ul>
        
        <div className='flex items-center'>
          {/* it is the muti language the site */}
          <div className="relative inline-block">
            <select
              className="appearance-none text-sm rounded-md py-2 pl-10 pr-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              onChange={(e) => {
                i18n.changeLanguage(e.target.value);
              }}
              value={i18n.language}
            >
              <option value="en" className="text-gray-800">English</option>
              <option value="fa" className="text-gray-800">فارسی</option>
            </select>
            {/* Globe Icon positioned inside the select */}
            <FiGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5 pointer-events-none" />
          </div>
          {/* sign up and login buttons */}
          {sessionStorage.getItem('isAuthenticated') ? (
            <div className='text-base text-primary font-medium space-x-5 hidden lg:block'>
              <button onClick={handleLogout} className='py-2 px-5 border border-blue rounded  text-black hover:bg-blue hover:text-white'>{t('logout')}</button>
              <img src={photoURL || "images/userLogo.png" }
                className="w-12 h-12 inline rounded-full border object-cover"
                alt="User Profile"
              />
            </div>
          ):(
            <div className='text-base text-primary font-medium space-x-5 hidden lg:block'>
              <Link to="/login" className='py-2 px-5 border rounded hover:text-lg'>{t('login')}</Link>
              <Link to="/sign-up" className='py-2 px-5 border rounded bg-blue text-white hover:text-lg'>{t('signUp')}</Link>
            </div>
          )}
          
        
          {/* mobile menu */}
          <div className={`md:hidden block ${i18n.language === 'fa' ? 'pl-2' : ''}`}>
            <button onClick={handleMenuToggler}>
              {isMenuOpen ? <FaXmark className='w-5 h-5 text-primary' /> : <FaBarsStaggered  className='w-5 h-5 text-primary'/>}
            </button>
          </div>
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