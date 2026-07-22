import { serverFetch } from "../core/server";

  
   export const getCompanies = async ()=>{
    return serverFetch("/api/companies")
   }
 
  export const getRecruiterCompany =async (recruiterId)=> {
    return serverFetch(`/api/my/companies?recruiterId =${recruiterId}`)  
  }