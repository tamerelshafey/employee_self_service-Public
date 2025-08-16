import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Leave from './components/Leave';
import Payslips from './components/Payslips';
import Expenses from './components/Expenses';
import Performance from './components/Performance';
import Documents from './components/Documents';
import Learning from './components/Learning';
import type { Employee } from './types';
import HelpAssistant from './components/HelpAssistant';
import { SparklesIcon } from './components/Icons';

const mockEmployee: Employee = {
    id: 'E4521',
    name: 'Alex Doe',
    position: 'Senior Frontend Engineer',
    department: 'Technology',
    email: 'alex.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Way, Silicon Valley, CA 94105',
    avatarUrl: 'https://picsum.photos/200',
};

const pageTitles: { [key: string]: string } = {
    dashboard: 'Dashboard',
    profile: 'My Profile',
    leave: 'Leave Requests',
    expenses: 'Expense Claims',
    payslips: 'My Payslips',
    performance: 'Performance Review',
    documents: 'Document Management',
    learning: 'Learning & Development',
};

const App: React.FC = () => {
    const [activePage, setActivePage] = useState('dashboard');
    const [isAssistantOpen, setIsAssistantOpen] = useState(false);

    const renderPage = () => {
        switch (activePage) {
            case 'dashboard':
                return <Dashboard employee={mockEmployee} setActivePage={setActivePage} />;
            case 'profile':
                return <Profile employee={mockEmployee} />;
            case 'leave':
                return <Leave />;
            case 'expenses':
                return <Expenses />;
            case 'payslips':
                return <Payslips />;
            case 'performance':
                return <Performance />;
            case 'documents':
                return <Documents />;
            case 'learning':
                return <Learning />;
            default:
                return <Dashboard employee={mockEmployee} setActivePage={setActivePage} />;
        }
    };

    return (
        <div className="flex h-screen bg-slate-100 text-slate-800">
            <Sidebar activePage={activePage} setActivePage={setActivePage} employee={mockEmployee} />
            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm p-4 z-10">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-slate-900">{pageTitles[activePage]}</h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-right">
                                <p className="font-semibold">{mockEmployee.name}</p>
                                <p className="text-sm text-slate-500">{mockEmployee.position}</p>
                            </span>
                            <img src={mockEmployee.avatarUrl} alt="User Avatar" className="w-12 h-12 rounded-full border-2 border-indigo-500" />
                        </div>
                    </div>
                </header>
                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                    {renderPage()}
                </div>
            </main>

            <button
                onClick={() => setIsAssistantOpen(true)}
                className="fixed bottom-6 right-6 z-40 bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-label="Open AI Assistant"
            >
                <SparklesIcon className="w-6 h-6" />
            </button>
            
            <HelpAssistant isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
        </div>
    );
};

export default App;