import { Outlet } from "react-router-dom"
import NavBar from "./Components/NavBar"

function App() {

    return (
        <>
         <NavBar />
         <Outlet />
         {/* fotter */}
        </>
    )
}

export default App