import { requireRole } from '@/lib/core/session';
import React from 'react';

const seekerLayoutPage = async({children}) => {
     await requireRole ("seeker")
    return children;
};

export default seekerLayoutPage;