import React from 'react';
import { Card, CardContent } from '@heroui/react';

const StatCard = ({ title, value, icon: Icon }) => {
  return (
    <Card className="bg-[#18181b] border border-neutral-800 text-white w-full shadow-md">
      <CardContent className="p-6 flex flex-col justify-between gap-4">
        {/* Icon Container */}
        <div className="bg-neutral-800 text-neutral-300 w-10 h-10 rounded-lg flex items-center justify-center">
          {Icon && <Icon className="w-5 h-5" />}
        </div>

        {/* Text Content */}
        <div className="space-y-1">
          <p className="text-sm font-medium text-neutral-400">{title}</p>
          <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;