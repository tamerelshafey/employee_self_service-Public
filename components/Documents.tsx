

import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Document } from '../types';
import { DownloadIcon } from './Icons';

interface DocumentsProps {
    documents: Document[];
}

const Documents: React.FC<DocumentsProps> = ({ documents }) => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDocuments = useMemo(() => {
        if (!searchTerm) {
            return documents;
        }
        return documents.filter(doc =>
            doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, documents]);

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">{t('documents.title')}</h3>
                <div className="relative w-full sm:w-auto">
                     <input
                        type="text"
                        placeholder={t('documents.search_placeholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full sm:w-64 ps-4 pe-10 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
                    />
                     <svg className="w-5 h-5 text-slate-400 absolute top-1/2 end-3 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                    <thead className="bg-slate-50 dark:bg-slate-700/50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">{t('documents.table_name')}</th>
                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">{t('documents.table_category')}</th>
                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">{t('documents.table_date')}</th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">{t('documents.table_actions')}</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                        {filteredDocuments.map((doc) => (
                            <tr key={doc.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-50">{doc.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{doc.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{doc.uploadDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                    <a href="#" onClick={(e) => e.preventDefault()} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center justify-end gap-2">
                                        <DownloadIcon />
                                        {t('documents.download')}
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {filteredDocuments.length === 0 && (
                    <div className="text-center py-10">
                        <p className="text-slate-500 dark:text-slate-400">{t('documents.empty_message')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Documents;