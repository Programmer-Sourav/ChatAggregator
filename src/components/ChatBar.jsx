import { useContext, useState } from "react"
import { Paperclip, Send } from "lucide-react"
import "../chat.css"
import { sendPromptToGeminiApi, sendPromptWithFile } from "../remote/remoteapis"
import { useNavigate, useParams } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';
import { AppContext } from "../Context/AppContext"

export default function ChatBar(){
  
    const navigate = useNavigate();
    const [selectModel, setSelectModel] = useState("Gemini")
    const [textPrompt, setTextPrompt] = useState("")
    const [imageAvailable, setImageAvailable] = useState(false)
    const [filePath, setFilePath] = useState("")

    const { dispatch } = useContext(AppContext);

    const chatID = uuidv4();

    const searchchat = () =>{

    }

    const { id } = useParams();

    const attachFile = (e) =>{
        const file =  e.target.files[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setFilePath(fileUrl);
            setImageAvailable(true);
          }
    }

    const sendPromptToApi = () =>{
        if(filePath===""){
        sendPromptToGeminiApi(dispatch, textPrompt)
        navigate(`/chat/${chatID}`)
        dispatch({type: "TEXT", payload: textPrompt})
        }
        else{
            sendImagePromptToApi()
        }
        setTextPrompt("")
        setFilePath("")
    }
    console.log(666, filePath)

    const sendImagePromptToApi = () =>{
        const data = {text: textPrompt, file: filePath}
        sendPromptWithFile(dispatch, data)
        if(id)
        dispatch({type: "TEXT", payload: textPrompt})
        else{
        navigate(`/chat/${chatID}`)
        dispatch({type: "TEXT", payload: textPrompt}) 
        dispatch({type: "FILEPATH", payload: filePath})
        }
    }

    return(
        <div className="chatwindow">
              {imageAvailable && filePath ? <img src={filePath} alt="uploadedfile" width="80px" height="80px"/>:""}
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
                <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
               <Paperclip color="#00796b" style={{ width: "24px", height: "24px", marginLeft: "8px" }} />
              </label>
            <input
            id="file-upload"
            type="file"
            style={{ display: "none" }}
            onChange={(e)=>{attachFile(e)}}
             />
                 {textPrompt.length>0 ? <Send color = "#00796b" onClick={sendPromptToApi} style={{width: "24px", height: "24px", marginLeft: "8px", marginRight: "8px"}}/> : <Send color = "gray" style={{width: "24px", height: "24px", marginLeft: "8px", marginRight: "8px"}}/>}
                </div>
              </div>
        </div>
    )
}