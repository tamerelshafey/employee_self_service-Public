
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Employee } from '../types';

interface ProfileProps {
    employee: Employee;
    allEmployees: Employee[];
}

interface ProfileFieldProps {
    label: string;
    value: string;
}

const ProfileField: React.FC<ProfileFieldProps> = ({ label, value }) => (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
        <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</dt>
        <dd className="mt-1 text-sm text-slate-900 dark:text-slate-200 sm:mt-0 sm:col-span-2 text-start">{value}</dd>
    </div>
);


const Profile: React.FC<ProfileProps> = ({ employee, allEmployees }) => {
    const { t } = useTranslation();
    const manager = allEmployees.find(e => e.id === employee.managerId);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
            <div className="md:flex md:rtl:flex-row-reverse">
                <div className="md:flex-shrink-0 p-8 flex flex-col items-center justify-center bg-indigo-50 dark:bg-slate-700/50">
                    <img className="h-32 w-32 rounded-full object-cover border-4 border-white dark:border-slate-600 shadow-lg" src={employee.avatarUrl} alt="Employee Avatar" />
                    <h3 className="mt-4 text-2xl font-bold text-slate-900 dark:text-slate-50">{employee.name}</h3>
                    <p className="mt-1 text-md text-indigo-600 dark:text-indigo-400 font-semibold">{employee.position}</p>
                </div>
                <div className="p-8 flex-1">
                    <h3 className="text-lg leading-6 font-bold text-slate-900 dark:text-slate-50">{t('profile.personal_info')}</h3>
                    <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-slate-400">{t('profile.details_prompt')}</p>
                    <div className="mt-5 border-t border-slate-200 dark:border-slate-700">
                        <dl className="divide-y divide-slate-200 dark:divide-slate-700">
                            <ProfileField label={t('profile.employee_id')} value={employee.id} />
                            <ProfileField label={t('profile.full_name')} value={employee.name} />
                            <ProfileField label={t('profile.department')} value={employee.department} />
                            <ProfileField label={t('profile.email')} value={employee.email} />
                            <ProfileField label={t('profile.phone')} value={employee.phone} />
                            <ProfileField label={t('profile.address')} value={employee.address} />
                        </dl>
                    </div>

                    {manager && (
                         <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-5">
                            <h3 className="text-lg leading-6 font-bold text-slate-900 dark:text-slate-50">{t('profile.reporting_line')}</h3>
                            <div className="mt-4 bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg flex items-center space-x-4 rtl:space-x-reverse">
                                <img className="h-16 w-16 rounded-full object-cover" src={manager.avatarUrl} alt={manager.name} />
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{t('profile.reports_to')}</p>
                                    <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">{manager.name}</p>
                                    <p className="text-sm text-indigo-600 dark:text-indigo-400">{manager.position}</p>
                                </div>
                            </div>
                        </div>
                    )}

                     <div className="mt-6 flex justify-end">
                        <button className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
                            {t('profile.edit_profile')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;