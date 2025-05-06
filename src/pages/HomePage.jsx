import MainContent from "../components/MainContent"
import SideBar from "../components/SideBar"
import "../home.css"

export default function HomePage(){


    return(
        <div className="layout">
        <div className="sidebar"><SideBar/></div>
        <div className="main-content"><MainContent/></div>
      </div>
      
    )
}