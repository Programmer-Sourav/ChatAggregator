import { useContext, useEffect, useRef, useState } from "react"
import "../maincontent.css"
import ChatBar from "./ChatBar";
import { useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import ReactMarkdown from 'react-markdown';

export default function MainContent(){

    const someDummyContents = [{id: 1, category: "write", promptTitle: "Write about focus"},
        {id: 2, category: "write", promptTitle: "Write a short story about a robot discovering emotions"},
        {id: 3, category: "code", promptTitle: "Difference between Promise.all and Promise.allSettled with code."},
        {id: 4, category: "code", promptTitle: "Write code on Binary Search with explaination."},
    ]

    const [selectedCategory, setSelectedCategory] = useState(1);
    let typedText = "";

    const {id} = useParams();

    const { state, dispatch} = useContext(AppContext);
    const selectedModel = state.selectedModel;
    const chatRef = useRef(null)

    useEffect(()=>{
        chatRef.current?.scrollIntoView({behaviour: "smooth"})
    }, [state.chatText])


    useEffect(()=>{
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

    const sendToChat = (selectedId) =>{
        const selected = someDummyContents[selectedId-1];
      dispatch({type: "CHATTEXT",  payload: selected})
    }


    function startTyping(callback, text, index=0){
      if(index <text.length){
        callback(text[index])
        setTimeout(()=>{startTyping(callback, text, index+1)}, 50)
      }
    }

    console.log(4444, state.chatText)

    return(
        <div className="container">
        <div className="maincontainer"> 
        <div className="centercontainer">
        { state.chatText.length===1 ?
        <div>  <h2 style={{color:"#004d40"}}>How can I help you?</h2>
        <div className="btnrow">
        <button onClick={()=>{autoPromptForAnswer(1)}} className="btncontent">Write Something</button>
        <button onClick={()=>{autoPromptForAnswer(2)}} className="btncontent">Code Something</button>
        </div> </div> : "" }
        <div className="tabholder">
         <div className="tabcontent">
            {state.chatText.length===1? 
               someDummyContents.filter((item)=>item.category === selectedCategory).map((eachItem)=>(
                <ul style={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                    <li key={eachItem.id} style={{listStyle: "none", width: "auto",backgroundColor:"#80cbc4", padding:"8px", fontSize:"14px"}} onClick={()=>{sendToChat(eachItem.id)}}>{eachItem.promptTitle}</li>
                </ul>
               ))
               : 
               <div className="chatcontent">
               {state.chatText.map((chatItem, index)=>(
                <div>
                <div className={chatItem.question.trim() !== "" ? "chatuser" : ""}>{chatItem.question!==" " && chatItem.question}{state.filePath? <img src={filePath} alt="uploadedfile" width="80px" height="80px"/>:""}</div>
                <div key={index} className="chatagent-container">
                <div className={chatItem.answer!==" " ? "chatagent" : ""}>
                {chatItem.answer === "loading" ? (
  "Answer Getting Ready"
) : (
  <ReactMarkdown>
    {
      selectedModel === "Gemini"
        ? (chatItem.answer?.text?.trim() || "")
        : (chatItem.answer?.trim() || "")
    }
  </ReactMarkdown>
)}
                </div>
              </div>
              </div>
               ))}
               <div ref={chatRef}/>
               {/* {state.chatText.map((chatItem, index)=>(
                <div key={index} className="chatagent-container">
                <div className="chatagent">
                  <ReactMarkdown>{chatItem.answer.text!=="" && chatItem.answer.text}</ReactMarkdown>
                </div>
              </div>
               ))} */}
              {/* {state.responseText.map((chatItem, index) => {
  const text = chatItem.text.trim();

  if (text.startsWith('**')) {
    return (
      <div key={index} className="chatagent-container">
        <div className="chatagent">
          <br />
          <strong>{text.slice(2)}</strong>
        </div>
      </div>
    );
  }

  if (text.startsWith("```")) {
    return (
      <div key={index} className="chatagent-container">
        <pre className="chatagent">
          <code>{text.slice(3)}</code>
        </pre>
      </div>
    );
  }

  return (
    <div key={index} className="chatagent-container">
      <div className="chatagent">{text}</div>
    </div>
  );
})} */}

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
        </div>
    )
}