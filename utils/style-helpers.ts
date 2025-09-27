import { LeaveStatus, ExpenseStatus } from '../types';

export const getRequestStatusBadge = (status: LeaveStatus | ExpenseStatus): string => {
    switch (status) {
        case 'Approved':
            return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
        case 'Pending':
            return 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300';
        case 'Rejected':
            return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
        default:
            return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
    }
};