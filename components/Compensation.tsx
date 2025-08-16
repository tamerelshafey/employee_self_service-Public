import React from 'react';
import type { Employee, Payslip } from '../types';
import { DownloadIcon } from './Icons';

const initialPayslips: Payslip[] = [
    { id: 'PS006', period: 'June 2024', issueDate: '2024-06-28', netPay: 4500.00 },
    { id: 'PS005', period: 'May 2024', issueDate: '2024-05-30', netPay: 4500.00 },
    { id: 'PS004', period: 'April 2024', issueDate: '2024-04-29', netPay: 4450.00 },
    { id: 'PS003', period: 'March 2024', issueDate: '2024-03-29', netPay: 4500.00 },
    { id: 'PS002', period: 'February 2024', issueDate: '2024-02-27', netPay: 4300.00 },
    { id: 'PS001', period: 'January 2024', issueDate: '2024-01-30', netPay: 4500.00 },
];

interface CompensationProps {
    employee: Employee;
}

const Compensation: React.FC<CompensationProps> = ({ employee }) => {
    
    const formatCurrency = (amount: number, options?: Intl.NumberFormatOptions) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', ...options }).format(amount);
    };

    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Compensation Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-50 p-6 rounded-lg">
                        <p className="text-sm font-medium text-slate-500">Current Annual Salary</p>
                        <p className="text-3xl font-bold text-indigo-600 mt-1">{formatCurrency(employee.compensation.salary, { maximumFractionDigits: 0 })}</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-lg">
                        <p className="text-sm font-medium text-slate-500">Last Bonus</p>
                        <p className="text-3xl font-bold text-green-600 mt-1">{formatCurrency(employee.compensation.lastBonus.amount)}</p>
                        <p className="text-sm text-slate-500 mt-1">Awarded on {employee.compensation.lastBonus.date}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Payslip History</h3>
                </div>
                 <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Pay Period</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Issue Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Net Pay</th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Download</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {initialPayslips.map((payslip) => (
                                <tr key={payslip.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{payslip.period}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{payslip.issueDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">{formatCurrency(payslip.netPay)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-indigo-600 hover:text-indigo-900 flex items-center gap-2">
                                            <DownloadIcon />
                                            Download
                                        </button>
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

export default Compensation;