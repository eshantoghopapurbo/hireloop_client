import React from 'react';
import { Card } from "@heroui/react";

const DashboardStats = ({ statsData = [] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-black rounded-xl">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <Card 
            key={index} 
            className="bg-[#18181b] border border-neutral-800 text-white w-full shadow-md p-6 flex flex-col justify-between gap-4"
          >
            {/* Icon Container */}
            <div className="bg-neutral-800 text-neutral-300 w-10 h-10 rounded-lg  flex items-center justify-center">
              {Icon && <Icon className="w-5 h-5" />}
            </div>

            {/* Content Section using HeroUI v3 Anatomy */}
            <Card.Header className="p-0 flex flex-col items-start space-y-1  ">
              <Card.Description className="text-sm font-medium text-neutral-400 p-0 mb-4">
                {stat.title}
              </Card.Description>
              <Card.Title className="text-3xl font-bold tracking-tight text-white p-0 m-0">
                {stat.value}
              </Card.Title>
            </Card.Header>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;