
import React, { useState } from 'react';
import { LeaveRequest, LeaveStatus } from '../types';
import Modal from './Modal';
import { PlusIcon } from './Icons';

const initialLeaveRequests: LeaveRequest[] = [
    { id: 'LR001', type: 'Annual Leave', startDate: '2024-08-01', endDate: '2024-08-05', reason: 'Family vacation', status: LeaveStatus.Approved },
    { id: 'LR002', type: 'Sick Leave', startDate: '2024-07-22', endDate: '2024-07-22', reason: 'Flu', status: LeaveStatus.Approved },
    { id: 'LR003', type: 'Personal Leave', startDate: '2024-09-10', endDate: '2024-09-12', reason: 'Personal matters', status: LeaveStatus.Pending },
    { id: 'LR004', type: 'Annual Leave', startDate: '2024-06-15', endDate: '2024-06-16', reason: 'Weekend trip', status: LeaveStatus.Rejected },
];

const Leave: React.FC = () => {
    const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(initialLeaveRequests);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getStatusBadge = (status: LeaveStatus) => {
        switch (status) {
            case LeaveStatus.Approved:
                return 'bg-green-100 text-green-800';
            case LeaveStatus.Pending:
                return 'bg-amber-100 text-amber-800';
            case LeaveStatus.Rejected:
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-slate-100 text-slate-800';
        }
    };

    const handleNewRequest = (request: Omit<LeaveRequest, 'id' | 'status'>) => {
        const newRequest: LeaveRequest = {
            id: `LR${(leaveRequests.length + 1).toString().padStart(3, '0')}`,
            ...request,
            status: LeaveStatus.Pending,
        };
        setLeaveRequests([newRequest, ...leaveRequests]);
        setIsModalOpen(false);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">My Leave History</h3>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
                >
                    <PlusIcon />
                    New Request
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Dates</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Reason</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {leaveRequests.map((request) => (
                            <tr key={request.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{request.type}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{request.startDate} to {request.endDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 max-w-xs truncate">{request.reason}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(request.status)}`}>
                                        {request.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <LeaveRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleNewRequest} />
        </div>
    );
};

interface LeaveRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (request: Omit<LeaveRequest, 'id' | 'status'>) => void;
}

const LeaveRequestModal: React.FC<LeaveRequestModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [type, setType] = useState('Annual Leave');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!startDate || !endDate || !reason) return;
        onSubmit({ type, startDate, endDate, reason });
    };
    
    return (
        <Modal title="New Leave Request" isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="leaveType" className="block text-sm font-medium text-slate-700">Leave Type</label>
                    <select id="leaveType" value={type} onChange={e => setType(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        <option>Annual Leave</option>
                        <option>Sick Leave</option>
                        <option>Personal Leave</option>
                        <option>Unpaid Leave</option>
                    </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-slate-700">Start Date</label>
                        <input type="date" id="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"/>
                    </div>
                     <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-slate-700">End Date</label>
                        <input type="date" id="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"/>
                    </div>
                </div>
                <div>
                     <label htmlFor="reason" className="block text-sm font-medium text-slate-700">Reason</label>
                     <textarea id="reason" rows={3} value={reason} onChange={e => setReason(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"></textarea>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                    <button type="button" onClick={onClose} className="bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors">Cancel</button>
                    <button type="submit" className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">Submit Request</button>
                </div>
            </form>
        </Modal>
    );
};

export default Leave;
