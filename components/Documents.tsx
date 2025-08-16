import React, { useState, useMemo } from 'react';
import { Document, DocumentCategory } from '../types';
import { DownloadIcon } from './Icons';

const mockDocuments: Document[] = [
    { id: 'DOC001', name: 'Employment Contract.pdf', category: DocumentCategory.Contracts, uploadDate: '2022-01-15' },
    { id: 'DOC002', name: 'Employee Handbook_v3.pdf', category: DocumentCategory.Policies, uploadDate: '2023-01-01' },
    { id: 'DOC003', name: 'W4_2024.pdf', category: DocumentCategory.TaxForms, uploadDate: '2024-01-20' },
    { id: 'DOC004', name: 'Direct Deposit Form.pdf', category: DocumentCategory.Personal, uploadDate: '2022-01-16' },
    { id: 'DOC005', name: 'Performance Review Q4_2023.pdf', category: DocumentCategory.Personal, uploadDate: '2024-01-10' },
    { id: 'DOC006', name: 'Remote Work Policy.pdf', category: DocumentCategory.Policies, uploadDate: '2023-05-11' },
    { id: 'DOC007', name: 'Stock Option Grant.pdf', category: DocumentCategory.Contracts, uploadDate: '2023-07-01' },
];

const Documents: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDocuments = useMemo(() => {
        if (!searchTerm) {
            return mockDocuments;
        }
        return mockDocuments.filter(doc =>
            doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h3 className="text-xl font-bold">My Documents</h3>
                <div className="relative w-full sm:w-auto">
                     <input
                        type="text"
                        placeholder="Search documents..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full sm:w-64 pl-4 pr-10 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                     <svg className="w-5 h-5 text-slate-400 absolute top-1/2 right-3 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Document Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date Uploaded</th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {filteredDocuments.map((doc) => (
                            <tr key={doc.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{doc.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{doc.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{doc.uploadDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <a href="#" onClick={(e) => e.preventDefault()} className="text-indigo-600 hover:text-indigo-900 flex items-center justify-end gap-2">
                                        <DownloadIcon />
                                        Download
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {filteredDocuments.length === 0 && (
                    <div className="text-center py-10">
                        <p className="text-slate-500">No documents found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Documents;
