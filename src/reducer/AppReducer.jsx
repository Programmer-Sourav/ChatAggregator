

export const initialState = {
    chatText: [],
    responseText: []
}


export default function AppReducer(state, action){
   switch(action.type){
    case "TEXT": 
    return {...state, chatText: [state.chatText, action.payload]}
    case "RESPONSE":
    return {...state, responseText: [state.responseText, action.payload]}    
    default:
        return state;
   }

}