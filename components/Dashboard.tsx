

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { Employee } from '../types';
import { ClipboardCheckIcon, ChevronRightIcon, FaceIdIcon, NoTasksIllustration } from './Icons';

interface DashboardProps {
    employee: Employee;
    setActivePage: (page: string) => void;
    pendingApprovalsCount: number;
}

const Dashboard: React.FC<DashboardProps> = ({ employee, setActivePage, pendingApprovalsCount }) => {
    const { t } = useTranslation();
    const [isClockedIn, setIsClockedIn] = useState(false);
    const [clockInTime, setClockInTime] = useState<Date | null>(null);
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const hour = new Date().getHours();
        const name = employee.name.split(' ')[0];
        if (hour < 12) {
            setGreeting(t('dashboard.good_morning', { name }));
        } else if (hour < 18) {
            setGreeting(t('dashboard.good_afternoon', { name }));
        } else {
            setGreeting(t('dashboard.good_evening', { name }));
        }
    }, [t, employee.name]);

    const handleClockInOut = () => {
        if (isClockedIn) {
            setIsClockedIn(false);
        } else {
            setIsClockedIn(true);
            setClockInTime(new Date());
        }
    };

    return (
        <div className="space-y-6">
            {/* Greeting and Attendance Card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 relative overflow-hidden">
                <img src={employee.avatarUrl} alt={employee.name} className="w-16 h-16 rounded-full absolute top-6 end-6 border-4 border-white dark:border-slate-800" />
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">{greeting}</h2>
                {isClockedIn && clockInTime ? (
                     <p className="mt-2 text-slate-500 dark:text-slate-400">{t('dashboard.started_day_at', { time: clockInTime.toLocaleTimeString(navigator.language, { hour: 'numeric', minute: '2-digit' }) })}</p>
                ) : (
                    <p className="mt-2 text-slate-500 dark:text-slate-400">{t('dashboard.not_clocked_in')}</p>
                )}
                <button
                    onClick={handleClockInOut}
                    className="mt-6 w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border border-slate-300 dark:border-slate-600 rounded-full font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                    <span>{isClockedIn ? t('dashboard.check_out') : t('dashboard.check_in')}</span>
                    <FaceIdIcon className="w-6 h-6 text-indigo-500" />
                </button>
            </div>

            {/* Approval Requests Card */}
            {pendingApprovalsCount > 0 && (
                <button onClick={() => setActivePage('approvals')} className="w-full bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full">
                            <ClipboardCheckIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="font-bold text-slate-800 dark:text-slate-100">{t('dashboard.approval_requests')}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{t('dashboard.pending_requests', { count: pendingApprovalsCount })}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                        <ChevronRightIcon className="w-5 h-5 text-slate-400" />
                    </div>
                </button>
            )}

            {/* Your Task Card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{t('dashboard.your_task')}</h3>
                    <a href="#" onClick={(e) => { e.preventDefault(); alert('Task page coming soon!'); }} className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">{t('dashboard.view_all')}</a>
                </div>
                <div className="text-center py-8">
                    <NoTasksIllustration />
                    <h4 className="mt-4 font-bold text-slate-800 dark:text-slate-100">{t('dashboard.no_tasks_title')}</h4>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto">{t('dashboard.no_tasks_subtitle')}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
