import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ExpenseClaim } from '../types';
import Modal from './Modal';

interface ExpenseClaimModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (claim: Omit<ExpenseClaim, 'id' | 'status' | 'employeeId'>) => void;
}

const ExpenseClaimModal: React.FC<ExpenseClaimModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const { t } = useTranslation();
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Travel');
    const [amount, setAmount] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!date || !description || !amount || isNaN(parseFloat(amount))) return;
        onSubmit({ date, description, category, amount: parseFloat(amount) });
        // Reset form
        setDate('');
        setDescription('');
        setCategory('Travel');
        setAmount('');
    };

    const inputClasses = "mt-1 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 focus:ring-indigo-500 focus:border-indigo-500";
    
    return (
        <Modal title={t('expenses.modal_title')} isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                 <div>
                    <label htmlFor="expDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('expenses.modal_date')}</label>
                    <input type="date" id="expDate" value={date} onChange={e => setDate(e.target.value)} required className={inputClasses}/>
                </div>
                 <div>
                    <label htmlFor="expCategory" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('expenses.modal_category')}</label>
                    <select id="expCategory" value={category} onChange={e => setCategory(e.target.value)} className={inputClasses}>
                        <option value="Travel">{t('expenses.modal_category_travel')}</option>
                        <option value="Meals">{t('expenses.modal_category_meals')}</option>
                        <option value="Supplies">{t('expenses.modal_category_supplies')}</option>
                        <option value="Software">{t('expenses.modal_category_software')}</option>
                        <option value="Petty Expense">{t('expenses.modal_category_petty')}</option>
                        <option value="Other">{t('expenses.modal_category_other')}</option>
                    </select>
                </div>
                 <div>
                    <label htmlFor="expAmount" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('expenses.modal_amount')}</label>
                    <input type="number" id="expAmount" value={amount} onChange={e => setAmount(e.target.value)} required min="0.01" step="0.01" placeholder="0.00" className={inputClasses}/>
                </div>
                <div>
                     <label htmlFor="expDescription" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('expenses.modal_description')}</label>
                     <textarea id="expDescription" rows={3} value={description} onChange={e => setDescription(e.target.value)} required className={inputClasses}></textarea>
                </div>
                <div>
                     <label htmlFor="expReceipt" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('expenses.modal_receipt')}</label>
                     <input type="file" id="expReceipt" className="mt-1 block w-full text-sm text-slate-500 file:me-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-slate-700 dark:file:text-indigo-300 dark:hover:file:bg-slate-600"/>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                    <button type="button" onClick={onClose} className="bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500 transition-colors">{t('expenses.modal_cancel')}</button>
                    <button type="submit" className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">{t('expenses.modal_submit')}</button>
                </div>
            </form>
        </Modal>
    );
};

export default ExpenseClaimModal;
