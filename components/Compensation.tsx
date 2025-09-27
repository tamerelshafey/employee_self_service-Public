
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Employee } from '../types';
import { formatCurrency } from '../utils/formatters';

interface CompensationProps {
    employee: Employee;
}

const Compensation: React.FC<CompensationProps> = ({ employee }) => {
    const { t } = useTranslation();
    return (
        <div className="space-y-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">{t('compensation.title')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-lg">
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t('compensation.salary')}</p>
                        <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{formatCurrency(employee.compensation.salary, { maximumFractionDigits: 0 })}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-lg">
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t('compensation.bonus')}</p>
                        <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">{formatCurrency(employee.compensation.lastBonus.amount)}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t('compensation.bonus_date', { date: employee.compensation.lastBonus.date })}</p>
                    </div>
                </div>
                 <div className="mt-6 text-sm text-slate-500 dark:text-slate-400">
                    <p>{t('compensation.info_text')}</p>
                </div>
            </div>
        </div>
    );
};

export default Compensation;