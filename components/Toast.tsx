import React, { useEffect } from 'react';

interface ToastProps {
    message: string;
    onClose: () => void;
    type?: 'success' | 'error';
}

const Toast: React.FC<ToastProps> = ({ message, onClose, type = 'success' }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // Auto-close after 3 seconds

        return () => {
            clearTimeout(timer);
        };
    }, [onClose]);

    const baseClasses = "fixed top-20 right-5 z-50 p-4 rounded-lg shadow-lg text-white animate-fade-in-down flex items-center gap-3";
    const typeClasses = type === 'success' ? 'bg-green-500' : 'bg-red-500';

    const Icon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );

    return (
        <div className={`${baseClasses} ${typeClasses}`}>
            <Icon />
            <span>{message}</span>
        </div>
    );
};

export default Toast;
