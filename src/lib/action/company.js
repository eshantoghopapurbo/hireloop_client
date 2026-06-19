"use server"

import { serverMutation } from "../core/server";

 export const createCompany =async (newCompanyData) =>{
    return serverMutation ("/api/companies",newCompanyData);
}


//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
//   const createCompany = async(newCompanyData) => {
//     const res =await fetch (`${baseUrl}/api/companies`,{
//         method:"POST",
//         headers:{
//             "Contend-Type" : "application/json",
//         },
//         body:JSON.stringify(newCompanyData)
//     });
//     return res.json
//   }