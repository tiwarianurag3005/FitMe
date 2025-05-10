import React, { createContext, useContext, useState } from 'react';

const WorkoutContext = createContext();

const initialWorkouts = [
  {
    name: 'Strength',
    workouts: [
      { id: 1, name: 'Upper Body', duration: 45, calories: 320, level: 'Intermediate', description: 'Focus on chest, shoulders, and arms', date: '', weight: '' },
      { id: 2, name: 'Lower Body', duration: 40, calories: 350, level: 'Intermediate', description: 'Squats, deadlifts, and leg press', date: '', weight: '' },
      { id: 3, name: 'Full Body', duration: 60, calories: 450, level: 'Advanced', description: 'Complete body workout', date: '', weight: '' },
    ]
  },
  {
    name: 'Cardio',
    workouts: [
      { id: 4, name: 'HIIT', duration: 30, calories: 400, level: 'Advanced', description: 'High-intensity interval training', date: '', weight: '' },
      { id: 5, name: 'Running', duration: 40, calories: 380, level: 'Intermediate', description: 'Outdoor running session', date: '', weight: '' },
      { id: 6, name: 'Cycling', duration: 45, calories: 350, level: 'Beginner', description: 'Indoor cycling workout', date: '', weight: '' },
    ]
  },
  {
    name: 'Flexibility',
    workouts: [
      { id: 7, name: 'Yoga', duration: 50, calories: 200, level: 'Beginner', description: 'Basic yoga flow', date: '', weight: '' },
      { id: 8, name: 'Stretching', duration: 30, calories: 150, level: 'Beginner', description: 'Full body stretching', date: '', weight: '' },
      { id: 9, name: 'Pilates', duration: 45, calories: 250, level: 'Intermediate', description: 'Core-focused pilates', date: '', weight: '' },
    ]
  }
];

export function WorkoutProvider({ children }) {
  const [workoutData, setWorkoutData] = useState(initialWorkouts);
  return (
    <WorkoutContext.Provider value={{ workoutData, setWorkoutData }}>
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkouts() {
  return useContext(WorkoutContext);
} 