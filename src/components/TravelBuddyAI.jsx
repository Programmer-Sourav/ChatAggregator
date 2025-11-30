import { useContext, useState } from "react"
import "../medicalhelp.css"
import { analyzeInputText } from "../remote/remoteapis"
import { AppContext } from "../Context/AppContext"
import ReactMarkdown from 'react-markdown';

export default function TravelBuddyAI() {

    const [username, setUserName] = useState("")
    const [symptoms, setSymptoms] = useState("")
    const [duration, setDuration] = useState("")
    const [doctorsInput, setDoctorsInput] = useState("")
    const [convertedDuration, setConvertedDuration] = useState("")
    const [buttonClicked, setButtonClicked] = useState(false);
    const [ageInput, setAgeInput] = useState(0)
    const [travelType, setTravelType] = useState("")
    const [tripType, setTripType] = useState("")
    const [convertedTripType, setConvertedTripType] = useState("")
    const [convertedTravelType, setConvertedTravelType] = useState("")
    const [vehicalType, setVehicalType] = useState("")

    const { state, dispatch } = useContext(AppContext);
    const travelAIResponse = state.travelChat;
  
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
      default:
        setConvertedDuration("");
    }
  };

  const handleTripType = (tripType) =>{
    setTripType(tripType)

    switch(tripType){
       case "1":
           setConvertedTripType("Solo Travel")
        case "2":
            setConvertedTripType("Couple Travel")
            case "6":
                setConvertedTripType("Family Travel assuming 6 people at max")
                case "501":
                    setConvertedTripType("Only with male buddies assuming 6 people at max")
                    case "502":
                       setConvertedTripType(" Only with Female Buddies assuming 4 to 6 people max")
                        case "5":
                            setConvertedTripType(" Only with Few Friends assuming 6 to 8 people max")
                             case "503":
                            setConvertedTripType(" Office or Professional Trip assuming single person meeting with office collegues or strangers")
                            default:
                                setConvertedTripType("Solo Travel")
    }
  };

  const handleTravelType = (travelType) =>{
    setTravelType(travelType)
      switch(travelType){
       case "2":
           setConvertedTravelType("Domestic Travel")
        case "3":
            setConvertedTravelType("International Travel")
            case "4":
                setConvertedTravelType("Going to Native Village")
                case "5":
                    setConvertedTravelType("Going to Native Town")
                    case "6":
                       setConvertedTravelType("Official Trip cum extended trip")
                         default:
                                setConvertedTravelType("Solo Travel")
                       
  }
}


    function submitDetails(){
      const queryData = {
              "username" : username,
              "placeOrPlanDetails" : symptoms,
              "duration" : convertedDuration, 
              "tripType" : tripType,
              "userage": ageInput,
               "travelType" : travelType,
               "vehicalType" : vehicalType,
               "medicalCondition": doctorsInput
      }
      const constructedQuery = `User's name is ${queryData["username"]} of age ${queryData["userage"]}. ${queryData["username"]} is going for a Travel. 
					Travel details include Type of the trip ${queryData["tripType"]}, Duration of the Travel ${queryData["duration"]},
                    Type of the travel ${queryData["travelType"]} and details of the travel  ${queryData["placeOrPlanDetails"]}  and type of the vehical ${queryData["vehicalType"]} user will be travelling by.
                    User may have faced these health conditions recently assuming in last 6 months or as active health condition ${queryData["medicalCondition"]}. 
                    Work as an assistant and help user planning primarily about what to pack or not pack. For example, if he has any health condition, 
                    remind him of taking an appointment with doctor in bullet points or advise him to take the prescription and medication with him. If he
                    is going through flight remind him about the weights allowed in flight. Help him calculate how many bags and how much weight he needs to carry. 
                    Help him by taking minimal amount of quantity like 2 dresses for a single day. If it is during winter season or cold place, advise him to take 
                    appropriate dresses. If it is a office work, advise him/her to take proper dress code along with a few casual dresses. You can also consider
                    prime attractions about the place user would be visiting. No need to show any itirinary or plans just advise user about the things he/she
                    should carry.`
      setButtonClicked(buttonClicked=>!buttonClicked)
      analyzeInputText(dispatch, constructedQuery, false, true);  
    }

    return(
        <div className="containermh"> 
            <h1>PackMyBag - Your own AI travel buddy</h1>
            <p><span><strong>Disclaimer:</strong> </span><span>This is simply a planning tool. Please use your own intelligence to plan better. </span></p>
            <div className="flex w-full m-4">
            <label className="w-[30%] text-black font-semibold p-4">
                  Enter Your Name:
            </label>
           <input
             type="text"
             className="w-1/2 border border-gray-500 border-solid p-4 rounded-lg"
             value={username}
             onChange={(e) => setUserName(e.target.value)}
           />
           </div>
             <div className="flex w-full m-4">
             <label className="w-[30%] text-black font-semibold p-4"> 
                Where are you going or some details about your plan like going to a hilly place or sea beach: </label>
                <textarea rows={4} cols={24} className="w-1/2 border border-gray-500 border-solid p-4 rounded-lg" value={symptoms} onChange={(e)=>{setSymptoms(e.target.value)}}/>
            </div>
            <div className="flex w-full m-4">
               <label className="w-[30%] text-black font-semibold p-4"> 
                Are you taking any medicine or any recent medical history: </label>
                <input type="text" className="w-1/2 border border-gray-500 border-solid p-4 rounded-lg" value={doctorsInput} onChange={(e)=>{setDoctorsInput(e.target.value)}}/>
            </div>
            <div className="flex w-full m-4">
             <label className="w-[30%] text-black font-semibold p-4"> 
                What is your Age:  </label>
                <input type="text" className="w-1/2 border border-gray-500 border-solid p-4 rounded-lg" value={ageInput} onChange={(e)=>{setAgeInput(e.target.value)}}/>
           </div>
           <div className="flex w-full m-4">
             <label className="w-[30%] text-black font-semibold p-4"> 
                How long is your travel plan?   </label>
                <select value={duration}  className="w-1/2 border border-gray-500 border-solid p-4 rounded-lg" onChange={(e)=>{handleDuration(e.target.value)}}>
                     <option value="">Select duration</option>
                     <option value="2">Weekend Gateway</option>
                    <option value="3">Less than 4 days</option>
                    <option value="6">Less than 7 days</option>
                    <option value="8">Less than 10 days</option>
                    <option value="14">Less than 15 days</option>
                    <option value="20">Less than 21 days</option>
                </select>
           </div>
            <div className="flex w-full m-4">
             <label className="w-[30%] text-black font-semibold p-4"> 
                What type of Trip it is?   </label>
                <select value={tripType}  className="w-1/2 border border-gray-500 border-solid p-4 rounded-lg" onChange={(e)=>{handleTripType(e.target.value)}}>
                     <option value="">Select Trip Type</option>
                    <option value="1">Solo Travel</option>
                    <option value="2">Couple Trip</option>
                    <option value="6">Family Trip</option>
                    <option value="501">Only with male buddies</option>
                    <option value="502">Only with Female Buddies</option>
                     <option value="5">Only with a few Friends</option>
                     <option value="503">Office Trip</option>
                </select>
           </div>
             <div className="flex w-full m-4">
             <label className="w-[30%] text-black font-semibold p-4"> 
                Type of Travel?   </label>
                <select value={travelType}  className="w-1/2 border border-gray-500 border-solid p-4 rounded-lg" onChange={(e)=>{handleTravelType(e.target.value)}}>
                     <option value="">Select Travel Type</option>
                    <option value="2">Domestic Travel</option>
                    <option value="3">International Travel</option>
                    <option value="4">Going to Native Village </option>
                    <option value="5">Going to Native Town</option>
                    <option value="6">Official Trip cum extended trip</option>
                </select>
           </div>
            <div className="flex w-full m-4">
             <label className="w-[30%] text-black font-semibold p-4"> 
                Travelling By?   </label>
                <select value={vehicalType}  className="w-1/2 border border-gray-500 border-solid p-4 rounded-lg" onChange={(e)=>{setVehicalType(e.target.value)}}>
                     <option value="">Select Vehical Type</option>
                    <option value="Flight">By Flight</option>
                    <option value="Train">By Train</option>
                    <option value="Bus">By Bus</option>
                    <option value="Public Transport">By Public Transport</option>
                    <option value="Office Transport">By Office Transport</option>
                </select>
           </div>
            <button onClick={submitDetails} className="bg-zinc-800 text-white">Submit and ask AI</button>
            <div className="answersection01">
            {buttonClicked && !travelAIResponse ? "Answer is getting Ready...It may take 30 secs to 2 mins... Please wait..." :  <ReactMarkdown>
                {travelAIResponse}
                </ReactMarkdown>}
            </div>
        </div>
    )
}