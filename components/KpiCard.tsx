
import React from 'react';

interface KpiCardProps {
  title: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
  color: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, unit, icon, color }) => {
  return (
    <div className="bg-card-panel p-6 rounded-xl shadow-lg flex items-center transition-transform transform hover:scale-105">
      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div className="ml-5">
        <h3 className="text-text-secondary text-sm font-medium">{title}</h3>
        <p className="text-white text-3xl font-bold">
          {value} <span className="text-lg font-normal text-text-secondary">{unit}</span>
        </p>
      </div>
    </div>
  );
};

export default KpiCard;
