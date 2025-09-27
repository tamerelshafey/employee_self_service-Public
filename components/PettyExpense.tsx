import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeftIcon } from './Icons';

interface PettyExpenseProps {
    setActivePage: (page: string) => void;
    setToastMessage: (message: string) => void;
}

const PettyExpense: React.FC<PettyExpenseProps> = ({ setActivePage, setToastMessage }) => {
    const { t } = useTranslation();
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ date, description, amount });
        setToastMessage(t('petty_expense.submit_success'));
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
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">{t('page_titles.pettyExpense')}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="pettyDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('petty_expense.date')}</label>
                            <input type="date" id="pettyDate" value={date} onChange={e => setDate(e.target.value)} required className={inputClasses} />
                        </div>
                        <div>
                            <label htmlFor="pettyAmount" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('petty_expense.amount')}</label>
                            <input type="number" id="pettyAmount" value={amount} onChange={e => setAmount(e.target.value)} required min="0.01" step="0.01" placeholder="0.00" className={inputClasses} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="pettyDescription" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('petty_expense.description')}</label>
                        <textarea id="pettyDescription" rows={3} value={description} onChange={e => setDescription(e.target.value)} required className={inputClasses}></textarea>
                    </div>
                    <div>
                         <label htmlFor="pettyReceipt" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('expenses.modal_receipt')}</label>
                         <input type="file" id="pettyReceipt" className="mt-1 block w-full text-sm text-slate-500 file:me-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-slate-700 dark:file:text-indigo-300 dark:hover:file:bg-slate-600"/>
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

export default PettyExpense;
