import { useContext, useState } from "react"
import "../medicalhelp.css"
import { analyzeInputText } from "../remote/remoteapis"
import { AppContext } from "../Context/AppContext"
import ReactMarkdown from 'react-markdown';

export default function MedicalHelp() {

    const [username, setUserName] = useState("")
    const [symptoms, setSymptoms] = useState("")
    const [duration, setDuration] = useState("")
    const [doctorsInput, setDoctorsInput] = useState("")
    const [convertedDuration, setConvertedDuration] = useState("")
    const [buttonClicked, setButtonClicked] = useState(false);
    const [ageInput, setAgeInput] = useState(0)

    const { state, dispatch } = useContext(AppContext);
    const medicalResponse = state.medicalChat;

    const handleDuration = (durationValue) => {
    setDuration(durationValue);

    switch (durationValue) {
      case "2":
        setConvertedDuration("About 3 days");
        break;
      case "4":
        setConvertedDuration("About 5 days");
        break;
      case "6":
        setConvertedDuration("About 7 days");
        break;
      case "9":
        setConvertedDuration("About 10 days");
        break;
      case "14":
        setConvertedDuration("About 15 days");
        break;
      case "26":
        setConvertedDuration("About 3 weeks");
        break;
      case "33":
        setConvertedDuration("About 4 weeks");
        break;
      case "40":
        setConvertedDuration("About 5 weeks");
        break;
      case "47":
        setConvertedDuration("About 6 weeks");
        break;
      case "55":
        setConvertedDuration("About 7 weeks");
        break;
      case "60":
        setConvertedDuration("About 8 weeks");
        break;
      case "68":
        setConvertedDuration("About 9 weeks");
        break;
      case "90":
        setConvertedDuration("About more than 12 weeks");
        break;
      case "110":
        setConvertedDuration("About more than 15 weeks");
        break;
      case "135":
        setConvertedDuration("About more than 18 weeks");
        break;
      case "160":
        setConvertedDuration("About more than 22 weeks");
        break;
      case "200":
        setConvertedDuration("About more than 6 months");
        break;
      case "300":
        setConvertedDuration("About more than 9 months");
        break;
      case "400":
        setConvertedDuration("About more than 12 months");
        break;
      case "700":
        setConvertedDuration("About more than or near 2 years");
        break;
      case "1000":
        setConvertedDuration("About more than or near 3 years");
        break;
      default:
        setConvertedDuration("");
    }
  };

    function submitDetails(){
      const queryData = {
              "username" : username,
              "symptoms" : symptoms,
              "duration" : convertedDuration, 
              "doctorsInput" : doctorsInput,
              "userage": ageInput
      }
      const constructedQuery = `User's name is ${queryData["username"]} of age ${queryData["userage"]}. ${queryData["username"]} has these symptoms ${queryData["symptoms"]} for last ${queryData["duration"]} and his visit or medical history with doctor mentioned as ${queryData["doctorsInput"]}. What could be the possible health issue user is facing and what stage it may be in?`
      setButtonClicked(buttonClicked=>!buttonClicked)
      analyzeInputText(dispatch, constructedQuery, true);  
    }

    return(
        <div className="containermh"> 
            <h1>Ask AI for Health</h1>
            <p><span><strong>Disclaimer:</strong> </span><span>This is not a diagnosis. It can be used simply as a guideline. Please visit Doctors and do tests for correct analysis of your health and long life!</span></p>

            <label> 
                Enter Your Name: 
                <input type="text" className="inputbox" value={username} onChange={(e)=>{setUserName(e.target.value)}}/>
            </label>
             <label> 
                Enter Symtomps: 
                <textarea rows={8} cols={24} className="inputbox" value={symptoms} onChange={(e)=>{setSymptoms(e.target.value)}}/>
            </label>
               <label> 
                Have You visited any Doctor or any medical history: 
                <input type="text" className="inputbox" value={doctorsInput} onChange={(e)=>{setDoctorsInput(e.target.value)}}/>
            </label>
             <label> 
                What is your Age: 
                <input type="text" className="inputbox" value={ageInput} onChange={(e)=>{setAgeInput(e.target.value)}}/>
            </label>
             <label> 
                How long you are having this problem?  
                <select value={duration}  className="inputbox" onChange={(e)=>{handleDuration(e.target.value)}}>
                     <option value="">Select duration</option>
                    <option value="2">Less than 3 days</option>
                    <option value="4">Less than 5 days</option>
                    <option value="6">Less than 7 days</option>
                    <option value="9">Less than 10 days</option>
                    <option value="14">Less than 15 days</option>
                    <option value="26">More than 3 weeks</option>
                    <option value="33">More than 4 weeks</option>
                    <option value="40">More than 5 weeks</option>
                    <option value="47">More than 6 weeks</option>
                    <option value="55">More than 7 weeks</option>
                    <option value="60">More than 8 weeks</option>
                    <option value="68">More than 9 weeks</option>
                    <option value="90">More than 12 weeks</option>
                    <option value="110">More than 15 weeks</option>
                    <option value="135">More than 18 weeks</option>
                    <option value="160">More than 22 weeks</option>
                    <option value="200">More than 6 months</option>
                    <option value="300">More than 9 months</option>
                    <option value="400">More than 12 months</option>
                    <option value="700">More than or near 2 years</option>
                    <option value="1000">More than or near 3 years</option>
                </select>
            </label>
            <button onClick={submitDetails} className="inputbox">Submit and ask AI</button>
            <div className="answersection01">
            {buttonClicked && !medicalResponse ? "Answer is getting Ready... Please wait..." :  <ReactMarkdown>
                {medicalResponse}
                </ReactMarkdown>}
            </div>
        </div>
    )
}