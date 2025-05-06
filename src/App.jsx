import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SideBar from './components/SideBar'
import MainContent from './components/MainContent'
import ChatBar from './components/ChatBar'
import HomePage from './pages/HomePage'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'

function App() {
  

  return (
    <>
      
         {/* <SideBar/> */}
         {/* <MainContent/> */}
         {/* <ChatBar/> */}
         {/* <HomePage/> */}
         <Routes>
          <Route path='/' element = {<HomePage/>}/>
          <Route path='/chat/:id' element= {<MainContent/>}/>
         </Routes>
    </>
  )
}

export default App
