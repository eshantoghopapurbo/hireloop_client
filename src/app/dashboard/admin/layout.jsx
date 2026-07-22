// import { requireRole } from '@/lib/core/session';
// import React from 'react';

// const adminLayoutPage = async({children}) => {
//      await requireRole ("admin")
//     return children;
// };

// export default adminLayoutPage;

import { requireRole } from '@/lib/core/session';
import React from 'react';

const AdminLayoutPage = async ({ children }) => {
    await requireRole("admin");
    return <>{children}</>;
};

export default AdminLayoutPage;