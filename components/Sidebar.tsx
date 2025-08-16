import React from 'react';
import type { Employee } from '../types';
import { DashboardIcon, ProfileIcon, LeaveIcon, PayslipIcon, LogoutIcon, ExpenseIcon, PerformanceIcon, DocumentIcon, LearningIcon } from './Icons';

interface SidebarProps {
    activePage: string;
    setActivePage: (page: string) => void;
    employee: Employee;
}

const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'profile', label: 'My Profile', icon: <ProfileIcon /> },
    { id: 'leave', label: 'Leave Requests', icon: <LeaveIcon /> },
    { id: 'expenses', label: 'Expense Claims', icon: <ExpenseIcon /> },
    { id: 'payslips', label: 'My Payslips', icon: <PayslipIcon /> },
    { id: 'performance', label: 'Performance', icon: <PerformanceIcon /> },
    { id: 'documents', label: 'Documents', icon: <DocumentIcon /> },
    { id: 'learning', label: 'Learning', icon: <LearningIcon /> },
];

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, employee }) => {
    return (
        <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col transition-all duration-300">
            <div className="flex items-center justify-center h-20 border-b border-slate-800">
                <svg className="w-10 h-10 text-indigo-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                <h1 className="text-xl font-bold ml-2 text-white">ESS Portal</h1>
            </div>

            <nav className="flex-1 px-4 py-6">
                <ul>
                    {navItems.map(item => (
                        <li key={item.id} className="mb-2">
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActivePage(item.id);
                                }}
                                className={`flex items-center py-3 px-4 rounded-lg transition-colors duration-200 ${
                                    activePage === item.id 
                                    ? 'bg-indigo-600 text-white shadow-lg' 
                                    : 'hover:bg-slate-800 hover:text-white'
                                }`}
                            >
                                {item.icon}
                                <span className="ml-4 font-medium">{item.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-4 border-t border-slate-800">
                 <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="flex items-center py-3 px-4 rounded-lg hover:bg-slate-800 hover:text-white"
                >
                    <LogoutIcon />
                    <span className="ml-4 font-medium">Logout</span>
                </a>
            </div>
        </aside>
    );
};

export default Sidebar;