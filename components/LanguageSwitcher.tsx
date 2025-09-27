import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: 'en' | 'ar') => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-700 rounded-full p-1">
            <button
                onClick={() => changeLanguage('en')}
                className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${
                    i18n.language === 'en' ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-900' : 'text-slate-600 dark:text-slate-300'
                }`}
                aria-pressed={i18n.language === 'en'}
            >
                EN
            </button>
            <button
                onClick={() => changeLanguage('ar')}
                className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${
                    i18n.language === 'ar' ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-900' : 'text-slate-600 dark:text-slate-300'
                }`}
                aria-pressed={i18n.language === 'ar'}
            >
                AR
            </button>
        </div>
    );
};

export default LanguageSwitcher;
