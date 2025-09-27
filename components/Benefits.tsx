
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Employee } from '../types';
import { formatCurrency } from '../utils/formatters';

interface BenefitsProps {
    employee: Employee;
}

const BenefitCard: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode }> = ({ title, children, icon }) => (
    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-4 mb-4">
            <span className="p-2 bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400 rounded-full">{icon}</span>
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">{title}</h4>
        </div>
        <div className="space-y-2">
            {children}
        </div>
    </div>
);

const BenefitDetail: React.FC<{ label: string; value: string | number; isCurrency?: boolean }> = ({ label, value, isCurrency = false }) => {
    return (
        <div className="flex justify-between items-baseline">
            <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-200">
                {isCurrency && typeof value === 'number' ? formatCurrency(value) : value}
            </p>
        </div>
    );
};


const Benefits: React.FC<BenefitsProps> = ({ employee }) => {
    const { t } = useTranslation();
    const { medical, dental, vision, retirement } = employee.benefits;

    return (
        <div className="space-y-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{t('benefits.title')}</h3>
                        <p className="mt-1 text-slate-600 dark:text-slate-400">{t('benefits.subtitle')}</p>
                    </div>
                    <button className="mt-4 sm:mt-0 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
                        {t('benefits.manage_enrollments')}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BenefitCard title={t('benefits.medical_title')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9 9 0 01-9-9 1 1 0 012 0 7 7 0 1011.83-4.997" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10V3m0 0a1 1 0 012 0v7m-1 1a1 1 0 01-2 0m-3-4h6" /></svg>}>
                    <BenefitDetail label={t('benefits.plan_name')} value={medical.planName} />
                    <BenefitDetail label={t('benefits.coverage_tier')} value={medical.coverageTier} />
                    <BenefitDetail label={t('benefits.cost_per_paycheck')} value={medical.costPerPaycheck} isCurrency />
                </BenefitCard>

                <BenefitCard title={t('benefits.dental_title')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}>
                    <BenefitDetail label={t('benefits.plan_name')} value={dental.planName} />
                    <BenefitDetail label={t('benefits.coverage_tier')} value={dental.coverageTier} />
                    <BenefitDetail label={t('benefits.cost_per_paycheck')} value={dental.costPerPaycheck} isCurrency />
                </BenefitCard>

                <BenefitCard title={t('benefits.vision_title')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}>
                    <BenefitDetail label={t('benefits.plan_name')} value={vision.planName} />
                    <BenefitDetail label={t('benefits.coverage_tier')} value={vision.coverageTier} />
                    <BenefitDetail label={t('benefits.cost_per_paycheck')} value={vision.costPerPaycheck} isCurrency />
                </BenefitCard>

                <BenefitCard title={t('benefits.retirement_title')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}>
                    <BenefitDetail label={t('benefits.contribution_rate')} value={`${retirement.contributionRate}%`} />
                    <BenefitDetail label={t('benefits.employer_match')} value={retirement.employerMatch} />
                    <div className="pt-2 mt-2 border-t border-slate-200 dark:border-slate-700">
                         <BenefitDetail label={t('benefits.vested_balance')} value={formatCurrency(retirement.balance, { maximumFractionDigits: 0 })} />
                    </div>
                </BenefitCard>
            </div>
        </div>
    );
};

export default Benefits;