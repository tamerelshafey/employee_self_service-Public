
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { Employee, Task } from '../types';
import { TaskStatus, TaskPriority } from '../types';
import { ArrowLeftIcon, FilterIcon, PlusIcon, RefreshCwIcon, ChevronDownIcon } from './Icons';

interface TasksProps {
    tasks: Task[];
    allEmployees: Employee[];
    setActivePage: (page: string) => void;
}

const TaskCard: React.FC<{ task: Task, creator?: Employee }> = ({ task, creator }) => {
    const { t } = useTranslation();

    const statusColors: Record<TaskStatus, { bg: string, text: string, dot: string }> = {
        [TaskStatus.Open]: { bg: 'bg-blue-600', text: 'text-white', dot: 'bg-white' },
        [TaskStatus.InProgress]: { bg: 'bg-yellow-500', text: 'text-white', dot: 'bg-white' },
        [TaskStatus.Completed]: { bg: 'bg-blue-600', text: 'text-white', dot: 'bg-white' },
        [TaskStatus.Cancelled]: { bg: 'bg-blue-600', text: 'text-white', dot: 'bg-white' },
    };

    const priorityColors: Record<TaskPriority, { bg: string, text: string, dot: string }> = {
        [TaskPriority.Low]: { bg: 'bg-green-100 dark:bg-green-900/50', text: 'text-green-700 dark:text-green-300', dot: 'bg-green-500' },
        [TaskPriority.Medium]: { bg: 'bg-orange-100 dark:bg-orange-900/50', text: 'text-orange-700 dark:text-orange-300', dot: 'bg-orange-500' },
        [TaskPriority.High]: { bg: 'bg-red-100 dark:bg-red-900/50', text: 'text-red-700 dark:text-red-300', dot: 'bg-red-500' },
    };

    const statusStyle = statusColors[task.status] || statusColors[TaskStatus.Open];
    const priorityStyle = priorityColors[task.priority] || priorityColors[TaskPriority.Medium];

    const formattedDate = new Date(task.dueDate).toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric'
    });

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-5 space-y-4">
            <div className="flex justify-between items-center">
                <button className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${statusStyle.bg} ${statusStyle.text}`}>
                    <span className={`w-2 h-2 rounded-full ${statusStyle.dot}`}></span>
                    {t(`tasks.status.${task.status.toLowerCase().replace(' ', '_')}`)}
                    <ChevronDownIcon className="w-4 h-4" />
                </button>
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${priorityStyle.bg} ${priorityStyle.text}`}>
                    <span className={`w-2 h-2 rounded-full ${priorityStyle.dot}`}></span>
                    {t(`tasks.priority.${task.priority.toLowerCase()}`)}
                </div>
            </div>

            <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{t('tasks.card.createdBy')} {creator?.name || 'Unknown'}</p>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-1">{task.title}</h3>
                {task.description && <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{task.description}</p>}
            </div>

            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <RefreshCwIcon className="w-5 h-5" />
                <span className="text-sm font-medium">{formattedDate}</span>
            </div>

            <div>
                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{t('tasks.card.progress')}</span>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{task.progress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${task.progress}%` }}></div>
                </div>
            </div>

            <div className="flex justify-between items-center border-t border-slate-200 dark:border-slate-700 pt-3">
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    {task.messageCount} {t('tasks.card.messages')}
                </button>
                 <div className="w-8 h-8 rounded-full bg-blue-500/10 border-2 border-blue-500 flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{task.progress.toFixed(0)}</span>
                </div>
            </div>
        </div>
    );
};

const Tasks: React.FC<TasksProps> = ({ tasks, allEmployees, setActivePage }) => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('all');

    const employeesMap = useMemo(() => new Map(allEmployees.map(e => [e.id, e])), [allEmployees]);
    
    // Filtering logic would go here based on activeTab
    const filteredTasks = tasks;

    const tabs = [
        { id: 'today', label: t('tasks.tabs.today') },
        { id: 'all', label: t('tasks.tabs.all') },
        { id: 'createdByMe', label: t('tasks.tabs.createdByMe') }
    ];

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <button onClick={() => setActivePage('dashboard')} className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{t('tasks.title')}</h2>
                <button className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200">
                    <FilterIcon className="w-6 h-6" />
                </button>
            </div>

            <div className="border-b border-slate-200 dark:border-slate-700">
                <nav className="flex -mb-px space-x-6 rtl:space-x-reverse" aria-label="Tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === tab.id
                                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:border-slate-600'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>
            
            <div className="space-y-4 pb-16">
                {filteredTasks.map(task => (
                    <TaskCard key={task.id} task={task} creator={employeesMap.get(task.creatorId)} />
                ))}
            </div>

            <button className="fixed bottom-24 end-6 z-40 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <PlusIcon className="w-6 h-6" />
            </button>
        </div>
    );
};

export default Tasks;