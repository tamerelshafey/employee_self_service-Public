import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeftIcon } from './Icons';

interface PaymentsProps {
    setActivePage: (page: string) => void;
    setToastMessage: (message: string) => void;
}

const Payments: React.FC<PaymentsProps> = ({ setActivePage, setToastMessage }) => {
    const { t } = useTranslation();
    const [payee, setPayee] = useState('');
    const [amount, setAmount] = useState('');
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [reason, setReason] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ payee, amount, invoiceNumber, reason });
        setToastMessage(t('payments.submit_success'));
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
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">{t('page_titles.payments')}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="payee" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('payments.payee')}</label>
                            <input type="text" id="payee" value={payee} onChange={e => setPayee(e.target.value)} required className={inputClasses} />
                        </div>
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('payments.amount')}</label>
                            <input type="number" id="amount" value={amount} onChange={e => setAmount(e.target.value)} required min="0.01" step="0.01" placeholder="0.00" className={inputClasses} />
                        </div>
                    </div>
                     <div>
                        <label htmlFor="invoiceNumber" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('payments.invoice_number')}</label>
                        <input type="text" id="invoiceNumber" value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} className={inputClasses} />
                    </div>
                    <div>
                        <label htmlFor="reason" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('payments.reason')}</label>
                        <textarea id="reason" rows={4} value={reason} onChange={e => setReason(e.target.value)} required className={inputClasses}></textarea>
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

export default Payments;
