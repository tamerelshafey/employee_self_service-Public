import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeftIcon } from './Icons';

interface VisitsProps {
    setActivePage: (page: string) => void;
    setToastMessage: (message: string) => void;
}

const Visits: React.FC<VisitsProps> = ({ setActivePage, setToastMessage }) => {
    const { t } = useTranslation();
    const [purpose, setPurpose] = useState('');
    const [location, setLocation] = useState('');
    const [visitDate, setVisitDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ purpose, location, visitDate });
        setToastMessage(t('visits.submit_success'));
        setActivePage('dashboard');
    };
    
    const inputClasses = "mt-1 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 focus:ring-indigo-500 focus:border-indigo-500";

    return (
        <div className="space-y-6">
            <button onClick={() => setActivePage('dashboard')} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 font-semibold">
                <ArrowLeftIcon className="w-5 h-5" />
                {t('common.back_to_dashboard')}
            </button>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">{t('page_titles.visits')}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="visitDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('visits.date')}</label>
                        <input type="date" id="visitDate" value={visitDate} onChange={e => setVisitDate(e.target.value)} required className={inputClasses} />
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('visits.location')}</label>
                        <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} required className={inputClasses} placeholder={t('visits.location_placeholder')} />
                    </div>
                    <div>
                        <label htmlFor="purpose" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('visits.purpose')}</label>
                        <textarea id="purpose" rows={4} value={purpose} onChange={e => setPurpose(e.target.value)} required className={inputClasses} placeholder={t('visits.purpose_placeholder')}></textarea>
                    </div>
                    <div className="flex justify-end pt-2">
                        <button type="submit" className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
                            {t('common.submit')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Visits;
