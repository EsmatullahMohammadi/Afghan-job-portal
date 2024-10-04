import { createContext, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Outlet } from "react-router-dom";
import NavBar from "./Components/NavBar";

 export const profileContext = createContext();
function App() {
    const [profile,setProfile] = useState(false)
    return (
    <>
        <profileContext.Provider value={{profile, setProfile}}>
        <NavBar />
        <Outlet />
        </profileContext.Provider>        
    </>
    )
}

export default App