import { ReactNode } from 'react';
import { Clock } from 'lucide-react';

const GoalCard = ({ title, stats }) => {
  return (
    <div className="wf-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-800">{title}</h2>
        <Clock className="h-5 w-5 text-gray-400" />
      </div>
      
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index}>
            <div className="flex items-center mb-1">
              {stat.icon && <span className="mr-2">{stat.icon}</span>}
              <span className="text-sm text-gray-600">{stat.label}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{stat.value}{stat.unit && ` ${stat.unit}`}</span>
              <span className="text-gray-500">/ {stat.target}{stat.unit && ` ${stat.unit}`}</span>
            </div>
            <div className="mt-1 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full" 
                style={{ width: `${(Number(stat.value) / Number(stat.target)) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalCard;