
// get req
export const getRequest = async(url:string,id:string | null,{rejectWithValue}:any)=>{
    if(!url) throw new Error("Provide a correct url")
try {

    const resultUrl = id ? `${url}/${id}` : `${url}`
    console.log("url:",resultUrl)
    const res = await fetch(resultUrl,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"include"
    });
    if (res.status === 401) {
        // Redirect if unauthorized
        return rejectWithValue({message:"Unauthorized. Redirecting to login."});
      }
    if(!res.ok){
       const errorData = res.statusText;
      return rejectWithValue(errorData);
    }
 
        return res.json();
} catch (error:any) {
    const errorData = error.message;
    return rejectWithValue(errorData)
}
}


// post req for the simple formdata req

export const postRequest = async(url:string,formData:FormData,{rejectWithValue}:any)=>{
if(!url || !formData) return rejectWithValue("Provide valid url/formData")
    try{
const res = await fetch(`${url}`,{
    method:'POST',
    headers:{
        "Content-Type":"application/json"
    },
    credentials:"include",
    body:JSON.stringify(formData)
});

if (res.status === 401) {

    return rejectWithValue({message:"Unauthorized. Redirecting to login"})
  }

if(!res.ok){
    const errorData = await res.json();
    return rejectWithValue(errorData)
}

// send data in res
    return res.json();
    }catch(error:any){
    return rejectWithValue(error.message)
}
}
export const putRequest = async(url:string,{rejectWithValue}:any)=>{
if(!url) return rejectWithValue("Provide valid url")
    try{
const res = await fetch(`${url}`,{
    method:'PUT',
    headers:{
        "Content-Type":"application/json"
    },
    credentials:"include",
});

if (res.status === 401) {
    return rejectWithValue({message:"Unauthorized. Redirecting to login"})
  }

if(!res.ok){
    const errorData = await res.json();
    return rejectWithValue(errorData)
}
// send data in res
    return res.json();
    }catch(error:any){
    return rejectWithValue(error.message)
}
}