
export async function sendPromptToGeminiApi(dispatch, dataBody){
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    console.log(333, apiKey, dataBody);
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
     console.log(444, receivedData)
     const receivedContent = receivedData.candidates[0];
     const receivedParts = receivedContent.content.parts;
     const receivedText = receivedParts[0];
     console.log(123, receivedContent)
     console.log(121, receivedText)
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