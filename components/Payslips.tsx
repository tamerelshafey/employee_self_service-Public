

import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Payslip } from '../types';
import { DownloadIcon } from './Icons';
import { formatCurrency } from '../utils/formatters';

interface PayslipsProps {
    payslips: Payslip[];
}

const Payslips: React.FC<PayslipsProps> = ({ payslips }) => {
    const { t } = useTranslation();
    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">{t('payslips.title')}</h3>
            </div>
             <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                    <thead className="bg-slate-50 dark:bg-slate-700/50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">{t('payslips.table_period')}</th>
                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">{t('payslips.table_date')}</th>
                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">{t('payslips.table_net_pay')}</th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">{t('documents.table_actions')}</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                        {payslips.map((payslip) => (
                            <tr key={payslip.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-50">{payslip.period}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{payslip.issueDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400 font-mono">{formatCurrency(payslip.netPay)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                    <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center gap-2">
                                        <DownloadIcon />
                                        {t('payslips.download')}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Payslips;