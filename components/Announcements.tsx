
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Announcement } from '../types';
import { CalendarIcon, DocumentIcon, CodeIcon, InformationCircleIcon } from './Icons';

const categoryStyles: Record<Announcement['category'], { icon: React.ReactNode; colors: string }> = {
    'Event': { icon: <CalendarIcon className="w-5 h-5" />, colors: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300' },
    'HR Update': { icon: <DocumentIcon className="w-5 h-5" />, colors: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' },
    'Tech Blog': { icon: <CodeIcon className="w-5 h-5" />, colors: 'bg-slate-200 text-slate-800 dark:bg-slate-600 dark:text-slate-200' },
    'Company News': { icon: <InformationCircleIcon className="w-5 h-5" />, colors: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300' },
};

const Announcements: React.FC<{ announcements: Announcement[] }> = ({ announcements }) => {
    const { t } = useTranslation();
    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md h-full">
            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-slate-50">{t('announcements.title')}</h3>
            <div className="space-y-4">
                {announcements.map((item) => (
                    <div key={item.id} className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-slate-700">
                       <div className="flex items-start space-x-4 rtl:space-x-reverse">
                           <div className={`p-2 rounded-full ${categoryStyles[item.category].colors}`}>
                               {categoryStyles[item.category].icon}
                           </div>
                           <div className="flex-1">
                                <p className="font-bold text-slate-800 dark:text-slate-200 text-md">{item.title}</p>
                                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{item.snippet}</p>
                                <div className="flex justify-between items-center mt-3">
                                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${categoryStyles[item.category].colors}`}>
                                        {item.category}
                                    </span>
                                     <p className="text-xs text-slate-400 dark:text-slate-500">{item.date}</p>
                                </div>
                           </div>
                       </div>
                    </div>
                ))}
                 <div className="text-center pt-2">
                    <a href="#" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">{t('announcements.view_all')}</a>
                </div>
            </div>
        </div>
    );
};

export default Announcements;