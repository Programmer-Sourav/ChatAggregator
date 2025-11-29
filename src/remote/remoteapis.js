import { GoogleGenAI  } from "@google/genai";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const openAIKey = import.meta.env.VITE_OPENAI_API_KEY;

const ai = new GoogleGenAI({apiKey: apiKey});

const client = new OpenAI({apiKey: openAIKey, dangerouslyAllowBrowser: true});






export async function analyzeInputText(dispatch, dataBody, ifMedQuery, ifTravelBuddy){
const response = await client.responses.create({
    model: "gpt-4.1",
    input: dataBody
});

//console.log(1112, dataBody, response.output_text);
const receivedText = response.output_text;
if(!ifMedQuery || !ifTravelBuddy)
dispatch({type: "RESPONSE", payload: receivedText})

else if (ifTravelBuddy)
dispatch({type: "TRAVELTEXT", payload: receivedText})

else 
dispatch({type: "MEDICALTEXT", payload: receivedText})  
}



export async function analyzeImageInputs(dispatch, data){
 const secureUrl = await uploadToCloudinary(data.file)
 if(secureUrl){
  const response = await client.responses.create({
    model: "gpt-4.1",
    input: [
        { role: "user", content: data.text },
        {
            role: "user",
            content: [
                {
                    type: "input_image", 
                    image_url: secureUrl,
                }
            ],
        },
    ],
});
console.log(5555, response.output_text, data);
const receivedText = response.output_text;
dispatch({type: "RESPONSE", payload: receivedText})
}
}

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
        const receivedText = receivedParts[0].text;
        console.log(1245, receivedText);
        dispatch({type: "RESPONSE", payload: receivedText})
    }
    reader.readAsDataURL(blob);
}

export async function sendPromptToGeminiApi(dispatch, dataBody){
    
   // eslint-disable-next-line no-useless-catch
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
     const receivedText = receivedParts[0].text;
     console.log(1245, receivedText);
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


async function uploadToCloudinary(blob) {
  console.log(8888, blob)
  const formData = new FormData();
  formData.append("file", blob);
  formData.append("upload_preset", "imgupload"); // Configure in Cloudinary dashboard

  const res = await fetch('https://api.cloudinary.com/v1_1/dalql4nhr/image/upload', {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  return data.secure_url; // This is the public URL you can now use
}

export async function searchWebByOpenAI(dispatch, dataBody){
  const response = await client.responses.create({
    model: "gpt-4.1",
    tools: [ { type: "web_search_preview" } ],
    input: dataBody,
});

const receivedText = response.output_text;
dispatch({type: "RESPONSE", payload: receivedText})
}
