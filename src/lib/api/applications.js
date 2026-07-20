import { serverFetch } from "../core/server"

export const getApplicantionsByApplicant =async (applicantId)=>{
    return serverFetch  (`/api/applications?applicantId = ${applicantId}`)
}