import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Leave from './components/Leave';
import Compensation from './components/Compensation';
import Expenses from './components/Expenses';
import Performance from './components/Performance';
import Documents from './components/Documents';
import Learning from './components/Learning';
import Attendance from './components/Attendance';
import Onboarding from './components/Onboarding';
import Offboarding from './components/Offboarding';
import Recruitment from './components/Recruitment';
import Directory from './components/Directory';
import TeamView from './components/TeamView';
import Benefits from './components/Benefits';
import CompanyCalendar from './components/CompanyCalendar';
import type { Employee, CalendarEvent } from './types';
import HelpAssistant from './components/HelpAssistant';
import { SparklesIcon } from './components/Icons';

const allEmployees: Employee[] = [
    {
        id: 'E4521', name: 'Alex Doe', position: 'Senior Frontend Engineer', department: 'Technology',
        email: 'alex.doe@example.com', phone: '+1 (555) 123-4567', address: '123 Tech Way, Silicon Valley, CA 94105',
        avatarUrl: `https://i.pravatar.cc/150?u=E4521`, managerId: 'E9876', role: 'employee',
        compensation: { salary: 120000, lastBonus: { amount: 15000, date: '2024-01-15' } },
        benefits: {
            medical: { planName: 'PPO Gold', coverageTier: 'Employee + Spouse', costPerPaycheck: 180 },
            dental: { planName: 'DentalPlus', coverageTier: 'Employee + Spouse', costPerPaycheck: 25 },
            vision: { planName: 'VisionPro', coverageTier: 'Employee + Spouse', costPerPaycheck: 10 },
            retirement: { contributionRate: 6, employerMatch: '100% up to 4%', balance: 52340 }
        }
    },
    {
        id: 'E9876', name: 'Jane Smith', position: 'Engineering Manager', department: 'Technology',
        email: 'jane.smith@example.com', phone: '+1 (555) 987-6543', address: '456 Code Lane, Silicon Valley, CA 94105',
        avatarUrl: `https://i.pravatar.cc/150?u=E9876`, managerId: 'E1122', role: 'manager',
        compensation: { salary: 160000, lastBonus: { amount: 25000, date: '2024-01-15' } },
        benefits: {
            medical: { planName: 'HMO Platinum', coverageTier: 'Family', costPerPaycheck: 250 },
            dental: { planName: 'DentalPlus', coverageTier: 'Family', costPerPaycheck: 40 },
            vision: { planName: 'VisionPro Max', coverageTier: 'Family', costPerPaycheck: 15 },
            retirement: { contributionRate: 8, employerMatch: '100% up to 5%', balance: 110500 }
        }
    },
    {
        id: 'E1122', name: 'Robert Brown', position: 'Director of Engineering', department: 'Technology',
        email: 'robert.brown@example.com', phone: '+1 (555) 112-2334', address: '789 App Ave, Silicon Valley, CA 94105',
        avatarUrl: `https://i.pravatar.cc/150?u=E1122`, role: 'manager',
        compensation: { salary: 220000, lastBonus: { amount: 40000, date: '2024-01-15' } },
         benefits: {
            medical: { planName: 'HMO Platinum', coverageTier: 'Family', costPerPaycheck: 250 },
            dental: { planName: 'DentalPlus', coverageTier: 'Family', costPerPaycheck: 40 },
            vision: { planName: 'VisionPro Max', coverageTier: 'Family', costPerPaycheck: 15 },
            retirement: { contributionRate: 10, employerMatch: '100% up to 5%', balance: 250000 }
        }
    },
    {
        id: 'E7364', name: 'Emily White', position: 'UI/UX Designer', department: 'Design',
        email: 'emily.white@example.com', phone: '+1 (555) 736-4555', address: '101 Design St, San Francisco, CA 94102',
        avatarUrl: `https://i.pravatar.cc/150?u=E7364`, managerId: 'E8455',
        compensation: { salary: 95000, lastBonus: { amount: 10000, date: '2024-01-15' } },
        benefits: {
            medical: { planName: 'PPO Gold', coverageTier: 'Employee Only', costPerPaycheck: 90 },
            dental: { planName: 'DentalBasic', coverageTier: 'Employee Only', costPerPaycheck: 12 },
            vision: { planName: 'VisionPro', coverageTier: 'Employee Only', costPerPaycheck: 5 },
            retirement: { contributionRate: 5, employerMatch: '100% up to 4%', balance: 28000 }
        }
    },
    {
        id: 'E8455', name: 'Michael Green', position: 'Design Lead', department: 'Design',
        email: 'michael.green@example.com', phone: '+1 (555) 845-5666', address: '202 Creative Blvd, San Francisco, CA 94102',
        avatarUrl: `https://i.pravatar.cc/150?u=E8455`, role: 'manager',
        compensation: { salary: 140000, lastBonus: { amount: 20000, date: '2024-01-15' } },
        benefits: {
            medical: { planName: 'PPO Gold', coverageTier: 'Family', costPerPaycheck: 280 },
            dental: { planName: 'DentalPlus', coverageTier: 'Family', costPerPaycheck: 40 },
            vision: { planName: 'VisionPro Max', coverageTier: 'Family', costPerPaycheck: 15 },
            retirement: { contributionRate: 7, employerMatch: '100% up to 5%', balance: 95000 }
        }
    },
     {
        id: 'E5555', name: 'Sarah Jones', position: 'Backend Engineer', department: 'Technology',
        email: 'sarah.jones@example.com', phone: '+1 (555) 555-5555', address: '303 Data Dr, Silicon Valley, CA 94105',
        avatarUrl: `https://i.pravatar.cc/150?u=E5555`, managerId: 'E9876',
        compensation: { salary: 115000, lastBonus: { amount: 14000, date: '2024-01-15' } },
        benefits: {
            medical: { planName: 'PPO Gold', coverageTier: 'Employee Only', costPerPaycheck: 90 },
            dental: { planName: 'DentalPlus', coverageTier: 'Employee Only', costPerPaycheck: 15 },
            vision: { planName: 'VisionPro', coverageTier: 'Employee Only', costPerPaycheck: 5 },
            retirement: { contributionRate: 5, employerMatch: '100% up to 4%', balance: 45000 }
        }
    },
     {
        id: 'E6666', name: 'David Lee', position: 'Product Manager', department: 'Product',
        email: 'david.lee@example.com', phone: '+1 (555) 666-6666', address: '404 Feature Rd, San Francisco, CA 94102',
        avatarUrl: `https://i.pravatar.cc/150?u=E6666`, managerId: 'E8455',
        compensation: { salary: 130000, lastBonus: { amount: 18000, date: '2024-01-15' } },
        benefits: {
            medical: { planName: 'HMO Platinum', coverageTier: 'Employee + Family', costPerPaycheck: 250 },
            dental: { planName: 'DentalPlus', coverageTier: 'Employee + Family', costPerPaycheck: 40 },
            vision: { planName: 'VisionPro', coverageTier: 'Employee + Family', costPerPaycheck: 15 },
            retirement: { contributionRate: 8, employerMatch: '100% up to 5%', balance: 88000 }
        }
    },
];

const mockCalendarEvents: CalendarEvent[] = [
    { date: '2024-01-01', title: 'New Year\'s Day', type: 'holiday' },
    { date: '2024-05-27', title: 'Memorial Day', type: 'holiday' },
    { date: '2024-07-04', title: 'Independence Day', type: 'holiday' },
    { date: '2024-08-15', title: 'Summer Picnic', type: 'event' },
    { date: '2024-09-02', title: 'Labor Day', type: 'holiday' },
    { date: '2024-10-31', title: 'Halloween Party', type: 'event' },
    { date: '2024-11-28', title: 'Thanksgiving Day', type: 'holiday' },
    { date: '2024-11-29', title: 'Day after Thanksgiving', type: 'holiday' },
    { date: '2024-12-20', title: 'Company Town Hall', type: 'event' },
    { date: '2024-12-24', title: 'Christmas Eve', type: 'holiday' },
    { date: '2024-12-25', title: 'Christmas Day', type: 'holiday' },
];


const loggedInEmployee = allEmployees[0];

const pageTitles: { [key: string]: string } = {
    dashboard: 'Dashboard',
    profile: 'My Profile',
    leave: 'Leave Requests',
    expenses: 'Expense Claims',
    compensation: 'Compensation',
    performance: 'Performance Review',
    documents: 'Document Management',
    learning: 'Learning & Development',
    attendance: 'Attendance Tracking',
    onboarding: 'Onboarding Checklist',
    offboarding: 'Offboarding Checklist',
    careers: 'Careers & Referrals',
    directory: 'Company Directory',
    team: 'My Team',
    benefits: 'My Benefits',
    calendar: 'Company Calendar',
};

const App: React.FC = () => {
    const [activePage, setActivePage] = useState('dashboard');
    const [isAssistantOpen, setIsAssistantOpen] = useState(false);

    const renderPage = () => {
        switch (activePage) {
            case 'dashboard':
                return <Dashboard employee={loggedInEmployee} setActivePage={setActivePage} />;
            case 'profile':
                return <Profile employee={loggedInEmployee} />;
            case 'leave':
                return <Leave />;
            case 'expenses':
                return <Expenses />;
            case 'compensation':
                return <Compensation employee={loggedInEmployee} />;
            case 'performance':
                return <Performance />;
            case 'documents':
                return <Documents />;
            case 'learning':
                return <Learning />;
            case 'attendance':
                return <Attendance />;
            case 'onboarding':
                return <Onboarding />;
            case 'offboarding':
                return <Offboarding />;
            case 'careers':
                return <Recruitment />;
            case 'directory':
                return <Directory allEmployees={allEmployees} />;
            case 'team':
                return <TeamView currentEmployee={loggedInEmployee} allEmployees={allEmployees} />;
            case 'benefits':
                return <Benefits employee={loggedInEmployee} />;
            case 'calendar':
                return <CompanyCalendar events={mockCalendarEvents} />;
            default:
                return <Dashboard employee={loggedInEmployee} setActivePage={setActivePage} />;
        }
    };

    return (
        <div className="flex h-screen bg-slate-100 text-slate-800">
            <Sidebar activePage={activePage} setActivePage={setActivePage} employee={loggedInEmployee} />
            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm p-4 z-10">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-slate-900">{pageTitles[activePage]}</h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-right">
                                <p className="font-semibold">{loggedInEmployee.name}</p>
                                <p className="text-sm text-slate-500">{loggedInEmployee.position}</p>
                            </span>
                            <img src={loggedInEmployee.avatarUrl} alt="User Avatar" className="w-12 h-12 rounded-full border-2 border-indigo-500" />
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