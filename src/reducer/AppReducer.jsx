

export const initialState = {
    //array should be in qa format
    //[{question:"", answer:""}]
    chatText: [{question:" ", answer:" "}],
    filePath: "",
    chatPrompt: "",
    selectedModel: ""
}


export default function AppReducer(state, action){
   switch(action.type){
    case "TEXT": 
    return {...state, chatText: [...state.chatText, {question: action.payload, answer: "loading"}]}
    case "RESPONSE":
        const foundItem = state.chatText.find((item) => item.answer === "loading");
        if (!foundItem) return state; // Optional safety check
      
        return {
          ...state,
          chatText: [
            ...state.chatText.filter((item) => item !== foundItem),
            { ...foundItem, answer: action.payload }
          ]
        };
     case "FILEPATH": 
     return {...state, filePath: action.payload}   
     case "CHATTEXT":
     return {...state, chatPrompt: action.payload}   
     case "SELECTED_LLM": 
     return {...state, selectedModel: action.payload}
    }
}