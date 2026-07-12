"use server"

import { serverMutation } from "../core/server";


 export const createCompany =async (newCompanyData) =>{
    return serverMutation ("/api/my/companies",newCompanyData);
 }


//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
// export const createCompany = async (newCompanyData) => {
//     const res = await fetch(`${baseUrl}/api/my/companies`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newCompanyData),
//     });
//     if (!res.ok) {
//         const errorText = await res.text(); 
//         console.error("Server Error Response:", errorText);
//         throw new Error(`Server responded with ${res.status}`);
//     }
//     return res.json();
// };