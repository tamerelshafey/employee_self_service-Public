

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PerformanceReview, PerformanceRating } from '../types';
import Modal from './Modal';

interface PerformanceProps {
    reviews: PerformanceReview[];
}

const Performance: React.FC<PerformanceProps> = ({ reviews }) => {
    const { t } = useTranslation();
    const [selectedReview, setSelectedReview] = useState<PerformanceReview | null>(null);

    const getRatingColor = (rating: PerformanceRating) => {
        switch (rating) {
            case PerformanceRating.Outstanding:
            case PerformanceRating.ExceedsExpectations:
                return 'text-green-600 dark:text-green-400';
            case PerformanceRating.MeetsExpectations:
                return 'text-blue-600 dark:text-blue-400';
            case PerformanceRating.NeedsImprovement:
                return 'text-amber-600 dark:text-amber-400';
            default:
                return 'text-slate-600 dark:text-slate-400';
        }
    };
    
    const DetailSection: React.FC<{title: string, content: string}> = ({title, content}) => (
        <div>
            <h4 className="font-semibold text-slate-700 dark:text-slate-300">{title}</h4>
            <p className="mt-1 text-slate-600 dark:text-slate-400">{content}</p>
        </div>
    );

    return (
        <div className="space-y-6">
            {reviews.map((review) => (
                <div key={review.id} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md transition-shadow hover:shadow-lg">
                    <div className="flex flex-col md:flex-row justify-between md:items-center">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">{review.period}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t('performance.reviewed_by', { reviewer: review.reviewer })}</p>
                        </div>
                        <div className="mt-4 md:mt-0 text-start md:text-end">
                             <p className={`text-lg font-bold ${getRatingColor(review.rating)}`}>{review.rating}</p>
                        </div>
                    </div>
                    <p className="mt-4 text-slate-600 dark:text-slate-300 italic">"{review.summary}"</p>
                    <div className="mt-4 flex justify-end">
                        <button 
                            onClick={() => setSelectedReview(review)}
                            className="bg-indigo-100 text-indigo-700 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-200 dark:bg-slate-700 dark:text-indigo-300 dark:hover:bg-slate-600 transition-colors text-sm"
                        >
                            {t('performance.view_details')}
                        </button>
                    </div>
                </div>
            ))}
            
            {selectedReview && (
                 <Modal title={selectedReview.period} isOpen={!!selectedReview} onClose={() => setSelectedReview(null)}>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-slate-700 dark:text-slate-300">{t('performance.modal_rating')}</h4>
                            <p className={`mt-1 font-bold text-lg ${getRatingColor(selectedReview.rating)}`}>{selectedReview.rating}</p>
                        </div>
                         <div className="border-t border-slate-200 dark:border-slate-700 pt-4 space-y-4">
                            <DetailSection title={t('performance.modal_strengths')} content={selectedReview.details.strengths} />
                            <DetailSection title={t('performance.modal_improvement')} content={selectedReview.details.areasForImprovement} />
                            <DetailSection title={t('performance.modal_goals')} content={selectedReview.details.goalsForNextPeriod} />
                        </div>
                        <div className="flex justify-end pt-4">
                            <button onClick={() => setSelectedReview(null)} className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
                                {t('performance.close')}
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Performance;