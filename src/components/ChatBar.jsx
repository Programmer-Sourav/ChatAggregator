import { useContext, useState } from "react"
import { Paperclip, Send } from "lucide-react"
import "../chat.css"
import { sendPromptToGeminiApi } from "../remote/remoteapis"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';
import { AppContext } from "../Context/AppContext"

export default function ChatBar(){
  
    const navigate = useNavigate();
    const [selectModel, setSelectModel] = useState("Gemini")
    const [textPrompt, setTextPrompt] = useState("")

    const { dispatch } = useContext(AppContext);

    const chatID = uuidv4();

    const searchchat = () =>{

    }

    const sendPromptToApi = () =>{
        console.log(231, textPrompt);
        sendPromptToGeminiApi(dispatch, textPrompt)
        navigate(`/chat/${chatID}`)
        dispatch({type: "TEXT", payload: textPrompt})
    }

    return(
        <div className="chatwindow">
              <textarea value={textPrompt} className="chat-window-text" placeholder="Type your message here..." onChange={(e)=>{setTextPrompt(e.target.value)}}/>
              <div className="chatbottom">
                <div className="chatbottomleft">
                    <select value={selectModel} onChange={(e)=>{setSelectModel(e.target.value)}} className="selectbox">
                        <option value="Gemini">Gemini 2.0 Flash</option>
                        <option value="GPT">GPT 3.5</option>
                    </select>
                    <button onClick={searchchat} className="searchbtn">Search</button>
                </div>

                <div className="chatbottomright">
                 <Paperclip  color="#00796b" style={{width: "24px", height: "24px", marginLeft: "8px"}}/>
                 {textPrompt.length>0 ? <Send color = "#00796b" onClick={sendPromptToApi} style={{width: "24px", height: "24px", marginLeft: "8px", marginRight: "8px"}}/> : <Send color = "gray" style={{width: "24px", height: "24px", marginLeft: "8px", marginRight: "8px"}}/>}
                </div>
              </div>
        </div>
    )
}