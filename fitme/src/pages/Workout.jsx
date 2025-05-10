import { useState } from 'react';
import { Calendar, Clock, Flame, Plus, PlayCircle, Edit2, X, Save, Trash2 } from 'lucide-react';
import { useWorkouts } from '../context/WorkoutContext';

const workoutCategories = [
  {
    name: 'Strength',
    workouts: [
      { id: 1, name: 'Upper Body', duration: 45, calories: 320, level: 'Intermediate', description: 'Focus on chest, shoulders, and arms' },
      { id: 2, name: 'Lower Body', duration: 40, calories: 350, level: 'Intermediate', description: 'Squats, deadlifts, and leg press' },
      { id: 3, name: 'Full Body', duration: 60, calories: 450, level: 'Advanced', description: 'Complete body workout' },
    ]
  },
  {
    name: 'Cardio',
    workouts: [
      { id: 4, name: 'HIIT', duration: 30, calories: 400, level: 'Advanced', description: 'High-intensity interval training' },
      { id: 5, name: 'Running', duration: 40, calories: 380, level: 'Intermediate', description: 'Outdoor running session' },
      { id: 6, name: 'Cycling', duration: 45, calories: 350, level: 'Beginner', description: 'Indoor cycling workout' },
    ]
  },
  {
    name: 'Flexibility',
    workouts: [
      { id: 7, name: 'Yoga', duration: 50, calories: 200, level: 'Beginner', description: 'Basic yoga flow' },
      { id: 8, name: 'Stretching', duration: 30, calories: 150, level: 'Beginner', description: 'Full body stretching' },
      { id: 9, name: 'Pilates', duration: 45, calories: 250, level: 'Intermediate', description: 'Core-focused pilates' },
    ]
  }
];

const Workout = () => {
  const { workoutData, setWorkoutData } = useWorkouts();
  const [selectedCategory, setSelectedCategory] = useState('Strength');
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    duration: 0,
    calories: 0,
    level: 'Beginner',
    description: '',
    category: 'Strength',
    date: '',
    weight: ''
  });
  
  const handleEdit = (workout) => {
    setEditingWorkout(workout.id);
    setEditForm({
      name: workout.name,
      duration: workout.duration,
      calories: workout.calories,
      level: workout.level,
      description: workout.description,
      category: selectedCategory,
      date: workout.date || '',
      weight: workout.weight || ''
    });
  };
  
  const handleSave = (workoutId) => {
    setWorkoutData(workoutData.map(category => ({
      ...category,
      workouts: category.workouts.map(workout => 
        workout.id === workoutId 
          ? { ...workout, ...editForm }
          : workout
      )
    })));
    setEditingWorkout(null);
  };

  const handleCreateWorkout = () => {
    const newWorkout = {
      id: Math.max(...workoutData.flatMap(c => c.workouts.map(w => w.id))) + 1,
      name: editForm.name,
      duration: editForm.duration,
      calories: editForm.calories,
      level: editForm.level,
      description: editForm.description,
      date: editForm.date,
      weight: editForm.weight
    };

    setWorkoutData(workoutData.map(category => {
      if (category.name === editForm.category) {
        return {
          ...category,
          workouts: [...category.workouts, newWorkout]
        };
      }
      return category;
    }));

    setIsCreating(false);
    setSelectedCategory(editForm.category);
    setEditForm({
      name: '',
      duration: 0,
      calories: 0,
      level: 'Beginner',
      description: '',
      category: 'Strength',
      date: '',
      weight: ''
    });
  };

  const handleDelete = (workoutId) => {
    setWorkoutData(workoutData.map(category => ({
      ...category,
      workouts: category.workouts.filter(workout => workout.id !== workoutId)
    })));
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Workouts</h1>
        <button 
          onClick={() => setIsCreating(true)}
          className="flex items-center space-x-2 wf-button-primary"
        >
          <Plus className="h-4 w-4" />
          <span>Create Custom Workout</span>
        </button>
      </div>
      
      <div className="flex overflow-x-auto space-x-2 mb-8 pb-2">
        {workoutData.map((category) => (
          <button
            key={category.name}
            className={`px-4 py-2 rounded-md whitespace-nowrap transition-colors ${
              selectedCategory === category.name
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
            onClick={() => setSelectedCategory(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create Custom Workout</h2>
              <button 
                onClick={() => setIsCreating(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={editForm.category}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  className="wf-input"
                >
                  {workoutData.map(category => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Workout Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="wf-input"
                  placeholder="e.g., Morning Yoga"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (min)
                  </label>
                  <input
                    type="number"
                    value={editForm.duration}
                    onChange={(e) => setEditForm({ ...editForm, duration: parseInt(e.target.value) })}
                    className="wf-input"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Calories
                  </label>
                  <input
                    type="number"
                    value={editForm.calories}
                    onChange={(e) => setEditForm({ ...editForm, calories: parseInt(e.target.value) })}
                    className="wf-input"
                    min="0"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Level
                </label>
                <select
                  value={editForm.level}
                  onChange={(e) => setEditForm({ ...editForm, level: e.target.value })}
                  className="wf-input"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="wf-input"
                  rows={3}
                  placeholder="Describe the workout..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={editForm.date}
                  onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                  className="wf-input"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={editForm.weight}
                  onChange={(e) => setEditForm({ ...editForm, weight: e.target.value })}
                  className="wf-input"
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  onClick={() => setIsCreating(false)}
                  className="wf-button-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateWorkout}
                  className="wf-button-primary"
                  disabled={!editForm.name || !editForm.duration}
                >
                  Create Workout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workoutData
          .find(category => category.name === selectedCategory)
          ?.workouts.map((workout) => (
            <div key={workout.id} className="wf-card group">
              {editingWorkout === workout.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="wf-input"
                    placeholder="Workout name"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Duration (min)</label>
                      <input
                        type="number"
                        value={editForm.duration}
                        onChange={(e) => setEditForm({ ...editForm, duration: parseInt(e.target.value) })}
                        className="wf-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Calories</label>
                      <input
                        type="number"
                        value={editForm.calories}
                        onChange={(e) => setEditForm({ ...editForm, calories: parseInt(e.target.value) })}
                        className="wf-input"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Level</label>
                    <select
                      value={editForm.level}
                      onChange={(e) => setEditForm({ ...editForm, level: e.target.value })}
                      className="wf-input"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Description</label>
                    <textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      className="wf-input"
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setEditingWorkout(null)}
                      className="wf-button-secondary"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleSave(workout.id)}
                      className="wf-button-primary"
                    >
                      <Save className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="relative">
                    <div className={`h-40 w-full rounded-md bg-gradient-to-r ${
                      selectedCategory === 'Strength' ? 'from-red-500 to-red-700' :
                      selectedCategory === 'Cardio' ? 'from-blue-500 to-blue-700' :
                      'from-purple-500 to-purple-700'
                    } mb-4 flex items-center justify-center`}>
                      <span className="text-white text-xl font-bold">{workout.name}</span>
                    </div>
                    
                    <div className="absolute inset-0 bg-black bg-opacity-0 opacity-0 group-hover:bg-opacity-50 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 rounded-md">
                      <button className="px-4 py-2 bg-white rounded-full flex items-center space-x-2 text-emerald-600 transform scale-95 group-hover:scale-100 transition-transform duration-300">
                        <PlayCircle className="h-5 w-5" />
                        <span className="font-medium">Start Workout</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium">{workout.name}</h3>
                    <button
                      onClick={() => handleEdit(workout)}
                      className="text-gray-500 hover:text-emerald-600 transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">{workout.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{workout.duration} minutes</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Flame className="h-4 w-4 mr-2" />
                      <span>{workout.calories} calories</span>
                    </div>
                    
                    <div className="mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        workout.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                        workout.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {workout.level}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleDelete(workout.id)}
                    className="text-gray-500 hover:text-red-600 transition-colors ml-2"
                    title="Delete Workout"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>
          ))}
      </div>
      
      <div className="mt-12">
        <h2 className="text-xl font-medium mb-4">Scheduled Workouts</h2>
        <div className="wf-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <h3 className="text-lg font-medium">This Week</h3>
            </div>
            <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <div className="font-medium">Upper Body</div>
                <div className="text-sm text-gray-600">Today, 6:00 PM</div>
              </div>
              <button className="wf-button-primary text-sm py-1">
                Start
              </button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <div className="font-medium">Running</div>
                <div className="text-sm text-gray-600">Tomorrow, 7:30 AM</div>
              </div>
              <button className="wf-button-secondary text-sm py-1">
                Reschedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workout;