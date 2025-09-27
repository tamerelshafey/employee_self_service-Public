import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import Modal from './Modal';
import { SparklesIcon, SpinnerIcon } from './Icons';
import type { DashboardLayout, DashboardWidget } from '../types';

interface DashboardCustomizeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLayoutSave: (newLayout: DashboardLayout) => void;
}

const allWidgets: DashboardWidget[] = ['recognition', 'quickActions', 'announcements'];

const DashboardCustomizeModal: React.FC<DashboardCustomizeModalProps> = ({ isOpen, onClose, onLayoutSave }) => {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError('Please enter a description of your desired layout.');
            return;
        }
        setIsLoading(true);
        setError('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const schema = {
                type: Type.OBJECT,
                properties: {
                    left: {
                        type: Type.ARRAY,
                        description: `Widgets for the main (left) column. Must be an array of strings from this list: ${allWidgets.join(', ')}.`,
                        items: { type: Type.STRING }
                    },
                    right: {
                        type: Type.ARRAY,
                        description: `Widgets for the sidebar (right) column. Must be an array of strings from this list: ${allWidgets.join(', ')}.`,
                        items: { type: Type.STRING }
                    }
                },
                required: ['left', 'right']
            };

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `You are a dashboard layout generator. Based on the user's request, create a JSON object that arranges the following widgets: 'recognition', 'quickActions', 'announcements'. The dashboard has two columns: a main 'left' column (wider) and a 'right' column (narrower). Assign each widget to either the 'left' or 'right' array. You can also change the order of widgets within a column. Ensure all three widgets are present in the final layout, distributed between the 'left' and 'right' columns, with no duplicates. User request: "${prompt}"`,
                config: {
                    responseMimeType: 'application/json',
                    responseSchema: schema,
                }
            });
            
            const jsonStr = response.text.trim();
            const newLayout = JSON.parse(jsonStr) as DashboardLayout;

            // Validate the response
            const receivedWidgets = [...newLayout.left, ...newLayout.right];
            const uniqueWidgets = new Set(receivedWidgets);
            
            if (uniqueWidgets.size !== allWidgets.length || !allWidgets.every(w => uniqueWidgets.has(w))) {
                 throw new Error("Generated layout is invalid. It must contain all widgets exactly once.");
            }

            onLayoutSave(newLayout);
            localStorage.setItem('dashboardLayout', JSON.stringify(newLayout));
            setPrompt('');
            onClose();

        } catch (e) {
            console.error("Failed to generate layout:", e);
            setError("Sorry, I couldn't generate a layout. Please try a different prompt or try again later.");
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Customize Dashboard Layout">
            <div className="space-y-4">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Describe how you'd like to arrange your dashboard using natural language. For example: "Put announcements and quick actions on the right."
                </p>
                <div>
                    <label htmlFor="layout-prompt" className="sr-only">Layout Prompt</label>
                    <textarea
                        id="layout-prompt"
                        rows={3}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        disabled={isLoading}
                        placeholder="e.g., I want to see recognition first on the left, and everything else on the right."
                        className="w-full shadow-sm sm:text-sm border-slate-300 rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
                
                <div className="flex justify-end pt-2">
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading}
                        className="flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <SpinnerIcon className="w-5 h-5" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <SparklesIcon className="w-5 h-5" />
                                Generate Layout
                            </>
                        )}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default DashboardCustomizeModal;
