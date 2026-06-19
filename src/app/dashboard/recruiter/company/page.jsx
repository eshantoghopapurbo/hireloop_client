import React from 'react';
import CompanyProfile from './CompanyProfile';
import { getUserSession } from '@/lib/core/session';
import { getRecruiterCompany } from '@/lib/api/companies';

const CompanyPage =async () => {

   const user = getUserSession();
   const company =await getRecruiterCompany(user?.id)
   console.log("user session in companyPage",user);

    return (
        <div>
          <CompanyProfile recruiter={user} recruiterCompany={company}></CompanyProfile>  
        </div>
    );
};

export default CompanyPage;