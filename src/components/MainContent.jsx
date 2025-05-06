import { useContext, useEffect, useState } from "react"
import "../maincontent.css"
import ChatBar from "./ChatBar";
import { useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function MainContent(){

    const someDummyContents = [{id: 1, category: "write", promptTitle: "Write about focus"},
        {id: 2, category: "write", promptTitle: "Write a short story about a robot discovering emotions"},
        {id: 3, category: "code", promptTitle: "Difference between Promise.all and Promise.allSettled with code."},
        {id: 4, category: "code", promptTitle: "Write code on Binary Search with explaination."},
    ]

    const [selectedCategory, setSelectedCategory] = useState(1);

    const param = useParams();

    const { state, dispatch} = useContext(AppContext);


    useEffect(()=>{
        if(!param)
        setSelectedCategory("write")
    }, [])

    function autoPromptForAnswer(value){
        console.log(1111, value)
          if(value===1){
            setSelectedCategory("write")
          }
          else if(value===2){
            setSelectedCategory("code")
          }
    }

    return(
        <div className="maincontainer"> 
        <div className="centercontainer">
        {!param ?
        <div>  (<h2 style={{color:"#004d40"}}>How can I help you?</h2>
        <div className="btnrow">
        <button onClick={()=>{autoPromptForAnswer(1)}} className="btncontent">Write Something</button>
        <button onClick={()=>{autoPromptForAnswer(2)}} className="btncontent">Code Something</button>
        </div>) </div> : "" }
        <div className="tabholder">
         <div className="tabcontent">
            {!state.chatText.length>0 || !state.responseText.length>0?
               someDummyContents.filter((item)=>item.category === selectedCategory).map((eachItem)=>(
                <ul style={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                    <li key={eachItem.id} style={{listStyle: "none", width: "auto",backgroundColor:"#80cbc4", padding:"8px", fontSize:"14px"}}>{eachItem.promptTitle}</li>
                </ul>
               ))
               : 
               <div>
               {state.chatText.map((chatItem)=>(
                <li>{chatItem}</li>
               ))}
               {state.responseText.map((chatItem)=>(
                <li>{chatItem}</li>
               ))}
               </div>
            }
         </div>
        </div>
        <div>
          {/* chat window */}
          <ChatBar/>
         </div>
         </div>
        </div>
    )
}