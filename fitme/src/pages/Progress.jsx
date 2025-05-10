import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Flame, Footprints, Clock, Weight, Settings, Save } from 'lucide-react';

const mockWeeklyData = {
  dates: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  calories: [250, 420, 0, 380, 500, 0, 320],
  steps: [6500, 8000, 7200, 9500, 10200, 5800, 8500],
  workoutTime: [30, 45, 0, 40, 60, 0, 35],
  weight: [75.5, 75.5, 75.3, 75.2, 75.0, 75.0, 74.8]
};

const Progress = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const [isEditingGoals, setIsEditingGoals] = useState(false);
  
  const [dailyGoals, setDailyGoals] = useState({
    calories: { current: 500, target: 1000 },
    steps: { current: 5834, target: 10000 },
    workoutTime: { current: 45, target: 60 },
    weight: { current: 74.8, target: 70 }
  });
  
  const [weeklyGoals, setWeeklyGoals] = useState({
    calories: { current: 1870, target: 6000 },
    steps: { current: 55200, target: 70000 },
    workoutTime: { current: 210, target: 300 },
    weight: { change: -0.7, target: -1 }
  });
  
  const calculatePercentage = (current, target) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  const handleSaveGoals = () => {
    setIsEditingGoals(false);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Progress</h1>
        <button
          onClick={() => setIsEditingGoals(!isEditingGoals)}
          className="wf-button-secondary flex items-center space-x-2"
        >
          {isEditingGoals ? (
            <>
              <Save className="h-4 w-4" />
              <span>Save Goals</span>
            </>
          ) : (
            <>
              <Settings className="h-4 w-4" />
              <span>Edit Goals</span>
            </>
          )}
        </button>
      </div>
      
      <div className="flex space-x-2 mb-6">
        <button 
          className={`px-4 py-2 rounded-md ${
            activeTab === 'daily' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-800'
          }`}
          onClick={() => setActiveTab('daily')}
        >
          Daily Goals
        </button>
        <button 
          className={`px-4 py-2 rounded-md ${
            activeTab === 'weekly' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-800'
          }`}
          onClick={() => setActiveTab('weekly')}
        >
          Weekly Goals
        </button>
      </div>
      
      {activeTab === 'daily' && (
        <div className="wf-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium">Daily Goals</h2>
            <div className="flex items-center space-x-1 bg-gray-100 rounded-md">
              <button className="p-1 text-gray-500 hover:text-gray-800">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2 px-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Today</span>
              </div>
              <button className="p-1 text-gray-500 hover:text-gray-800">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Flame className="h-5 w-5 text-orange-500 mr-2" />
                  <h3 className="text-gray-700">Calories Burned</h3>
                </div>
                {isEditingGoals && (
                  <input
                    type="number"
                    value={dailyGoals.calories.target}
                    onChange={(e) => setDailyGoals({
                      ...dailyGoals,
                      calories: { ...dailyGoals.calories, target: parseInt(e.target.value) }
                    })}
                    className="wf-input w-24 text-right"
                  />
                )}
              </div>
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-2xl">{dailyGoals.calories.current}</div>
                <div className="text-gray-500">/ {dailyGoals.calories.target}</div>
              </div>
              <div className="h-3 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-orange-500 rounded-full"
                  style={{ width: `${calculatePercentage(dailyGoals.calories.current, dailyGoals.calories.target)}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Footprints className="h-5 w-5 text-blue-500 mr-2" />
                  <h3 className="text-gray-700">Steps Taken</h3>
                </div>
                {isEditingGoals && (
                  <input
                    type="number"
                    value={dailyGoals.steps.target}
                    onChange={(e) => setDailyGoals({
                      ...dailyGoals,
                      steps: { ...dailyGoals.steps, target: parseInt(e.target.value) }
                    })}
                    className="wf-input w-24 text-right"
                  />
                )}
              </div>
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-2xl">{dailyGoals.steps.current}</div>
                <div className="text-gray-500">/ {dailyGoals.steps.target}</div>
              </div>
              <div className="h-3 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${calculatePercentage(dailyGoals.steps.current, dailyGoals.steps.target)}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-purple-500 mr-2" />
                  <h3 className="text-gray-700">Workout Time (min)</h3>
                </div>
                {isEditingGoals && (
                  <input
                    type="number"
                    value={dailyGoals.workoutTime.target}
                    onChange={(e) => setDailyGoals({
                      ...dailyGoals,
                      workoutTime: { ...dailyGoals.workoutTime, target: parseInt(e.target.value) }
                    })}
                    className="wf-input w-24 text-right"
                  />
                )}
              </div>
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-2xl">{dailyGoals.workoutTime.current}</div>
                <div className="text-gray-500">/ {dailyGoals.workoutTime.target}</div>
              </div>
              <div className="h-3 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: `${calculatePercentage(dailyGoals.workoutTime.current, dailyGoals.workoutTime.target)}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Weight className="h-5 w-5 text-emerald-500 mr-2" />
                  <h3 className="text-gray-700">Weight (kg)</h3>
                </div>
                {isEditingGoals && (
                  <input
                    type="number"
                    value={dailyGoals.weight.target}
                    onChange={(e) => setDailyGoals({
                      ...dailyGoals,
                      weight: { ...dailyGoals.weight, target: parseInt(e.target.value) }
                    })}
                    className="wf-input w-24 text-right"
                  />
                )}
              </div>
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-2xl">{dailyGoals.weight.current}</div>
                <div className="text-gray-500">Target: {dailyGoals.weight.target}</div>
              </div>
              <div className="h-3 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${Math.min(100, 100 - ((dailyGoals.weight.current - dailyGoals.weight.target) / dailyGoals.weight.target) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'weekly' && (
        <div className="wf-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium">Weekly Goals</h2>
            <div className="flex items-center space-x-1 bg-gray-100 rounded-md">
              <button className="p-1 text-gray-500 hover:text-gray-800">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2 px-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">This Week</span>
              </div>
              <button className="p-1 text-gray-500 hover:text-gray-800">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Flame className="h-5 w-5 text-orange-500 mr-2" />
                  <h3 className="text-gray-700">Calories Burned</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-sm">
                    <span className="font-medium">{weeklyGoals.calories.current}</span>
                    <span className="text-gray-500"> / </span>
                    {isEditingGoals ? (
                      <input
                        type="number"
                        value={weeklyGoals.calories.target}
                        onChange={(e) => setWeeklyGoals({
                          ...weeklyGoals,
                          calories: { ...weeklyGoals.calories, target: parseInt(e.target.value) }
                        })}
                        className="wf-input w-24 text-right"
                      />
                    ) : (
                      <span className="text-gray-500">{weeklyGoals.calories.target}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="h-40 flex items-end space-x-2">
                {mockWeeklyData.dates.map((date, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex-1 flex items-end">
                      <div 
                        className="w-full bg-orange-500 rounded-t-sm"
                        style={{ 
                          height: `${mockWeeklyData.calories[index] / 5.5}%`,
                          opacity: mockWeeklyData.calories[index] > 0 ? 1 : 0.3
                        }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{date}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Footprints className="h-5 w-5 text-blue-500 mr-2" />
                  <h3 className="text-gray-700">Steps Taken</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-sm">
                    <span className="font-medium">{weeklyGoals.steps.current}</span>
                    <span className="text-gray-500"> / </span>
                    {isEditingGoals ? (
                      <input
                        type="number"
                        value={weeklyGoals.steps.target}
                        onChange={(e) => setWeeklyGoals({
                          ...weeklyGoals,
                          steps: { ...weeklyGoals.steps, target: parseInt(e.target.value) }
                        })}
                        className="wf-input w-24 text-right"
                      />
                    ) : (
                      <span className="text-gray-500">{weeklyGoals.steps.target}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="h-40 flex items-end space-x-2">
                {mockWeeklyData.dates.map((date, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex-1 flex items-end">
                      <div 
                        className="w-full bg-blue-500 rounded-t-sm"
                        style={{ 
                          height: `${(mockWeeklyData.steps[index] / 15000) * 100}%`,
                          opacity: mockWeeklyData.steps[index] > 0 ? 1 : 0.3
                        }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{date}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-purple-500 mr-2" />
                  <h3 className="text-gray-700">Workout Time (minutes)</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-sm">
                    <span className="font-medium">{weeklyGoals.workoutTime.current}</span>
                    <span className="text-gray-500"> / </span>
                    {isEditingGoals ? (
                      <input
                        type="number"
                        value={weeklyGoals.workoutTime.target}
                        onChange={(e) => setWeeklyGoals({
                          ...weeklyGoals,
                          workoutTime: { ...weeklyGoals.workoutTime, target: parseInt(e.target.value) }
                        })}
                        className="wf-input w-24 text-right"
                      />
                    ) : (
                      <span className="text-gray-500">{weeklyGoals.workoutTime.target}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="h-40 flex items-end space-x-2">
                {mockWeeklyData.dates.map((date, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex-1 flex items-end">
                      <div 
                        className="w-full bg-purple-500 rounded-t-sm"
                        style={{ 
                          height: `${(mockWeeklyData.workoutTime[index] / 70) * 100}%`,
                          opacity: mockWeeklyData.workoutTime[index] > 0 ? 1 : 0.3
                        }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Progress;