import CompanyTable from '@/components/CompanyTable';
import { getCompanies } from '@/lib/api/companies';
import React from 'react';

const AdminCompanyPage = async () => {
    const companies = await getCompanies();

    return (
        <div className="p-6 bg-[#121212] min-h-screen text-white">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold text-white">
                    Companies for Review ({companies.length})
                </h1>
            </div>

            {/* Render Client Table Component */}
            <CompanyTable companies={companies} />
        </div>
    );
};

export default AdminCompanyPage;