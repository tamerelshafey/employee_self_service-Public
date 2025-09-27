

import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { OnboardingTask } from '../types';

interface OnboardingProps {
    tasks: OnboardingTask[];
}

const Onboarding: React.FC<OnboardingProps> = ({ tasks: initialTasks }) => {
    const { t } = useTranslation();
    const [tasks, setTasks] = useState<OnboardingTask[]>(initialTasks);

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
        const categories: Record<string, OnboardingTask[]> = {};
        for (const task of tasks) {
            if (!categories[task.category]) {
                categories[task.category] = [];
            }
            categories[task.category].push(task);
        }
        return categories;
    }, [tasks]);

    return (
        <div className="space-y-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{t('onboarding.title')}</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-400">{t('onboarding.subtitle')}</p>
                <div className="mt-4">
                    <div className="flex justify-between mb-1">
                        <span className="text-base font-medium text-indigo-700 dark:text-indigo-400">{t('onboarding.progress')}</span>
                        <span className="text-sm font-medium text-indigo-700 dark:text-indigo-400">{completionPercentage}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                        <div className="bg-indigo-600 dark:bg-indigo-500 h-2.5 rounded-full" style={{ width: `${completionPercentage}%` }}></div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {Object.keys(taskCategories).map((category) => (
                    <div key={category} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
                        <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">{category}</h4>
                        <ul className="space-y-3">
                            {taskCategories[category].map(task => (
                                <li key={task.id} className="flex items-center">
                                    <input
                                        id={`task-${task.id}`}
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => handleToggleTask(task.id)}
                                        className="h-5 w-5 rounded border-slate-300 dark:border-slate-600 text-indigo-600 dark:text-indigo-500 focus:ring-indigo-500 cursor-pointer bg-transparent dark:bg-slate-700"
                                    />
                                    <label
                                        htmlFor={`task-${task.id}`}
                                        className={`ms-3 block text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer ${task.completed ? 'line-through text-slate-500' : ''}`}
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