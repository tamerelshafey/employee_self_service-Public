import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeftIcon } from './Icons';

interface OrdersProps {
    setActivePage: (page: string) => void;
    setToastMessage: (message: string) => void;
}

const Orders: React.FC<OrdersProps> = ({ setActivePage, setToastMessage }) => {
    const { t } = useTranslation();
    const [item, setItem] = useState('');
    const [category, setCategory] = useState('IT Equipment');
    const [justification, setJustification] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd submit this data
        console.log({ item, category, justification });
        setToastMessage(t('orders.submit_success'));
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
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">{t('page_titles.orders')}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="item" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('orders.item_name')}</label>
                        <input type="text" id="item" value={item} onChange={e => setItem(e.target.value)} required className={inputClasses} placeholder={t('orders.item_placeholder')} />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('orders.category')}</label>
                        <select id="category" value={category} onChange={e => setCategory(e.target.value)} className={inputClasses}>
                            <option value="IT Equipment">{t('orders.categories.it')}</option>
                            <option value="Office Supplies">{t('orders.categories.supplies')}</option>
                            <option value="Other">{t('orders.categories.other')}</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="justification" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('orders.justification')}</label>
                        <textarea id="justification" rows={4} value={justification} onChange={e => setJustification(e.target.value)} required className={inputClasses} placeholder={t('orders.justification_placeholder')}></textarea>
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

export default Orders;
