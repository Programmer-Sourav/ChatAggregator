import { GoogleGenAI  } from "@google/genai";
import fs from "fs";
import path from "path";
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: apiKey});


export async function sendPromptWithFile(dispatch, dataBody){
 
    const filePath = dataBody.file;

    const response = await fetch(filePath);
    const blob = await response.blob();
    const reader = new FileReader();
    reader.onload = async function () {
    const base64String = reader.result.split(",")[1]; // remove data prefix
    

    const filePart = {
        inlineData: {
          data: base64String,
          mimeType: "image/png",
        },
      };

        const response = await ai.models.generateContent({
          model: 'gemini-2.0-flash-001',
          contents: [
            {
              role: "user",
              parts: [
                { text: dataBody.text },
                filePart,
              ],
            },
          ],
        });
       
        const receivedData = response;
        const receivedContent = receivedData.candidates[0];
        const receivedParts = receivedContent.content.parts;
        const receivedText = receivedParts[0];
        dispatch({type: "RESPONSE", payload: receivedText})
    }
    reader.readAsDataURL(blob);
}

export async function sendPromptToGeminiApi(dispatch, dataBody){
    
   try{
     const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, 
        {
            method: 'POST',
             headers: {
                'Content-Type': 'application/json', // Set content type
                //'Authorization': 'Bearer your_token_here', // optional auth //for own server verification
              },
              body: JSON.stringify({
               "contents": [{
               "parts":[{"text": dataBody}]
                }]
              })
        }
     )
     const receivedData = await response.json();
     const receivedContent = receivedData.candidates[0];
     const receivedParts = receivedContent.content.parts;
     console.log(88877, receivedParts)
     const receivedText = receivedParts[0];
     dispatch({type: "RESPONSE", payload: receivedText})

   }
   catch(error){
       throw error;
   }
}

async function sendPromptToGPTApi(){
    try{
        const response = await fetch()
      }
      catch(error){
      throw error;
      }
}