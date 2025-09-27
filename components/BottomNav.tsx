

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
    DashboardIcon, TasksIcon, ProfileIcon, PlusIcon, CloseIcon,
    ApplyExpenseIcon, ApplyLeaveIcon, CreateOrderIcon, CreateVisitIcon, PaymentEntryIcon, PettyExpenseIcon
} from './Icons';

interface BottomNavProps {
    activePage: string;
    setActivePage: (page: string) => void;
    onApplyLeaveClick: () => void;
    onApplyExpenseClick: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activePage, setActivePage, onApplyLeaveClick, onApplyExpenseClick }) => {
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const navItems = [
        { id: 'dashboard', label: t('bottom_nav.home'), icon: DashboardIcon },
        { id: 'tasks', label: t('bottom_nav.tasks'), icon: TasksIcon },
        { id: 'updates', label: t('bottom_nav.updates', {defaultValue: 'Updates'}), icon: TasksIcon }, // Placeholder
        { id: 'profile', label: t('bottom_nav.profile'), icon: ProfileIcon },
    ];
    
    const actionItems = [
        { id: 'expenses', label: t('quick_actions.apply_expense'), icon: ApplyExpenseIcon, action: onApplyExpenseClick },
        { id: 'leave', label: t('quick_actions.apply_leave'), icon: ApplyLeaveIcon, action: onApplyLeaveClick },
        { id: 'orders', label: t('quick_actions.create_order'), icon: CreateOrderIcon, action: () => setActivePage('orders') },
        { id: 'visits', label: t('quick_actions.create_visit'), icon: CreateVisitIcon, action: () => setActivePage('visits') },
        { id: 'newTask', label: t('quick_actions.create_task'), icon: TasksIcon, action: () => setActivePage('newTask') },
        { id: 'payments', label: t('quick_actions.payment_entry'), icon: PaymentEntryIcon, action: () => setActivePage('payments') },
        { id: 'pettyExpense', label: t('quick_actions.petty_expense'), icon: PettyExpenseIcon, action: () => setActivePage('pettyExpense') },
    ];

    const handleActionClick = (action: () => void) => {
        action();
        setIsMenuOpen(false);
    }
    
    const NavButton: React.FC<{item: (typeof navItems)[0]}> = ({ item }) => (
         <button
            onClick={() => setActivePage(item.id)}
            aria-current={activePage === item.id ? 'page' : undefined}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
                activePage === item.id 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400'
            }`}
        >
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{item.label}</span>
        </button>
    );

    return (
        <>
            {/* Overlay */}
            {isMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 z-30 md:hidden"
                    onClick={() => setIsMenuOpen(false)}
                    aria-hidden="true"
                ></div>
            )}
            
            <div className="fixed bottom-0 left-0 right-0 z-40 h-24 md:hidden">
                <nav className="absolute bottom-0 left-0 right-0 h-16 bg-white dark:bg-slate-800 shadow-[0_-1px_4px_rgba(0,0,0,0.08)] flex justify-around items-center z-20 border-t border-slate-200 dark:border-slate-700 rounded-t-2xl">
                    <div className="flex justify-around items-center w-full">
                        <NavButton item={navItems[0]} />
                        <NavButton item={navItems[1]} />
                        <div className="w-24"></div> {/* Spacer for FAB */}
                        <NavButton item={navItems[2]} />
                        <NavButton item={navItems[3]} />
                    </div>
                </nav>
                
                {/* Concave notch shape - uses page background color to create cutout illusion */}
                <div
                    className="absolute top-[16px] left-1/2 -translate-x-1/2 w-24 h-12 bg-slate-50 dark:bg-slate-900 z-20"
                    style={{ borderRadius: '0 0 48px 48px' }}
                    aria-hidden="true"
                ></div>


                 {/* Action Menu */}
                <div 
                    className={`absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-end gap-3 transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    style={{ transform: `translateX(-50%) ${isMenuOpen ? 'translateY(0)' : 'translateY(20px)'}` }}
                >
                    <div className="bg-white dark:bg-slate-700 p-2 rounded-xl shadow-lg w-60">
                        {actionItems.map((item) => (
                             <button
                                key={item.id}
                                onClick={() => handleActionClick(item.action)}
                                className="w-full flex items-center gap-4 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600/50 p-3 rounded-lg text-sm font-semibold whitespace-nowrap"
                            >
                                <item.icon className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
                                <span>{item.label}</span>
                                <ChevronRightIcon className="w-5 h-5 text-slate-400 ms-auto" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* FAB */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full text-white shadow-lg transition-all duration-300 ease-in-out flex items-center justify-center z-40 ${isMenuOpen ? 'bg-red-500 rotate-90' : 'bg-blue-600 hover:bg-blue-700'}`}
                    aria-haspopup="true"
                    aria-expanded={isMenuOpen}
                    aria-label="Open quick actions menu"
                >
                    <div className="relative w-7 h-7">
                        <PlusIcon className={`absolute inset-0 transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0 scale-50 rotate-90' : 'opacity-100 scale-100 rotate-0'}`} />
                        <CloseIcon className={`absolute inset-0 transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90'}`} />
                    </div>
                </button>
            </div>
        </>
    );
};

// Dummy ChevronRightIcon for the menu items as it was not in the original Icons file
const ChevronRightIcon: React.FC<{className?: string}> = ({ className="w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
);


export default BottomNav;