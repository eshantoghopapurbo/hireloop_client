import { DashboardSideber } from "@/components/dashboard/DashboardSideber";
import React from "react";

const DashboardLayout = ({children}) => {
    return (
        <div className="flex min-h-screen bg-black">
            <DashboardSideber></DashboardSideber>
           <div className="flex-2">{children}</div> 
        </div>
    );
};

export default DashboardLayout;