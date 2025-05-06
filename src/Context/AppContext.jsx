import { createContext, useReducer } from "react";
import AppReducer, { initialState } from "../reducer/AppReducer";

export const AppContext = createContext();


export default function AppProvider({children}){

    const [state, dispatch] = useReducer(AppReducer, initialState)

    return  <AppContext.Provider value={{ state, dispatch }}>
    {children}
  </AppContext.Provider>
}