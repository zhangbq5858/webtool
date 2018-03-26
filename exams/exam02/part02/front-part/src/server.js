export async function selectWord(url){

    try{ 
        const response = await fetch(url,{method: "POST",});
      //  console.log("select word", response);
        return response.ok ? response.json() : Promise.reject(response.statusText);
    }catch(e){
        return Promise.reject(e);
    }
}

export async function newGuess(url, matched){
    try{
        const response = await fetch(url,{
        method: "PUT",
        body: JSON.stringify({
          matched: matched,
        })
      });
      return response.ok ? response.json() : Promise.reject(response.statusText);
    }catch(e){
        return Promise.reject(e);
    }
}

export async function judgeGuess(url){
    try{
        const response = await fetch(url);
        return response.ok ? response.json() : Promise.reject(response.statusText);
    } 
    catch(e){
        return Promise.reject(e);
    }
}

export async function deleteData(url){
    try{
        const response = await fetch(url,{method:"DELETE",});
        return response;
    } 
    catch(e){
        return Promise.reject(e);
    }
}
