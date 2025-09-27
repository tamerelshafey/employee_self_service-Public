

import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { JobOpening } from '../types';
import Modal from './Modal';

interface RecruitmentProps {
    jobOpenings: JobOpening[];
}

const Recruitment: React.FC<RecruitmentProps> = ({ jobOpenings }) => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDept, setSelectedDept] = useState('All');
    const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
    const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);

    const departments = useMemo(() => [t('careers.all_departments'), ...new Set(jobOpenings.map(j => j.department))], [t, jobOpenings]);
    
    const filteredJobs = useMemo(() => {
        return jobOpenings.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.department.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesDept = selectedDept === t('careers.all_departments') || job.department === selectedDept;
            return matchesSearch && matchesDept;
        });
    }, [searchTerm, selectedDept, t, jobOpenings]);
    
    const openReferralModal = () => {
        setIsReferralModalOpen(true);
    };
    
    const modalInputClasses = "mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200";

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{t('careers.title')}</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-400">{t('careers.subtitle')}</p>
                <div className="mt-4 flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        placeholder={t('careers.search_placeholder')}
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredJobs.map(job => (
                    <div key={job.id} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md flex flex-col justify-between transition-shadow hover:shadow-lg">
                        <div>
                            <div className="flex justify-between items-start">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-slate-50">{job.title}</h4>
                                <span className="text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 px-2 py-1 rounded-full">{job.type}</span>
                            </div>
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">{job.department} &middot; {job.location}</p>
                            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{job.description}</p>
                        </div>
                        <button 
                            onClick={() => setSelectedJob(job)}
                            className="mt-4 w-full bg-indigo-100 text-indigo-700 dark:bg-slate-700 dark:text-indigo-300 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-200 dark:hover:bg-slate-600 transition-colors text-sm"
                        >
                            {t('careers.view_details')}
                        </button>
                    </div>
                ))}
            </div>

            {filteredJobs.length === 0 && (
                <div className="text-center py-10 bg-white dark:bg-slate-800 rounded-xl shadow-md">
                    <p className="text-slate-500 dark:text-slate-400">{t('careers.empty_message')}</p>
                </div>
            )}

            {selectedJob && (
                <Modal title={selectedJob.title} isOpen={!!selectedJob} onClose={() => setSelectedJob(null)}>
                    <div className="space-y-4">
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{selectedJob.department} &middot; {selectedJob.location}</p>
                        <p className="text-slate-700 dark:text-slate-300">{selectedJob.description}</p>
                        <div>
                            <h5 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">{t('performance.modal_goals')}</h5>
                            <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                                {selectedJob.qualifications.map((q, i) => <li key={i}>{q}</li>)}
                            </ul>
                        </div>
                        <div className="flex justify-end gap-3 pt-4">
                            <button onClick={openReferralModal} className="bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500 transition-colors">{t('careers.refer_candidate')}</button>
                            <button onClick={() => alert(t('careers.application_submitted'))} className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">{t('careers.apply_now')}</button>
                        </div>
                    </div>
                </Modal>
            )}

            {isReferralModalOpen && (
                 <Modal title={t('careers.referral_modal_title', { title: selectedJob?.title })} isOpen={isReferralModalOpen} onClose={() => setIsReferralModalOpen(false)}>
                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert(t('careers.submit_referral')); setIsReferralModalOpen(false); setSelectedJob(null); }}>
                        <div>
                            <label htmlFor="refName" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('careers.candidate_name')}</label>
                            <input type="text" id="refName" required className={modalInputClasses}/>
                        </div>
                        <div>
                            <label htmlFor="refEmail" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('careers.candidate_email')}</label>
                            <input type="email" id="refEmail" required className={modalInputClasses}/>
                        </div>
                         <div>
                            <label htmlFor="refReason" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('careers.recommendation_reason')}</label>
                            <textarea id="refReason" rows={3} className={modalInputClasses}></textarea>
                        </div>
                        <div className="flex justify-end gap-3 pt-4">
                             <button type="button" onClick={() => setIsReferralModalOpen(false)} className="bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500 transition-colors">{t('careers.cancel')}</button>
                            <button type="submit" className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">{t('careers.submit_referral')}</button>
                        </div>
                    </form>
                </Modal>
            )}

        </div>
    );
};

export default Recruitment;