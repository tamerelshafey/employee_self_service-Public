import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { LeaveRequest } from '../types';
import Modal from './Modal';

interface LeaveRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (request: Omit<LeaveRequest, 'id' | 'status' | 'employeeId'>) => void;
}

const LeaveRequestModal: React.FC<LeaveRequestModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const { t } = useTranslation();
    const [type, setType] = useState('Annual Leave');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');

    const leaveTypes = [
        { value: 'Annual Leave', labelKey: 'annual_leave' },
        { value: 'Sick Leave', labelKey: 'sick_leave' },
        { value: 'Personal Leave', labelKey: 'personal_leave' },
        { value: 'Unpaid Leave', labelKey: 'unpaid_leave' }
    ];
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!startDate || !endDate || !reason) return;
        onSubmit({ type, startDate, endDate, reason });
        // Reset form
        setType('Annual Leave');
        setStartDate('');
        setEndDate('');
        setReason('');
    };
    
    const inputClasses = "mt-1 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 focus:ring-indigo-500 focus:border-indigo-500";

    return (
        <Modal title={t('leave.modal_title')} isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="leaveType" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('leave.modal_type')}</label>
                    <select id="leaveType" value={type} onChange={e => setType(e.target.value)} className={inputClasses}>
                        {leaveTypes.map(lt => (
                            <option key={lt.value} value={lt.value}>{t(`leave.${lt.labelKey}`)}</option>
                        ))}
                    </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('leave.modal_start_date')}</label>
                        <input type="date" id="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} required className={inputClasses}/>
                    </div>
                     <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('leave.modal_end_date')}</label>
                        <input type="date" id="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} required className={inputClasses}/>
                    </div>
                </div>
                <div>
                     <label htmlFor="reason" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('leave.modal_reason')}</label>
                     <textarea id="reason" rows={3} value={reason} onChange={e => setReason(e.target.value)} required className={inputClasses}></textarea>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                    <button type="button" onClick={onClose} className="bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500 transition-colors">{t('leave.modal_cancel')}</button>
                    <button type="submit" className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">{t('leave.modal_submit')}</button>
                </div>
            </form>
        </Modal>
    );
};

export default LeaveRequestModal;
