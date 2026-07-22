"use server"

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";


 export const createCompany =async (newCompanyData) =>{
    return serverMutation ("/api/my/companies",newCompanyData);
 }

 export const updateCompany = async (id,data)=> {
   const result = serverMutation (`/api/my/companies/${id}`,data,"PATCH")
    revalidatePath("/dashboard/admin/company")
    return result;
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