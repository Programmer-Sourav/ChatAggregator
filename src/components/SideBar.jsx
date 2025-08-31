import { useEffect, useState } from "react"
import "./chat-side-bar.css"
import { useNavigate } from "react-router-dom";

export default function SideBar(){

   const [searchValue, setSearchValue] = useState("")
   const [listOfConvo, setListOfConvo] = useState([])
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const navigation = useNavigate();

   const preData = [{id: 1, title: "Welcome to freeChat", content: "We are providing Gemini and OpenAI free API together in a single application."},
     {id:2, title: "FaQs", content: [{question:"Is it Free?", answer: "Yes it is free from our side."}, 
        {question:"Do we need to pay?", answer: "If you pay, it will directly go tho Google Gemini And OpenAI and not to me."}
     ]}
   ]
   useEffect(()=>{
     setListOfConvo([...listOfConvo, ...preData])
   }, [])

   console.log(111, listOfConvo)
    const startANewChat = () =>{

    }

    const startAMedChat = () =>{
       navigation("/medical")
    }

    return(
       <>
      {/* Hamburger Icon - Only visible on small screens */}
      <button
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="hamburger-btn"
      >
        ☰
      </button>

      {/* Sidebar */}
      <div className={`chatsidebar ${isSidebarOpen ? 'open' : ''}`}>
        <h2 style={{ color: "#FFFFFF" }}>freeCHAT</h2>
        <button onClick={startANewChat} className="start-chat-button">New Chat</button>
        <button onClick={startAMedChat} className="start-chat-button">Medical AI</button>
        <input
          type="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search Your Conversations.."
          className="convo"
        />
        {listOfConvo.length > 0 &&
          listOfConvo.map((convo, index) => (
            <li key={index} className="convo-item">
              {convo.title || "untitled"}
            </li>
          ))}
      </div>
    </>
    )
}