

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ExpenseClaim } from '../types';
import { PlusIcon } from './Icons';
import { formatCurrency } from '../utils/formatters';
import { getRequestStatusBadge } from '../utils/style-helpers';

interface ExpensesProps {
    userExpenseClaims: ExpenseClaim[];
    onNewClaimClick: () => void;
}

const Expenses: React.FC<ExpensesProps> = ({ userExpenseClaims, onNewClaimClick }) => {
    const { t } = useTranslation();
    
    const sortedClaims = [...userExpenseClaims].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">{t('expenses.title')}</h3>
                <button
                    onClick={onNewClaimClick}
                    className="flex items-center gap-2 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
                >
                    <PlusIcon />
                    {t('expenses.new_claim')}
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                    <thead className="bg-slate-50 dark:bg-slate-700/50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">{t('expenses.table_date')}</th>
                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">{t('expenses.table_description')}</th>
                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">{t('expenses.table_category')}</th>
                             <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">{t('expenses.table_amount')}</th>
                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">{t('expenses.table_status')}</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                        {sortedClaims.map((claim) => (
                            <tr key={claim.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{claim.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-50 max-w-xs truncate">{claim.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{claim.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400 font-mono">{formatCurrency(claim.amount)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRequestStatusBadge(claim.status)}`}>
                                        {claim.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Expenses;
