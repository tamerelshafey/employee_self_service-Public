import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { SendIcon, CloseIcon, SparklesIcon } from './Icons';

interface Message {
    sender: 'user' | 'ai';
    text: string;
}

interface HelpAssistantProps {
    isOpen: boolean;
    onClose: () => void;
}

const HelpAssistant: React.FC<HelpAssistantProps> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'ai', text: "Hello! I'm the ESS Portal assistant. How can I help you today with HR-related questions?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if(isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: currentInput,
                config: {
                   systemInstruction: "You are an expert HR assistant for a company called \"ESS Portal\". Your tone should be helpful, friendly, and professional. Provide concise and accurate answers to employee questions regarding company policies, benefits, leave requests, and other HR-related topics. Do not answer questions outside of the HR scope. If a question is outside of this scope, politely decline to answer.",
                }
            });
            const aiMessage: Message = { sender: 'ai', text: response.text };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            const errorMessage: Message = { sender: 'ai', text: "Sorry, I'm having trouble connecting right now. Please try again later." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-0 right-0 mb-4 mr-4 z-50 w-full max-w-sm">
            <div className="bg-white rounded-xl shadow-2xl flex flex-col h-[60vh] max-h-[700px]">
                <header className="flex items-center justify-between p-4 border-b bg-slate-50 rounded-t-xl">
                     <div className="flex items-center gap-3">
                        <span className="p-2 bg-indigo-100 rounded-full">
                           <SparklesIcon className="w-6 h-6 text-indigo-600" />
                        </span>
                        <h3 className="text-lg font-bold text-slate-800">AI Assistant</h3>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <CloseIcon />
                    </button>
                </header>
                <main className="flex-1 p-4 overflow-y-auto bg-slate-100 space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-slate-200 text-slate-800 rounded-bl-none'}`}>
                                <p className="text-sm break-words">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                     {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-slate-200 text-slate-800 rounded-2xl rounded-bl-none px-4 py-2">
                                <div className="flex items-center justify-center space-x-1">
                                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </main>
                <footer className="p-4 border-t bg-white rounded-b-xl">
                    <div className="flex items-center bg-slate-100 rounded-lg">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask about HR policies..."
                            className="w-full bg-transparent px-4 py-2 text-slate-700 focus:outline-none"
                            disabled={isLoading}
                        />
                        <button onClick={handleSend} disabled={isLoading || !input.trim()} className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-full m-1 disabled:text-slate-400 disabled:hover:bg-transparent transition-colors">
                            <SendIcon className="w-6 h-6"/>
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default HelpAssistant;