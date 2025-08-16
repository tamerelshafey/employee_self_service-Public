import React, { useState, useMemo } from 'react';
import type { OnboardingTask } from '../types';

const mockOnboardingTasks: OnboardingTask[] = [
    // Before You Start
    { id: 'T01', text: 'Complete your new hire paperwork in Workday', completed: true, category: 'Before You Start' },
    { id: 'T02', text: 'Set up your direct deposit information', completed: true, category: 'Before You Start' },
    { id: 'T03', text: 'Review the Employee Handbook', completed: false, category: 'Before You Start' },

    // Your First Week
    { id: 'T04', text: 'Set up your company email and Slack account', completed: true, category: 'Your First Week' },
    { id: 'T05', text: 'Meet with your manager to discuss your 30-60-90 day plan', completed: true, category: 'Your First Week' },
    { id: 'T06', text: 'Schedule introductory meetings with your team members', completed: false, category: 'Your First Week' },
    { id: 'T07', text: 'Complete mandatory security awareness training', completed: false, category: 'Your First Week' },
    
    // First 30 Days
    { id: 'T08', text: 'Enroll in company benefits (Health, Dental, Vision)', completed: false, category: 'First 30 Days' },
    { id: 'T09', text: 'Explore the internal documentation on Confluence', completed: false, category: 'First 30 Days' },
    { id: 'T10', text: 'Contribute your first piece of code or project deliverable', completed: false, category: 'First 30 Days' },
    { id: 'T11', text: 'Attend your first team-wide meeting', completed: false, category: 'First 30 Days' },
];

const Onboarding: React.FC = () => {
    const [tasks, setTasks] = useState<OnboardingTask[]>(mockOnboardingTasks);

    const handleToggleTask = (taskId: string) => {
        setTasks(tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    const completionPercentage = useMemo(() => {
        const completedTasks = tasks.filter(task => task.completed).length;
        return Math.round((completedTasks / tasks.length) * 100);
    }, [tasks]);

    const taskCategories = useMemo(() => {
        return tasks.reduce((acc, task) => {
            (acc[task.category] = acc[task.category] || []).push(task);
            return acc;
        }, {} as Record<OnboardingTask['category'], OnboardingTask[]>);
    }, [tasks]);

    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold text-slate-900">Your Onboarding Journey</h3>
                <p className="mt-2 text-slate-600">Welcome to the team! Here are your first steps to get you settled in.</p>
                <div className="mt-4">
                    <div className="flex justify-between mb-1">
                        <span className="text-base font-medium text-indigo-700">Overall Progress</span>
                        <span className="text-sm font-medium text-indigo-700">{completionPercentage}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                        <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${completionPercentage}%` }}></div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {Object.entries(taskCategories).map(([category, tasksInCategory]) => (
                    <div key={category} className="bg-white p-6 rounded-xl shadow-md">
                        <h4 className="text-xl font-bold text-slate-800 mb-4">{category}</h4>
                        <ul className="space-y-3">
                            {tasksInCategory.map(task => (
                                <li key={task.id} className="flex items-center">
                                    <input
                                        id={`task-${task.id}`}
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => handleToggleTask(task.id)}
                                        className="h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                    />
                                    <label
                                        htmlFor={`task-${task.id}`}
                                        className={`ml-3 block text-sm font-medium text-slate-700 cursor-pointer ${task.completed ? 'line-through text-slate-500' : ''}`}
                                    >
                                        {task.text}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Onboarding;