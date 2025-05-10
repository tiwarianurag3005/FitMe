import { ReactNode } from 'react';

const StatCard = ({ title, value, max, icon, color = 'emerald' }) => {
  const progressPercentage = max ? (Number(value) / Number(max)) * 100 : 100;
  
  return (
    <div className="wf-card">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-700 font-medium">{title}</h3>
        {icon && <div className={`text-${color}-500`}>{icon}</div>}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold">{value}</div>
        {max && <div className="text-gray-500">/ {max}</div>}
      </div>
      
      {max && (
        <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-${color}-500 rounded-full`} 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default StatCard;