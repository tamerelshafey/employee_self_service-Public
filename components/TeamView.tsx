import React, { useMemo } from 'react';
import type { Employee } from '../types';

interface TeamViewProps {
    currentEmployee: Employee;
    allEmployees: Employee[];
}

const TeamMemberCard: React.FC<{ employee: Employee, role: string }> = ({ employee, role }) => (
    <div className="bg-white p-4 rounded-xl shadow-md flex items-center space-x-4">
        <img 
            className="w-16 h-16 rounded-full object-cover"
            src={employee.avatarUrl}
            alt={employee.name}
        />
        <div className="flex-1">
            <p className="text-sm font-semibold text-indigo-600">{role}</p>
            <h4 className="text-lg font-bold text-slate-900">{employee.name}</h4>
            <p className="text-slate-500">{employee.position}</p>
        </div>
        <a href={`mailto:${employee.email}`} className="text-slate-400 hover:text-indigo-600 transition-colors p-2 rounded-full hover:bg-slate-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        </a>
    </div>
);

const TeamSection: React.FC<{ title: string, members: Employee[], role: string }> = ({ title, members, role }) => {
    if (members.length === 0) return null;

    return (
        <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">{title}</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {members.map(member => (
                    <TeamMemberCard key={member.id} employee={member} role={role} />
                ))}
            </div>
        </div>
    );
};

const TeamView: React.FC<TeamViewProps> = ({ currentEmployee, allEmployees }) => {
    
    const { manager, peers, directReports } = useMemo(() => {
        const manager = allEmployees.find(e => e.id === currentEmployee.managerId);
        
        const peers = allEmployees.filter(e => 
            e.managerId === currentEmployee.managerId && e.id !== currentEmployee.id
        );
        
        const directReports = allEmployees.filter(e => e.managerId === currentEmployee.id);
        
        return { manager, peers, directReports };
    }, [currentEmployee, allEmployees]);

    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
                 <h2 className="text-2xl font-bold text-slate-900">Your Team Structure</h2>
                 <p className="mt-2 text-slate-600">Here's a look at your immediate team at a glance.</p>
            </div>
            
            {manager && <TeamSection title="Your Manager" members={[manager]} role="Manager" />}
            
            <TeamSection title="Your Peers" members={peers} role="Peer" />

            <TeamSection title="Your Direct Reports" members={directReports} role="Direct Report" />

            {!manager && peers.length === 0 && directReports.length === 0 && (
                 <div className="text-center py-10 bg-white rounded-xl shadow-md">
                    <p className="text-slate-500">Team information is not available at the moment.</p>
                </div>
            )}
        </div>
    );
};

export default TeamView;
