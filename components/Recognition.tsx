
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GoogleGenAI } from "@google/genai";
import { type Kudo, type Employee, CompanyValue } from '../types';
import Modal from './Modal';
import { PlusIcon, SparklesIcon, SpinnerIcon } from './Icons';

interface RecognitionProps {
    allKudos: Kudo[];
    allEmployees: Employee[];
    loggedInEmployee: Employee;
    companyValues: CompanyValue[];
    onNewKudo: (newKudo: Omit<Kudo, 'id' | 'timestamp'>) => void;
}

const KudoCard: React.FC<{ kudo: Kudo, sender?: Employee, receiver?: Employee }> = ({ kudo, sender, receiver }) => {
    const { t } = useTranslation();
    const valueColors: Record<CompanyValue, string> = {
        [CompanyValue.Teamwork]: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
        [CompanyValue.Innovation]: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
        [CompanyValue.CustomerFocus]: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
        [CompanyValue.Integrity]: 'bg-slate-200 text-slate-800 dark:bg-slate-600 dark:text-slate-200',
        [CompanyValue.Excellence]: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md space-y-4 flex flex-col justify-between">
            <div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={sender?.avatarUrl} alt={sender?.name} className="w-12 h-12 rounded-full" />
                    <div>
                        <p className="font-bold text-slate-900 dark:text-slate-50">{sender?.name}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{t('recognition.recognized')}</p>
                    </div>
                    <img src={receiver?.avatarUrl} alt={receiver?.name} className="w-12 h-12 rounded-full" />
                     <div>
                        <p className="font-bold text-slate-900 dark:text-slate-50">{receiver?.name}</p>
                    </div>
                </div>
                <p className="text-slate-700 dark:text-slate-300 italic mt-4">"{kudo.message}"</p>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-slate-200 dark:border-slate-700">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${valueColors[kudo.value]}`}>
                    #{kudo.value}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500">{new Date(kudo.timestamp).toLocaleDateString()}</span>
            </div>
        </div>
    );
}

const Recognition: React.FC<RecognitionProps> = ({ allKudos, allEmployees, loggedInEmployee, companyValues, onNewKudo }) => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const sortedKudos = useMemo(() => {
        return [...allKudos].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }, [allKudos]);

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{t('recognition.title')}</h3>
                    <p className="mt-1 text-slate-600 dark:text-slate-400">{t('recognition.subtitle')}</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex w-full sm:w-auto items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
                >
                    <PlusIcon />
                    {t('recognition.give_kudos')}
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedKudos.map(kudo => {
                    const sender = allEmployees.find(e => e.id === kudo.senderId);
                    const receiver = allEmployees.find(e => e.id === kudo.receiverId);
                    return <KudoCard key={kudo.id} kudo={kudo} sender={sender} receiver={receiver} />;
                })}
            </div>

            <KudoModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                employees={allEmployees.filter(e => e.id !== loggedInEmployee.id)}
                senderId={loggedInEmployee.id}
                companyValues={companyValues}
                onSubmit={onNewKudo}
            />
        </div>
    );
};

interface KudoModalProps {
    isOpen: boolean;
    onClose: () => void;
    employees: Employee[];
    senderId: string;
    companyValues: CompanyValue[];
    onSubmit: (newKudo: Omit<Kudo, 'id' | 'timestamp'>) => void;
}

const KudoModal: React.FC<KudoModalProps> = ({ isOpen, onClose, employees, senderId, companyValues, onSubmit }) => {
    const { t } = useTranslation();
    const [receiverId, setReceiverId] = useState('');
    const [message, setMessage] = useState('');
    const [value, setValue] = useState<CompanyValue | null>(null);
    const [keywords, setKeywords] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateKudo = async () => {
        if (!keywords || !receiverId || !value) {
            alert("Please select a colleague, a value, and provide some keywords first.");
            return;
        }
        setIsGenerating(true);
        setMessage('');

        try {
            const receiverName = employees.find(e => e.id === receiverId)?.name || 'a colleague';
            const prompt = `Write a short, positive, and professional kudo message for ${receiverName}. They demonstrated the company value of "${value}". The context is: "${keywords}". The message should be enthusiastic, about 2-3 sentences long, and directly praise their specific action. Do not use hashtags.`;

            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            
            setMessage(response.text.trim());

        } catch (error) {
            console.error("Error generating kudo:", error);
            alert("Sorry, I couldn't generate a message right now. Please try again or write your own.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!receiverId || !message || !value) {
            alert("Please fill out all fields.");
            return;
        }
        onSubmit({ senderId, receiverId, message, value });
        setReceiverId('');
        setMessage('');
        setValue(null);
        setKeywords('');
        onClose();
    };
    
    const inputClasses = "mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200";

    return (
        <Modal title={t('recognition.modal_title')} isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="receiver" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('recognition.modal_receiver_label')}</label>
                    <select id="receiver" value={receiverId} onChange={e => setReceiverId(e.target.value)} required className={inputClasses}>
                        <option value="" disabled>{t('recognition.modal_receiver_placeholder')}</option>
                        {employees.map(e => <option key={e.id} value={e.id}>{e.name} - {e.department}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('recognition.modal_value_label')}</label>
                    <div className="flex flex-wrap gap-2">
                        {companyValues.map(v => (
                            <button
                                key={v}
                                type="button"
                                onClick={() => setValue(v)}
                                className={`px-3 py-1.5 text-sm font-semibold rounded-full border transition-colors ${value === v ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700'}`}
                            >
                                #{v}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label htmlFor="keywords" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        {t('recognition.modal_keywords_label')}
                    </label>
                    <input
                        type="text"
                        id="keywords"
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        placeholder={t('recognition.modal_keywords_placeholder')}
                        className={inputClasses}
                    />
                </div>
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            {t('recognition.modal_message_label')}
                        </label>
                        <button
                            type="button"
                            onClick={handleGenerateKudo}
                            disabled={isGenerating || !keywords || !receiverId || !value}
                            className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800 disabled:text-slate-400 disabled:cursor-not-allowed dark:text-indigo-400 dark:hover:text-indigo-300 dark:disabled:text-slate-500 transition-colors"
                        >
                            {isGenerating ? (
                                <>
                                    <SpinnerIcon className="w-4 h-4" />
                                    {t('recognition.modal_generating_button')}
                                </>
                            ) : (
                                <>
                                    <SparklesIcon className="w-4 h-4" />
                                    {t('recognition.modal_generate_button')}
                                </>
                            )}
                        </button>
                    </div>
                    <textarea 
                        id="message" 
                        rows={4} 
                        value={message} 
                        onChange={e => setMessage(e.target.value)} 
                        required 
                        placeholder={t('recognition.modal_message_placeholder')}
                        className={inputClasses}></textarea>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                    <button type="button" onClick={onClose} className="bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500 transition-colors">{t('recognition.modal_cancel')}</button>
                    <button type="submit" className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">{t('recognition.modal_submit')}</button>
                </div>
            </form>
        </Modal>
    );
}

export default Recognition;