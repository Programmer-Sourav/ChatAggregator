import { useContext, useEffect, useRef, useState } from "react"
import { Paperclip, Send } from "lucide-react"
import "../chat.css"
import { analyzeImageInputs, analyzeInputText, searchWebByOpenAI, sendPromptToGeminiApi, sendPromptWithFile } from "../remote/remoteapis"
import { useNavigate, useParams } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';
import { AppContext } from "../Context/AppContext"
import InfoWindow from "./InfoWindow"


export default function ChatBar(){
  
    const navigate = useNavigate();
    const [selectModel, setSelectModel] = useState("Gemini")
    const [textPrompt, setTextPrompt] = useState("")
    const [imageAvailable, setImageAvailable] = useState(false)
    const [filePath, setFilePath] = useState("")
    const [simpleFilePath, setSimpleFilePath] = useState("")
    const [searchPrompt, setSearchPrompt] = useState("")
    const [show, setShow] = useState(false)
    const [postion, setPosition] = useState({top: 0, left: 0})

    const btnRef = useRef(null);

    const { state, dispatch } = useContext(AppContext);

    const chatID = uuidv4();

    const searchchat = () =>{

    }

    const { id } = useParams();

    const attachFile = (e) =>{
        const file =  e.target.files[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            if(selectModel==="Gemini"){
            setFilePath(fileUrl);
            setImageAvailable(true);
            }
            else{
              setFilePath(fileUrl);
              setSimpleFilePath(file)
              setImageAvailable(true);  
            }
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

    const sendPromptToOpenApi = () =>{
          if(filePath===""){
        analyzeInputText(dispatch, textPrompt, false)
        navigate(`/chat/${chatID}`)
        dispatch({type: "TEXT", payload: textPrompt})
        }
        else{
            sendImagePromptToOpenApi()
        }
        setTextPrompt("")
        setFilePath("")
    }


    
    const sendImagePromptToOpenApi = () =>{
        const data = {text: textPrompt, file: simpleFilePath}
        analyzeImageInputs(dispatch, data)
        if(id)
        dispatch({type: "TEXT", payload: textPrompt})
        else{
        navigate(`/chat/${chatID}`)
        dispatch({type: "TEXT", payload: textPrompt}) 
        dispatch({type: "FILEPATH", payload: filePath})
        }
    }

    useEffect(()=>{
        setTextPrompt(state.chatPrompt.promptTitle)
    }, [state.chatPrompt])


    const searchWeb = () =>{
        searchWebByOpenAI(dispatch, textPrompt)
        navigate(`/chat/${chatID}`)
        dispatch({type: "TEXT", payload: textPrompt})
        setTextPrompt("")
        setFilePath("")
    }

    useEffect(()=>{
        if(show && btnRef.current){
            const rect = btnRef.current.getBoundingClientRect();
            setPosition({top: rect.top - 40, left: rect.left})
        }
    }, [show])

    return(
        <>
        {selectModel==="Gemini" ? 
        <div className="chatwindow">
              {imageAvailable && filePath ? <img src={filePath} alt="uploadedfile" width="80px" height="80px"/>:""}
              <textarea value={textPrompt} className="chat-window-text" placeholder="Type your message here..." onChange={(e)=>{setTextPrompt(e.target.value)}}/>
              <div className="chatbottom">
                <div className="chatbottomleft">
                    <select value={selectModel} onChange={(e)=>{setSelectModel(e.target.value), {type: "SELECTED_LLM", payload: selectModel}}} className="selectbox">
                        <option value="Gemini">Gemini 2.0 Flash</option>
                        <option value="GPT">GPT 3.5</option>
                    </select>
                    <button ref={btnRef} onMouseEnter={()=>{setShow(true)}} onMouseLeave={()=>{setShow(false)}}  className="searchbtn">Search</button>
                    {show? <InfoWindow/> : ""}
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
                 {textPrompt && textPrompt.length>0 ? <Send color = "#00796b" onClick={sendPromptToApi} style={{width: "24px", height: "24px", marginLeft: "8px", marginRight: "8px"}}/> : <Send color = "gray" style={{width: "24px", height: "24px", marginLeft: "8px", marginRight: "8px"}}/>}
                </div>
              </div>
        </div> : 
        <div className="chatwindow">
              {imageAvailable && filePath ? <img src={filePath} alt="uploadedfile" width="80px" height="80px"/> :""}
              <textarea value={textPrompt} className="chat-window-text" placeholder="Type your message here..." onChange={(e)=>{setTextPrompt(e.target.value)}}/>
              <div className="chatbottom">
                <div className="chatbottomleft">
                    <select value={selectModel} onChange={(e)=>{setSelectModel(e.target.value)}} className="selectbox">
                        <option value="Gemini">Gemini 2.0 Flash</option>
                        <option value="GPT">GPT 4.1</option>
                    </select>
                    <button onClick={searchWeb} className="searchbtn">Search</button>
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
                 {textPrompt && textPrompt.length>0 ? <Send color = "#00796b" onClick={sendPromptToOpenApi} style={{width: "24px", height: "24px", marginLeft: "8px", marginRight: "8px"}}/> : <Send color = "gray" style={{width: "24px", height: "24px", marginLeft: "8px", marginRight: "8px"}}/>}
                </div>
              </div>
        </div>}
        
        </>
    )
}