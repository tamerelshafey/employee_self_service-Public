import React, { useState, useMemo } from 'react';
import type { OffboardingTask } from '../types';

const mockOffboardingTasks: OffboardingTask[] = [
    // Knowledge Transfer
    { id: 'OT01', text: 'Document all ongoing projects and their current status', completed: true, category: 'Knowledge Transfer' },
    { id: 'OT02', text: 'Transfer ownership of key documents and reports', completed: false, category: 'Knowledge Transfer' },
    { id: 'OT03', text: 'Conduct a knowledge handover session with your manager/team', completed: false, category: 'Knowledge Transfer' },

    // Asset Return
    { id: 'OT04', text: 'Return company laptop and accessories', completed: false, category: 'Asset Return' },
    { id: 'OT05', text: 'Return company mobile phone', completed: false, category: 'Asset Return' },
    { id: 'OT06', text: 'Return company ID badge and access cards', completed: false, category: 'Asset Return' },
    
    // Final Admin
    { id: 'OT07', text: 'Complete the exit interview with HR', completed: false, category: 'Final Admin' },
    { id: 'OT08', text: 'Review final paycheck details and confirm mailing address', completed: false, category: 'Final Admin' },
    { id: 'OT09', text: 'Understand post-employment benefits (COBRA, 401k, etc.)', completed: false, category: 'Final Admin' },
];

const Offboarding: React.FC = () => {
    const [tasks, setTasks] = useState<OffboardingTask[]>(mockOffboardingTasks);

    const handleToggleTask = (taskId: string) => {
        setTasks(tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    const completionPercentage = useMemo(() => {
        const completedTasks = tasks.filter(task => task.completed).length;
        if (tasks.length === 0) return 0;
        return Math.round((completedTasks / tasks.length) * 100);
    }, [tasks]);

    const taskCategories = useMemo(() => {
        return tasks.reduce((acc, task) => {
            (acc[task.category] = acc[task.category] || []).push(task);
            return acc;
        }, {} as Record<OffboardingTask['category'], OffboardingTask[]>);
    }, [tasks]);

    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold text-slate-900">Your Offboarding Process</h3>
                <p className="mt-2 text-slate-600">Please complete the following tasks to ensure a smooth transition. We wish you the best in your future endeavors.</p>
                <div className="mt-4">
                    <div className="flex justify-between mb-1">
                        <span className="text-base font-medium text-indigo-700">Completion Progress</span>
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
             <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 text-center">
                <p className="text-sm text-slate-600">If you have any questions during this process, please contact the HR department at <a href="mailto:hr@example.com" className="text-indigo-600 font-semibold hover:underline">hr@example.com</a>.</p>
            </div>
        </div>
    );
};

export default Offboarding;