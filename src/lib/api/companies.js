import { serverFetch } from "../core/server";

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  export const getRecruiterCompany =async (recruiterID)=> {
    return serverFetch(`api/my/companies?recruiterID =${recruiterID}`)  
  }