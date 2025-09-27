
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { Employee, LeaveRequest, ExpenseClaim } from '../types';
import { ApprovalAction } from '../types';
import { formatCurrency } from '../utils/formatters';

type ApprovalItem = (LeaveRequest & { itemType: 'leave' }) | (ExpenseClaim & { itemType: 'expense' });

interface ApprovalsProps {
    loggedInEmployee: Employee;
    allEmployees: Employee[];
    pendingApprovals: ApprovalItem[];
    onAction: (itemId: string, itemType: 'leave' | 'expense', action: ApprovalAction, reason?: string) => void;
}

const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode; count: number }> = ({ active, onClick, children, count }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
            active
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
        }`}
    >
        {children}
        {count > 0 && <span className={`ms-2 px-2 py-0.5 rounded-full text-xs ${active ? 'bg-indigo-400 text-indigo-50' : 'bg-slate-300 dark:bg-slate-600 text-slate-700 dark:text-slate-200'}`}>{count}</span>}
    </button>
);

const ApprovalCard: React.FC<{ item: ApprovalItem; employee: Employee; onAction: ApprovalsProps['onAction'] }> = ({ item, employee, onAction }) => {
    const { t } = useTranslation();
    return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
                <img src={employee.avatarUrl} alt={employee.name} className="w-12 h-12 rounded-full" />
                <div>
                    <p className="font-bold text-slate-800 dark:text-slate-200">{employee.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{employee.position}</p>
                </div>
            </div>
            
            <div className="space-y-2 text-sm bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg">
                {item.itemType === 'leave' && (
                    <>
                        <p><span className="font-semibold text-slate-600 dark:text-slate-300">{t('approvals.request_details.type')}</span> <span className="text-slate-800 dark:text-slate-200">{item.type}</span></p>
                        <p><span className="font-semibold text-slate-600 dark:text-slate-300">{t('approvals.request_details.dates')}</span> <span className="text-slate-800 dark:text-slate-200">{item.startDate} to {item.endDate}</span></p>
                        <p><span className="font-semibold text-slate-600 dark:text-slate-300">{t('approvals.request_details.reason')}</span> <span className="text-slate-800 dark:text-slate-200">{item.reason}</span></p>
                    </>
                )}
                {item.itemType === 'expense' && (
                    <>
                        <p><span className="font-semibold text-slate-600 dark:text-slate-300">{t('approvals.request_details.category')}</span> <span className="text-slate-800 dark:text-slate-200">{item.category}</span></p>
                        <p><span className="font-semibold text-slate-600 dark:text-slate-300">{t('approvals.request_details.date')}</span> <span className="text-slate-800 dark:text-slate-200">{item.date}</span></p>
                        <p><span className="font-semibold text-slate-600 dark:text-slate-300">{t('approvals.request_details.amount')}</span> <span className="font-mono text-slate-800 dark:text-slate-200">{formatCurrency(item.amount)}</span></p>
                        <p><span className="font-semibold text-slate-600 dark:text-slate-300">{t('approvals.request_details.description')}</span> <span className="text-slate-800 dark:text-slate-200">{item.description}</span></p>
                    </>
                )}
            </div>

            <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => onAction(item.id, item.itemType, ApprovalAction.Reject)} className="bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500 transition-colors text-sm">{t('approvals.reject')}</button>
                <button onClick={() => onAction(item.id, item.itemType, ApprovalAction.Approve)} className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition-colors text-sm">{t('approvals.approve')}</button>
            </div>
        </div>
    );
};


const Approvals: React.FC<ApprovalsProps> = ({ loggedInEmployee, allEmployees, pendingApprovals, onAction }) => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<'leave' | 'expense'>('leave');

    const directReportIds = useMemo(() => {
        return allEmployees.filter(e => e.managerId === loggedInEmployee.id).map(e => e.id);
    }, [loggedInEmployee, allEmployees]);

    const managerApprovals = useMemo(() => {
        return pendingApprovals.filter(item => item.employeeId && directReportIds.includes(item.employeeId));
    }, [pendingApprovals, directReportIds]);

    const leaveRequests = managerApprovals.filter(a => a.itemType === 'leave') as (LeaveRequest & { itemType: 'leave' })[];
    const expenseClaims = managerApprovals.filter(a => a.itemType === 'expense') as (ExpenseClaim & { itemType: 'expense' })[];

    const itemsToDisplay = activeTab === 'leave' ? leaveRequests : expenseClaims;

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{t('approvals.title')}</h2>
                <p className="mt-2 text-slate-600 dark:text-slate-400">{t('approvals.subtitle')}</p>
                <div className="mt-4 border-b border-slate-200 dark:border-slate-700 pb-4">
                    <div className="flex items-center gap-2">
                        <TabButton active={activeTab === 'leave'} onClick={() => setActiveTab('leave')} count={leaveRequests.length}>
                            {t('approvals.leave_tab')}
                        </TabButton>
                        <TabButton active={activeTab === 'expense'} onClick={() => setActiveTab('expense')} count={expenseClaims.length}>
                            {t('approvals.expense_tab')}
                        </TabButton>
                    </div>
                </div>
            </div>

            {itemsToDisplay.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {itemsToDisplay.map(item => {
                        const employee = allEmployees.find(e => e.id === item.employeeId);
                        if (!employee) return null;
                        return <ApprovalCard key={`${item.itemType}-${item.id}`} item={item} employee={employee} onAction={onAction} />;
                    })}
                </div>
            ) : (
                <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-xl shadow-md">
                    <div className="mx-auto h-12 w-12 text-green-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="mt-2 text-lg font-medium text-slate-900 dark:text-slate-50">{t('approvals.empty_title')}</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t(activeTab === 'leave' ? 'approvals.empty_message_leave' : 'approvals.empty_message_expense')}</p>
                </div>
            )}
        </div>
    );
};

export default Approvals;