import React, { useState } from 'react';
import { ExpenseClaim, ExpenseStatus } from '../types';
import Modal from './Modal';
import { PlusIcon } from './Icons';

const initialExpenseClaims: ExpenseClaim[] = [
    { id: 'EC001', date: '2024-07-15', description: 'Client lunch meeting', category: 'Meals', amount: 75.50, status: ExpenseStatus.Approved },
    { id: 'EC002', date: '2024-07-18', description: 'Round-trip flight for conference', category: 'Travel', amount: 450.00, status: ExpenseStatus.Pending },
    { id: 'EC003', date: '2024-06-20', description: 'Office supplies purchase', category: 'Supplies', amount: 120.00, status: ExpenseStatus.Approved },
    { id: 'EC004', date: '2024-05-10', description: 'Software subscription renewal', category: 'Software', amount: 49.99, status: ExpenseStatus.Rejected },
];

const Expenses: React.FC = () => {
    const [claims, setClaims] = useState<ExpenseClaim[]>(initialExpenseClaims);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getStatusBadge = (status: ExpenseStatus) => {
        switch (status) {
            case ExpenseStatus.Approved:
                return 'bg-green-100 text-green-800';
            case ExpenseStatus.Pending:
                return 'bg-amber-100 text-amber-800';
            case ExpenseStatus.Rejected:
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-slate-100 text-slate-800';
        }
    };
    
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    const handleNewClaim = (claim: Omit<ExpenseClaim, 'id' | 'status'>) => {
        const newClaim: ExpenseClaim = {
            id: `EC${(claims.length + 1).toString().padStart(3, '0')}`,
            ...claim,
            status: ExpenseStatus.Pending,
        };
        setClaims([newClaim, ...claims]);
        setIsModalOpen(false);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">My Expense Claims</h3>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
                >
                    <PlusIcon />
                    New Claim
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Description</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {claims.map((claim) => (
                            <tr key={claim.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{claim.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 max-w-xs truncate">{claim.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{claim.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">{formatCurrency(claim.amount)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(claim.status)}`}>
                                        {claim.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <ExpenseClaimModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleNewClaim} />
        </div>
    );
};

interface ExpenseClaimModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (claim: Omit<ExpenseClaim, 'id' | 'status'>) => void;
}

const ExpenseClaimModal: React.FC<ExpenseClaimModalProps> = ({ isOpen, onClose, onSubmit }) => {
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
    
    return (
        <Modal title="New Expense Claim" isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                 <div>
                    <label htmlFor="date" className="block text-sm font-medium text-slate-700">Date of Expense</label>
                    <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"/>
                </div>
                 <div>
                    <label htmlFor="category" className="block text-sm font-medium text-slate-700">Category</label>
                    <select id="category" value={category} onChange={e => setCategory(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        <option>Travel</option>
                        <option>Meals</option>
                        <option>Supplies</option>
                        <option>Software</option>
                        <option>Other</option>
                    </select>
                </div>
                 <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-slate-700">Amount ($)</label>
                    <input type="number" id="amount" value={amount} onChange={e => setAmount(e.target.value)} required min="0.01" step="0.01" placeholder="0.00" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"/>
                </div>
                <div>
                     <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
                     <textarea id="description" rows={3} value={description} onChange={e => setDescription(e.target.value)} required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"></textarea>
                </div>
                <div>
                     <label htmlFor="receipt" className="block text-sm font-medium text-slate-700">Attach Receipt</label>
                     <input type="file" id="receipt" className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                    <button type="button" onClick={onClose} className="bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors">Cancel</button>
                    <button type="submit" className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">Submit Claim</button>
                </div>
            </form>
        </Modal>
    );
};

export default Expenses;