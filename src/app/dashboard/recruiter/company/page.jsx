import React from 'react';
import CompanyProfile from './CompanyProfile';
import { getRecruiterCompany } from '@/lib/api/companies';
import { getUserSession } from '@/lib/core/session';

const CompanyPage = async () => {
    const user = await getUserSession();
    const company = await getRecruiterCompany();
    return (
        <div>
            <CompanyProfile recruiter={user} recruiterCompany={company}></CompanyProfile>
        </div>
    );  
};

export default CompanyPage;