import React, { useState } from 'react';
import { PerformanceReview, PerformanceRating } from '../types';
import Modal from './Modal';

const mockPerformanceReviews: PerformanceReview[] = [
    {
        id: 'PR003',
        period: 'H2 2023 Review',
        reviewer: 'Jane Smith',
        rating: PerformanceRating.ExceedsExpectations,
        summary: 'Alex consistently delivered high-quality work and took initiative on several key projects, exceeding all targets.',
        details: {
            strengths: 'Excellent problem-solving skills, strong team collaboration, and proactive project leadership.',
            areasForImprovement: 'Could benefit from delegating smaller tasks more frequently to focus on high-impact activities.',
            goalsForNextPeriod: 'Lead the upcoming "Phoenix" project architecture redesign. Mentor a junior engineer.',
        },
    },
    {
        id: 'PR002',
        period: 'H1 2023 Review',
        reviewer: 'Jane Smith',
        rating: PerformanceRating.MeetsExpectations,
        summary: 'Solid performance throughout the first half of the year. Met all core job responsibilities and targets.',
        details: {
            strengths: 'Reliable and consistent code quality. Good communication within the immediate team.',
            areasForImprovement: 'Increase participation in cross-departmental meetings and technical discussions.',
            goalsForNextPeriod: 'Take ownership of the new analytics module.',
        },
    },
    {
        id: 'PR001',
        period: 'H2 2022 Review',
        reviewer: 'John Davis',
        rating: PerformanceRating.MeetsExpectations,
        summary: 'Successfully onboarded and integrated into the team, quickly becoming a productive member.',
        details: {
            strengths: 'Fast learner, positive attitude, and eager to take on new challenges.',
            areasForImprovement: 'Continue to deepen knowledge of the legacy codebase.',
            goalsForNextPeriod: 'Complete advanced Typescript training.',
        },
    },
];

const Performance: React.FC = () => {
    const [reviews] = useState<PerformanceReview[]>(mockPerformanceReviews);
    const [selectedReview, setSelectedReview] = useState<PerformanceReview | null>(null);

    const getRatingColor = (rating: PerformanceRating) => {
        switch (rating) {
            case PerformanceRating.Outstanding:
            case PerformanceRating.ExceedsExpectations:
                return 'text-green-600';
            case PerformanceRating.MeetsExpectations:
                return 'text-blue-600';
            case PerformanceRating.NeedsImprovement:
                return 'text-amber-600';
            default:
                return 'text-slate-600';
        }
    };
    
    const DetailSection: React.FC<{title: string, content: string}> = ({title, content}) => (
        <div>
            <h4 className="font-semibold text-slate-700">{title}</h4>
            <p className="mt-1 text-slate-600">{content}</p>
        </div>
    );

    return (
        <div className="space-y-6">
            {reviews.map((review) => (
                <div key={review.id} className="bg-white p-6 rounded-xl shadow-md transition-shadow hover:shadow-lg">
                    <div className="flex flex-col md:flex-row justify-between md:items-center">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">{review.period}</h3>
                            <p className="text-sm text-slate-500 mt-1">Reviewed by: {review.reviewer}</p>
                        </div>
                        <div className="mt-4 md:mt-0 text-left md:text-right">
                             <p className={`text-lg font-bold ${getRatingColor(review.rating)}`}>{review.rating}</p>
                        </div>
                    </div>
                    <p className="mt-4 text-slate-600 italic">"{review.summary}"</p>
                    <div className="mt-4 flex justify-end">
                        <button 
                            onClick={() => setSelectedReview(review)}
                            className="bg-indigo-100 text-indigo-700 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-200 transition-colors text-sm"
                        >
                            View Details
                        </button>
                    </div>
                </div>
            ))}
            
            {selectedReview && (
                 <Modal title={selectedReview.period} isOpen={!!selectedReview} onClose={() => setSelectedReview(null)}>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-slate-700">Overall Rating</h4>
                            <p className={`mt-1 font-bold text-lg ${getRatingColor(selectedReview.rating)}`}>{selectedReview.rating}</p>
                        </div>
                         <div className="border-t border-slate-200 pt-4 space-y-4">
                            <DetailSection title="Strengths" content={selectedReview.details.strengths} />
                            <DetailSection title="Areas for Improvement" content={selectedReview.details.areasForImprovement} />
                            <DetailSection title="Goals for Next Period" content={selectedReview.details.goalsForNextPeriod} />
                        </div>
                        <div className="flex justify-end pt-4">
                            <button onClick={() => setSelectedReview(null)} className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
                                Close
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Performance;