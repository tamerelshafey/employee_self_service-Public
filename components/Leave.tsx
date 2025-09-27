

import React from 'react';
import { useTranslation } from 'react-i18next';
import { LeaveRequest, LeaveBalance } from '../types';
import { PlusIcon } from './Icons';
import { getRequestStatusBadge } from '../utils/style-helpers';

const BalanceCard: React.FC<{ balance: LeaveBalance }> = ({ balance }) => {
    const { t } = useTranslation();
    const available = balance.total - balance.used;
    const progress = balance.total > 0 ? (balance.used / balance.total) * 100 : 0;

    return (
        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-semibold text-slate-600 dark:text-slate-300">{balance.type}</h4>
            <div className="mt-2 flex items-baseline gap-2">
                <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{available}</p>
                <p className="text-slate-500 dark:text-slate-400 font-medium">{t('leave.days_available')}</p>
            </div>
            <div className="mt-4">
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div 
                        className="bg-indigo-500 h-2 rounded-full" 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 text-end">{t('leave.used_of_total', { used: balance.used, total: balance.total })}</p>
            </div>
        </div>
    );
};

interface LeaveProps {
  leaveBalance: LeaveBalance[];
  userLeaveRequests: LeaveRequest[];
  onNewRequestClick: () => void;
}

const Leave: React.FC<LeaveProps> = ({ leaveBalance, userLeaveRequests, onNewRequestClick }) => {
    const { t } = useTranslation();
    
    const sortedRequests = [...userLeaveRequests].sort((a,b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">{t('leave.my_balances')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {leaveBalance.map(balance => (
                        <BalanceCard key={balance.type} balance={balance} />
                    ))}
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">{t('leave.my_history')}</h3>
                    <button
                        onClick={onNewRequestClick}
                        className="flex items-center gap-2 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
                    >
                        <PlusIcon />
                        {t('leave.new_request')}
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                        <thead className="bg-slate-50 dark:bg-slate-700/50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">{t('leave.table_type')}</th>
                                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">{t('leave.table_dates')}</th>
                                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">{t('leave.table_reason')}</th>
                                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">{t('leave.table_status')}</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                            {sortedRequests.map((request) => (
                                <tr key={request.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-50">{request.type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{request.startDate} to {request.endDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400 max-w-xs truncate">{request.reason}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRequestStatusBadge(request.status)}`}>
                                            {request.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Leave;
