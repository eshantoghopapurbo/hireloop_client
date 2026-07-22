import { DashboardSideber } from "@/components/dashboard/DashboardSideber";
import React from "react";

// import { DashboardSideber } from "@/components/dashboard/DashboardSideber";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-black w-full overflow-x-hidden">
      <DashboardSideber />
      <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden"> 
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;

// const DashboardLayout = ({ children }) => {
//   return (
//     <div className="flex min-h-screen bg-black">
//       <DashboardSideber />
//       {/* overflow-hidden সরিয়ে overflow-y-auto দিন যাতে কন্টেন্ট বেশি হলে স্ক্রল হয় */}
//       <main className="flex-1 min-w-0 overflow-y-auto h-screen"> 
//         {children}
//       </main>
//     </div>
//   );
// };