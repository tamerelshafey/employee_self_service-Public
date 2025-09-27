import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeftIcon } from './Icons';
import type { Employee } from '../types';
import { TaskPriority } from '../types';

interface NewTaskProps {
    allEmployees: Employee[];
    loggedInEmployeeId: string;
    setActivePage: (page: string) => void;
    setToastMessage: (message: string) => void;
}

const NewTask: React.FC<NewTaskProps> = ({ allEmployees, loggedInEmployeeId, setActivePage, setToastMessage }) => {
    const { t } = useTranslation();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assigneeId, setAssigneeId] = useState(loggedInEmployeeId);
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState<TaskPriority>(TaskPriority.Medium);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ title, description, assigneeId, dueDate, priority });
        setToastMessage(t('newTask.submit_success'));
        setActivePage('tasks');
    };
    
    const inputClasses = "mt-1 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 focus:ring-indigo-500 focus:border-indigo-500";

    return (
        <div className="space-y-6">
            <button onClick={() => setActivePage('dashboard')} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 font-semibold">
                <ArrowLeftIcon className="w-5 h-5" />
                {t('common.back_to_dashboard')}
            </button>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">{t('page_titles.newTask')}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('newTask.title')}</label>
                        <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className={inputClasses} />
                    </div>
                     <div>
                        <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('newTask.description')}</label>
                        <textarea id="description" rows={4} value={description} onChange={e => setDescription(e.target.value)} className={inputClasses}></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="assignee" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('newTask.assignee')}</label>
                            <select id="assignee" value={assigneeId} onChange={e => setAssigneeId(e.target.value)} className={inputClasses}>
                                {allEmployees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
                            </select>
                        </div>
                         <div>
                            <label htmlFor="priority" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('newTask.priority')}</label>
                            <select id="priority" value={priority} onChange={e => setPriority(e.target.value as TaskPriority)} className={inputClasses}>
                                <option value={TaskPriority.Low}>{t('tasks.priority.low')}</option>
                                <option value={TaskPriority.Medium}>{t('tasks.priority.medium')}</option>
                                <option value={TaskPriority.High}>{t('tasks.priority.high')}</option>
                            </select>
                        </div>
                    </div>
                     <div>
                        <label htmlFor="dueDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('newTask.due_date')}</label>
                        <input type="date" id="dueDate" value={dueDate} onChange={e => setDueDate(e.target.value)} required className={inputClasses} />
                    </div>
                    <div className="flex justify-end pt-2">
                        <button type="submit" className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
                            {t('common.submit')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewTask;
