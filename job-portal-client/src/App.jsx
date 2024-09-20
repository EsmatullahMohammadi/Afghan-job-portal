import { Outlet } from "react-router-dom"
import NavBar from "./Components/NavBar"
import { createContext, useState } from "react"

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