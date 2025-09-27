

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
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
import Recognition from './components/Recognition';
import Approvals from './components/Approvals';
import Payslips from './components/Payslips';
import Tasks from './components/Tasks';
import Orders from './components/Orders';
import Visits from './components/Visits';
import NewTask from './components/NewTask';
import Payments from './components/Payments';
import PettyExpense from './components/PettyExpense';
import type { Employee, Kudo, LeaveRequest, ExpenseClaim } from './types';
import { NotificationType, LeaveStatus, ExpenseStatus, ApprovalAction } from './types';
import { 
    allEmployees, mockCalendarEvents, mockCompanyValues, mockKudos, mockAnnouncements, mockNotifications, allLeaveRequests, 
    allExpenseClaims, mockLeaveBalances, mockPayslips, mockPerformanceReviews, mockDocuments, mockEnrolledCourses, 
    mockAvailableCourses, mockAttendance, mockOnboardingTasks, mockOffboardingTasks, mockJobOpenings, mockTasks
} from './data';
import HelpAssistant from './components/HelpAssistant';
import { SparklesIcon, MenuIcon, ChevronDownIcon, BellIcon, RecognitionIcon, LeaveIcon, PerformanceIcon, InformationCircleIcon } from './components/Icons';
import BottomNav from './components/BottomNav';
import { timeAgo } from './utils/time-helpers';
import Toast from './components/Toast';
import ThemeToggle from './components/ThemeToggle';
import LanguageSwitcher from './components/LanguageSwitcher';
import LeaveRequestModal from './components/LeaveRequestModal';
import ExpenseClaimModal from './components/ExpenseClaimModal';

const App: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [activePage, setActivePage] = useState('dashboard');
    const [isAssistantOpen, setIsAssistantOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [kudos, setKudos] = useState(mockKudos);
    const [loggedInEmployee, setLoggedInEmployee] = useState<Employee>(allEmployees[0]);
    const [isAccountSwitcherOpen, setIsAccountSwitcherOpen] = useState(false);
    const [notifications, setNotifications] = useState(mockNotifications);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [leaveRequests, setLeaveRequests] = useState(allLeaveRequests);
    const [expenseClaims, setExpenseClaims] = useState(allExpenseClaims);
    const [toastMessage, setToastMessage] = useState('');
    const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('theme') as ('light' | 'dark')) || 'light');
    const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
    
    const switcherRef = useRef<HTMLDivElement>(null);
    const notificationsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);
    
    useEffect(() => {
        document.documentElement.lang = i18n.language;
        document.documentElement.dir = i18n.dir(i18n.language);
    }, [i18n, i18n.language]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (switcherRef.current && !switcherRef.current.contains(event.target as Node)) {
                setIsAccountSwitcherOpen(false);
            }
             if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
                setIsNotificationsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [switcherRef, notificationsRef]);

    const handleNewKudo = (newKudo: Omit<Kudo, 'id' | 'timestamp'>) => {
        const kudo: Kudo = {
            id: `K${(kudos.length + 1).toString().padStart(3, '0')}`,
            ...newKudo,
            timestamp: new Date().toISOString(),
        };
        setKudos([kudo, ...kudos]);
    };
    
    const handleApprovalAction = (itemId: string, itemType: 'leave' | 'expense', action: ApprovalAction) => {
        if (itemType === 'leave') {
            setLeaveRequests(prev => prev.map(req => 
                req.id === itemId ? { ...req, status: action === ApprovalAction.Approve ? LeaveStatus.Approved : LeaveStatus.Rejected } : req
            ));
        } else {
            setExpenseClaims(prev => prev.map(claim => 
                claim.id === itemId ? { ...claim, status: action === ApprovalAction.Approve ? ExpenseStatus.Approved : ExpenseStatus.Rejected } : claim
            ));
        }
        setToastMessage(`Request has been ${action.toLowerCase()}.`);
    };
    
    const handleNewLeaveRequest = (request: Omit<LeaveRequest, 'id' | 'status' | 'employeeId'>) => {
        const newRequest: LeaveRequest = {
            id: `LR${Date.now()}`,
            ...request,
            employeeId: loggedInEmployee.id,
            status: LeaveStatus.Pending,
        };
        setLeaveRequests(prev => [newRequest, ...prev]);
        setIsLeaveModalOpen(false);
        setToastMessage('Leave request submitted successfully!');
    };
    
    const handleNewExpenseClaim = (claim: Omit<ExpenseClaim, 'id' | 'status' | 'employeeId'>) => {
        const newClaim: ExpenseClaim = {
            id: `EC${Date.now()}`,
            ...claim,
            employeeId: loggedInEmployee.id,
            status: ExpenseStatus.Pending,
        };
        setExpenseClaims(prev => [newClaim, ...prev]);
        setIsExpenseModalOpen(false);
        setToastMessage('Expense claim submitted successfully!');
    };

    const userNotifications = useMemo(() => notifications
      .filter(n => n.recipientId === loggedInEmployee.id || n.recipientId === 'all')
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()), [notifications, loggedInEmployee.id]);
      
    const unreadNotificationCount = userNotifications.filter(n => !n.read).length;

    const userLeaveBalance = mockLeaveBalances[loggedInEmployee.id] || [];
    const userLeaveRequests = leaveRequests.filter(r => r.employeeId === loggedInEmployee.id);
    const userExpenseClaims = expenseClaims.filter(c => c.employeeId === loggedInEmployee.id);
    
    const pendingApprovals = useMemo(() => [
        ...leaveRequests.filter(r => r.status === LeaveStatus.Pending).map(r => ({ ...r, itemType: 'leave' as const })),
        ...expenseClaims.filter(c => c.status === ExpenseStatus.Pending).map(c => ({ ...c, itemType: 'expense' as const })),
    ], [leaveRequests, expenseClaims]);

    const handleMarkAsRead = (notificationId: string) => {
        setNotifications(notifications.map(n => n.id === notificationId ? { ...n, read: true } : n));
    };

    const handleMarkAllAsRead = () => {
        setNotifications(notifications.map(n => (n.recipientId === loggedInEmployee.id || n.recipientId === 'all') ? { ...n, read: true } : n));
        setIsNotificationsOpen(false);
    };
    
    const getNotificationIcon = (type: NotificationType) => {
        const iconClass = "w-5 h-5 text-slate-500 dark:text-slate-400";
        switch (type) {
            case NotificationType.Kudos: return <RecognitionIcon className={iconClass} />;
            case NotificationType.LeaveRequest: return <LeaveIcon className={iconClass} />;
            case NotificationType.PerformanceReview: return <PerformanceIcon className={iconClass} />;
            case NotificationType.System: return <InformationCircleIcon className={iconClass} />;
            default: return <BellIcon className={iconClass} />;
        }
    };
    
    const pageComponents: { [key: string]: React.ReactElement } = {
        dashboard: <Dashboard 
            employee={loggedInEmployee} 
            setActivePage={setActivePage}
            pendingApprovalsCount={pendingApprovals.length}
        />,
        profile: <Profile employee={loggedInEmployee} allEmployees={allEmployees} />,
        leave: <Leave 
            leaveBalance={userLeaveBalance}
            userLeaveRequests={userLeaveRequests}
            onNewRequestClick={() => setIsLeaveModalOpen(true)}
        />,
        expenses: <Expenses
            userExpenseClaims={userExpenseClaims}
            onNewClaimClick={() => setIsExpenseModalOpen(true)}
        />,
        compensation: <Compensation employee={loggedInEmployee} />,
        payslips: <Payslips payslips={mockPayslips} />,
        performance: <Performance reviews={mockPerformanceReviews} />,
        documents: <Documents documents={mockDocuments} />,
        learning: <Learning enrolledCourses={mockEnrolledCourses} availableCourses={mockAvailableCourses} />,
        attendance: <Attendance attendanceLog={mockAttendance} />,
        tasks: <Tasks tasks={mockTasks} allEmployees={allEmployees} setActivePage={setActivePage} />,
        onboarding: <Onboarding tasks={mockOnboardingTasks} />,
        offboarding: <Offboarding tasks={mockOffboardingTasks} />,
        careers: <Recruitment jobOpenings={mockJobOpenings} />,
        recognition: <Recognition allKudos={kudos} allEmployees={allEmployees} loggedInEmployee={loggedInEmployee} companyValues={mockCompanyValues} onNewKudo={handleNewKudo} />,
        directory: <Directory allEmployees={allEmployees} />,
        team: <TeamView currentEmployee={loggedInEmployee} allEmployees={allEmployees} />,
        benefits: <Benefits employee={loggedInEmployee} />,
        calendar: <CompanyCalendar events={mockCalendarEvents} />,
        approvals: <Approvals loggedInEmployee={loggedInEmployee} allEmployees={allEmployees} pendingApprovals={pendingApprovals} onAction={handleApprovalAction} />,
        orders: <Orders setActivePage={setActivePage} setToastMessage={setToastMessage} />,
        visits: <Visits setActivePage={setActivePage} setToastMessage={setToastMessage} />,
        newTask: <NewTask allEmployees={allEmployees} loggedInEmployeeId={loggedInEmployee.id} setActivePage={setActivePage} setToastMessage={setToastMessage} />,
        payments: <Payments setActivePage={setActivePage} setToastMessage={setToastMessage} />,
        pettyExpense: <PettyExpense setActivePage={setActivePage} setToastMessage={setToastMessage} />,
    };

    const renderPage = () => {
        return pageComponents[activePage] || pageComponents.dashboard;
    };

    return (
        <div className="relative flex h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 overflow-hidden">
             {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                    aria-hidden="true"
                ></div>
            )}
            
            <Sidebar 
                activePage={activePage} 
                setActivePage={setActivePage} 
                employee={loggedInEmployee}
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
            />
            <main className="flex-1 flex flex-col overflow-hidden h-full">
                <header className="bg-white dark:bg-slate-800/50 dark:border-b dark:border-slate-700 shadow-sm p-4 z-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="md:hidden me-4 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                                aria-label="Open sidebar"
                            >
                                <MenuIcon />
                            </button>
                            <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-50">{t(`page_titles.${activePage}`)}</h1>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-4 rtl:space-x-reverse">
                            <LanguageSwitcher />
                            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                            <div ref={notificationsRef} className="relative">
                                <button
                                    onClick={() => setIsNotificationsOpen(prev => !prev)}
                                    className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                                    aria-label="View notifications"
                                >
                                    <BellIcon />
                                    {unreadNotificationCount > 0 && (
                                        <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
                                    )}
                                </button>
                                {isNotificationsOpen && (
                                    <div className="absolute end-0 mt-2 w-80 md:w-96 bg-white dark:bg-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden border border-slate-200 dark:border-slate-700">
                                        <div className="p-3 flex justify-between items-center bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{t('app_header.notifications')}</p>
                                            {unreadNotificationCount > 0 && (
                                                <button onClick={handleMarkAllAsRead} className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">{t('app_header.mark_all_read')}</button>
                                            )}
                                        </div>
                                        <ul className="max-h-96 overflow-y-auto">
                                            {userNotifications.length > 0 ? (
                                                userNotifications.map(notif => (
                                                    <li key={notif.id} className={`p-3 border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 ${!notif.read ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}`}>
                                                        <div className="flex items-start space-x-3">
                                                            <div className="flex-shrink-0 mt-0.5">
                                                                {getNotificationIcon(notif.type)}
                                                            </div>
                                                            <div className="flex-1">
                                                                <p className="text-sm text-slate-800 dark:text-slate-200">{notif.message}</p>
                                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{timeAgo(notif.timestamp)}</p>
                                                            </div>
                                                            {!notif.read && (
                                                                <button onClick={() => handleMarkAsRead(notif.id)} className="flex-shrink-0 w-2.5 h-2.5 mt-1.5 rounded-full bg-indigo-500 hover:bg-indigo-700" title={t('app_header.mark_read_tooltip')}>
                                                                    <span className="sr-only">{t('app_header.mark_read_tooltip')}</span>
                                                                </button>
                                                            )}
                                                        </div>
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="p-4 text-center text-sm text-slate-500 dark:text-slate-400">{t('app_header.no_notifications')}</li>
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                           <div ref={switcherRef} className="relative">
                                <button onClick={() => setIsAccountSwitcherOpen(prev => !prev)} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                    <img src={loggedInEmployee.avatarUrl} alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-indigo-500" />
                                    <span className="text-end hidden sm:block">
                                        <p className="font-semibold text-sm text-slate-900 dark:text-slate-50">{loggedInEmployee.name}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{loggedInEmployee.position}</p>
                                    </span>
                                    <ChevronDownIcon className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                                </button>
                                {isAccountSwitcherOpen && (
                                    <div className="absolute end-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden border border-slate-200 dark:border-slate-700">
                                        <div className="p-4">
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{t('app_header.signed_in_as')}</p>
                                            <p className="font-semibold text-sm text-slate-800 dark:text-slate-200 truncate">{loggedInEmployee.name}</p>
                                        </div>
                                        <hr className="border-slate-200 dark:border-slate-700" />
                                        <ul className="max-h-72 overflow-y-auto">
                                            {allEmployees.filter(emp => emp.id !== loggedInEmployee.id).map(emp => (
                                                <li key={emp.id}>
                                                    <button
                                                        onClick={() => {
                                                            setLoggedInEmployee(emp);
                                                            setActivePage('dashboard');
                                                            setIsAccountSwitcherOpen(false);
                                                            setIsNotificationsOpen(false);
                                                        }}
                                                        className="w-full text-left flex items-center p-3 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                                    >
                                                        <img src={emp.avatarUrl} alt={emp.name} className="w-10 h-10 rounded-full me-3" />
                                                        <div className="flex-1">
                                                            <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">{emp.name}</p>
                                                            <p className="text-xs text-slate-500 dark:text-slate-400">{emp.position}</p>
                                                        </div>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                           </div>
                        </div>
                    </div>
                </header>
                <div className="flex-1 overflow-y-auto p-6 md:p-8 pb-24 md:pb-8">
                    {renderPage()}
                </div>
            </main>
            
            {toastMessage && (
                <Toast message={toastMessage} onClose={() => setToastMessage('')} />
            )}
            
            <LeaveRequestModal isOpen={isLeaveModalOpen} onClose={() => setIsLeaveModalOpen(false)} onSubmit={handleNewLeaveRequest} />
            <ExpenseClaimModal isOpen={isExpenseModalOpen} onClose={() => setIsExpenseModalOpen(false)} onSubmit={handleNewExpenseClaim} />

            <button
                onClick={() => setIsAssistantOpen(true)}
                className="fixed bottom-20 end-6 z-40 bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 md:bottom-6"
                aria-label="Open AI Assistant"
            >
                <SparklesIcon className="w-6 h-6" />
            </button>
            
            <HelpAssistant isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
            <BottomNav 
                activePage={activePage} 
                setActivePage={setActivePage} 
                onApplyLeaveClick={() => setIsLeaveModalOpen(true)}
                onApplyExpenseClick={() => setIsExpenseModalOpen(true)}
            />
        </div>
    );
};

export default App;
