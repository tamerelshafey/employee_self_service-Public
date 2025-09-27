
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { Employee } from '../types';

interface DirectoryProps {
    allEmployees: Employee[];
}

const EmployeeCard: React.FC<{ employee: Employee }> = ({ employee }) => (
    <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-md text-center transition-transform hover:scale-105">
        <img
            className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-slate-200 dark:border-slate-700"
            src={employee.avatarUrl}
            alt={employee.name}
        />
        <h4 className="mt-4 text-lg font-bold text-slate-900 dark:text-slate-50">{employee.name}</h4>
        <p className="text-indigo-600 dark:text-indigo-400 font-semibold">{employee.position}</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{employee.department}</p>
    </div>
);

const Directory: React.FC<DirectoryProps> = ({ allEmployees }) => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDept, setSelectedDept] = useState('All');

    const departments = useMemo(() => ['All', ...new Set(allEmployees.map(e => e.department))], [allEmployees]);

    const filteredEmployees = useMemo(() => {
        return allEmployees.filter(employee => {
            const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  employee.position.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesDept = selectedDept === 'All' || employee.department === selectedDept;
            return matchesSearch && matchesDept;
        });
    }, [searchTerm, selectedDept, allEmployees]);

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{t('directory.title')}</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-400">{t('directory.subtitle')}</p>
                <div className="mt-4 flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        placeholder={t('directory.search_placeholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full sm:w-2/3 ps-4 pe-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
                    />
                    <select
                        value={selectedDept}
                        onChange={(e) => setSelectedDept(e.target.value)}
                        className="w-full sm:w-1/3 ps-3 pe-10 py-2 text-base border border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
                    >
                        {departments.map(dept => <option key={dept}>{dept}</option>)}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredEmployees.map(employee => (
                    <EmployeeCard key={employee.id} employee={employee} />
                ))}
            </div>

            {filteredEmployees.length === 0 && (
                <div className="text-center py-10 bg-white dark:bg-slate-800 rounded-xl shadow-md">
                    <p className="text-slate-500 dark:text-slate-400">{t('directory.empty_message')}</p>
                </div>
            )}
        </div>
    );
};

export default Directory;