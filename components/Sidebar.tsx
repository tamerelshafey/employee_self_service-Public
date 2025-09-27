

import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Employee } from '../types';
// FIX: Added PlusIcon to imports.
import { 
    DashboardIcon, ProfileIcon, LeaveIcon, CompensationIcon, LogoutIcon, 
    ExpenseIcon, PerformanceIcon, DocumentIcon, LearningIcon, AttendanceIcon,
    OnboardingIcon, OffboardingIcon, CareersIcon, DirectoryIcon, TeamIcon, 
    BenefitsIcon, CalendarIcon, RecognitionIcon, CloseIcon, ClipboardCheckIcon,
    PayslipIcon, TasksIcon, PaymentEntryIcon, PettyExpenseIcon, CreateOrderIcon, CreateVisitIcon, PlusIcon
} from './Icons';

interface SidebarProps {
    activePage: string;
    setActivePage: (page: string) => void;
    employee: Employee;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

interface NavItem {
    id: string;
    icon: React.ReactNode;
    allowedRoles?: NonNullable<Employee['role']>[];
}

const navItems: Omit<NavItem, 'label'>[] = [
    { id: 'dashboard', icon: <DashboardIcon /> },
    { id: 'profile', icon: <ProfileIcon /> },
    { id: 'tasks', icon: <TasksIcon /> },
    { id: 'newTask', icon: <PlusIcon /> },
    { id: 'onboarding', icon: <OnboardingIcon /> },
    { id: 'offboarding', icon: <OffboardingIcon />, allowedRoles: ['employee', 'manager', 'director'] },
    { id: 'attendance', icon: <AttendanceIcon /> },
    { id: 'leave', icon: <LeaveIcon /> },
    { id: 'expenses', icon: <ExpenseIcon /> },
    { id: 'compensation', icon: <CompensationIcon />, allowedRoles: ['employee', 'manager', 'director'] },
    { id: 'payslips', icon: <PayslipIcon />, allowedRoles: ['employee', 'manager', 'director'] },
    { id: 'benefits', icon: <BenefitsIcon /> },
    { id: 'performance', icon: <PerformanceIcon />, allowedRoles: ['employee', 'manager', 'director'] },
    { id: 'documents', icon: <DocumentIcon /> },
    { id: 'learning', icon: <LearningIcon /> },
    { id: 'careers', icon: <CareersIcon /> },
    { id: 'recognition', icon: <RecognitionIcon /> },
    { id: 'team', icon: <TeamIcon />, allowedRoles: ['manager', 'director'] },
    { id: 'approvals', icon: <ClipboardCheckIcon />, allowedRoles: ['manager', 'director'] },
    { id: 'orders', icon: <CreateOrderIcon /> },
    { id: 'visits', icon: <CreateVisitIcon /> },
    { id: 'payments', icon: <PaymentEntryIcon /> },
    { id: 'pettyExpense', icon: <PettyExpenseIcon /> },
    { id: 'directory', icon: <DirectoryIcon /> },
    { id: 'calendar', icon: <CalendarIcon /> },
];

const bottomNavIds = new Set(['dashboard', 'leave', 'tasks', 'attendance', 'profile']);

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, employee, isOpen, setIsOpen }) => {
    const { t } = useTranslation();
    
    const handleNavigation = (pageId: string) => {
        setActivePage(pageId);
        setIsOpen(false); // Close sidebar on navigation
    };

    const renderNavLinks = (items: Omit<NavItem, 'label'>[]) => (
        items
            .filter(item => {
                if (!item.allowedRoles) return true; // Visible to all if not specified
                if (!employee.role) return false; // Hide if employee has no role and item requires one
                return item.allowedRoles.includes(employee.role);
            })
            .map(item => (
                <li key={item.id} className="mb-2">
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handleNavigation(item.id);
                        }}
                        className={`flex items-center py-3 px-4 rounded-lg transition-colors duration-200 ${
                            activePage === item.id 
                            ? 'bg-indigo-600 text-white shadow-lg' 
                            : 'hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-700 dark:hover:text-white'
                        }`}
                    >
                        {item.icon}
                        <span className="ms-4 font-medium">{t(`sidebar.${item.id}`)}</span>
                    </a>
                </li>
            ))
    );
    
    return (
        <aside className={`fixed inset-y-0 start-0 w-64 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 flex flex-col z-30 transform transition-transform duration-300 ease-in-out md:relative ${isOpen ? 'translate-x-0' : 'max-md:-translate-x-full max-md:rtl:translate-x-full'} border-e border-slate-200 dark:border-slate-800`}>
            <div className="flex items-center justify-between h-20 border-b border-slate-200 dark:border-slate-700 px-4">
                 <div className="flex items-center">
                    <svg className="w-10 h-10 text-indigo-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    <h1 className="text-xl font-bold ms-2 text-slate-900 dark:text-white">ESS Portal</h1>
                </div>
                <button 
                    className="md:hidden text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white" 
                    onClick={() => setIsOpen(false)}
                    aria-label="Close sidebar"
                >
                    <CloseIcon />
                </button>
            </div>

            <nav className="flex-1 px-4 py-6 overflow-y-auto">
                {/* Desktop nav list */}
                <ul className="hidden md:block">
                    {renderNavLinks(navItems)}
                </ul>
                {/* Mobile nav list (drawer) */}
                <ul className="block md:hidden">
                    {renderNavLinks(navItems.filter(item => !bottomNavIds.has(item.id)))}
                </ul>
            </nav>

            <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                 <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="flex items-center py-3 px-4 rounded-lg hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-700 dark:hover:text-white"
                >
                    <LogoutIcon />
                    <span className="ms-4 font-medium">{t('sidebar.logout')}</span>
                </a>
            </div>
        </aside>
    );
};

export default Sidebar;