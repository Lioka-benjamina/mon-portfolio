import { Route, Routes } from "react-router-dom"
import Portfolio from "../components/accueil/accueil"

export const Router = () =>{
    return(
        <>
            <Routes>
                <Route path="/" element={<Portfolio/>}/>
                <Route path="/accueil" element={<Portfolio/>}/>
            </Routes>
        </>
    )
}