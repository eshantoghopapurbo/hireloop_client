

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

 
// export const serverFetch =async (path) =>{
//     const res =await fetch (`${baseUrl}${path}`)
//         return res.json();
// }

  export const serverMutation = async(path ,data) => {
    const res =await fetch (`${baseUrl}${path}`,{
        method:"POST",
        headers:{
            "Contend-Type" : "application/json",
        },
        body:JSON.stringify(data)
    });
    //handle 401,402,403
    return res.json()
  }