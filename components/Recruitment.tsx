import React, { useState, useMemo } from 'react';
import type { JobOpening } from '../types';
import Modal from './Modal';

const mockJobOpenings: JobOpening[] = [
    {
        id: 'JOB001', title: 'Senior Backend Engineer (Go)', department: 'Technology', location: 'Remote', type: 'Full-time',
        description: 'We are seeking an experienced Backend Engineer to design, develop, and maintain our core services. You will work with a talented team to build scalable and reliable systems.',
        qualifications: ['5+ years of experience with Go (Golang)', 'Strong understanding of microservices architecture', 'Experience with AWS or GCP', 'Proficiency with PostgreSQL or similar relational databases']
    },
    {
        id: 'JOB002', title: 'Product Manager', department: 'Product', location: 'New York, NY', type: 'Full-time',
        description: 'As a Product Manager, you will be responsible for the product planning and execution throughout the Product Lifecycle, including gathering and prioritizing product and customer requirements.',
        qualifications: ['3+ years of product management experience in a SaaS company', 'Proven track record of managing all aspects of a successful product throughout its lifecycle', 'Excellent written and verbal communication skills']
    },
    {
        id: 'JOB003', title: 'UX/UI Designer', department: 'Design', location: 'Remote', type: 'Contract',
        description: 'We are looking for a creative UX/UI Designer to join our team on a contract basis. You will be responsible for delivering the best online user experience, which makes your role extremely important for our success.',
        qualifications: ['A strong portfolio of successful UX/UI design projects', 'Proficiency in Figma, Sketch, or Adobe XD', 'Solid understanding of design systems and component-based design']
    },
    {
        id: 'JOB004', title: 'Marketing Analyst', department: 'Marketing', location: 'San Francisco, CA', type: 'Full-time',
        description: 'The Marketing Analyst will be responsible for tracking and analyzing the performance of advertising campaigns, assessing market trends, and providing insights to optimize marketing strategies.',
        qualifications: ['2+ years of experience in marketing analytics', 'Proficiency with Google Analytics and SQL', 'Strong analytical skills with the ability to collect, organize, and analyze significant amounts of information']
    }
];

const Recruitment: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDept, setSelectedDept] = useState('All');
    const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
    const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);

    const departments = useMemo(() => ['All', ...new Set(mockJobOpenings.map(j => j.department))], []);
    
    const filteredJobs = useMemo(() => {
        return mockJobOpenings.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.department.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesDept = selectedDept === 'All' || job.department === selectedDept;
            return matchesSearch && matchesDept;
        });
    }, [searchTerm, selectedDept]);
    
    const openReferralModal = () => {
        setIsReferralModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold text-slate-900">Internal Job Openings</h3>
                <p className="mt-2 text-slate-600">Explore opportunities to grow your career with us. Know someone great? Refer them!</p>
                <div className="mt-4 flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full sm:w-2/3 pl-4 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <select
                        value={selectedDept}
                        onChange={(e) => setSelectedDept(e.target.value)}
                        className="w-full sm:w-1/3 pl-3 pr-10 py-2 text-base border border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        {departments.map(dept => <option key={dept}>{dept}</option>)}
                    </select>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredJobs.map(job => (
                    <div key={job.id} className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-between transition-shadow hover:shadow-lg">
                        <div>
                            <div className="flex justify-between items-start">
                                <h4 className="text-lg font-bold text-slate-900">{job.title}</h4>
                                <span className="text-xs font-semibold bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">{job.type}</span>
                            </div>
                            <p className="text-sm font-medium text-slate-600 mt-1">{job.department} &middot; {job.location}</p>
                            <p className="mt-3 text-sm text-slate-500 line-clamp-2">{job.description}</p>
                        </div>
                        <button 
                            onClick={() => setSelectedJob(job)}
                            className="mt-4 w-full bg-indigo-100 text-indigo-700 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-200 transition-colors text-sm"
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>

            {selectedJob && (
                <Modal title={selectedJob.title} isOpen={!!selectedJob} onClose={() => setSelectedJob(null)}>
                    <div className="space-y-4">
                        <p className="text-sm font-medium text-slate-600">{selectedJob.department} &middot; {selectedJob.location}</p>
                        <p className="text-slate-700">{selectedJob.description}</p>
                        <div>
                            <h5 className="font-semibold text-slate-800 mb-2">Qualifications</h5>
                            <ul className="list-disc list-inside space-y-1 text-slate-600">
                                {selectedJob.qualifications.map((q, i) => <li key={i}>{q}</li>)}
                            </ul>
                        </div>
                        <div className="flex justify-end gap-3 pt-4">
                            <button onClick={openReferralModal} className="bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors">Refer a Candidate</button>
                            <button onClick={() => alert('Application submitted!')} className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">Apply Now</button>
                        </div>
                    </div>
                </Modal>
            )}

            {isReferralModalOpen && (
                 <Modal title={`Refer a Candidate for ${selectedJob?.title}`} isOpen={isReferralModalOpen} onClose={() => setIsReferralModalOpen(false)}>
                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Referral submitted!'); setIsReferralModalOpen(false); setSelectedJob(null); }}>
                        <div>
                            <label htmlFor="refName" className="block text-sm font-medium text-slate-700">Candidate's Name</label>
                            <input type="text" id="refName" required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"/>
                        </div>
                        <div>
                            <label htmlFor="refEmail" className="block text-sm font-medium text-slate-700">Candidate's Email</label>
                            <input type="email" id="refEmail" required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"/>
                        </div>
                         <div>
                            <label htmlFor="refReason" className="block text-sm font-medium text-slate-700">Why are you recommending them?</label>
                            <textarea id="refReason" rows={3} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"></textarea>
                        </div>
                        <div className="flex justify-end gap-3 pt-4">
                             <button type="button" onClick={() => setIsReferralModalOpen(false)} className="bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors">Cancel</button>
                            <button type="submit" className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">Submit Referral</button>
                        </div>
                    </form>
                </Modal>
            )}

        </div>
    );
};

export default Recruitment;