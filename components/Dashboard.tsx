import React from 'react';
import type { Employee } from '../types';
import { ProfileIcon, LeaveIcon, CompensationIcon, LearningIcon, AttendanceIcon } from './Icons';

interface DashboardProps {
    employee: Employee;
    setActivePage: (page: string) => void;
}

interface CardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    color: string;
}

const StatCard: React.FC<CardProps> = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4 transition-transform hover:scale-105">
        <div className={`p-3 rounded-full ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-slate-500 font-medium">{title}</p>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
        </div>
    </div>
);


const Dashboard: React.FC<DashboardProps> = ({ employee, setActivePage }) => {
    return (
        <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
                <h2 className="text-3xl font-bold text-slate-900">Welcome back, {employee.name.split(' ')[0]}!</h2>
                <p className="mt-2 text-slate-600">Here's a summary of your portal. Have a great day!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Pending Leave Requests" 
                    value="2" 
                    icon={<LeaveIcon className="w-6 h-6 text-white" />} 
                    color="bg-amber-500" 
                />
                 <StatCard 
                    title="In-Progress Courses" 
                    value="3" 
                    icon={<LearningIcon className="w-6 h-6 text-white" />} 
                    color="bg-blue-500" 
                />
                <StatCard 
                    title="Hours Logged (Week)" 
                    value="38.5" 
                    icon={<AttendanceIcon className="w-6 h-6 text-white" />} 
                    color="bg-green-500" 
                />
                 <StatCard 
                    title="Department" 
                    value={employee.department}
                    icon={<ProfileIcon className="w-6 h-6 text-white" />} 
                    color="bg-indigo-500" 
                />
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                 <div className="flex flex-wrap gap-4">
                    <button onClick={() => setActivePage('leave')} className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">Request Leave</button>
                    <button onClick={() => setActivePage('careers')} className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">View Open Roles</button>
                    <button onClick={() => setActivePage('directory')} className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">Find a Colleague</button>
                    <button onClick={() => setActivePage('benefits')} className="bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors">View Benefits</button>
                    <button onClick={() => setActivePage('compensation')} className="bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors">View Compensation</button>
                    <button onClick={() => setActivePage('profile')} className="bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors">Update Profile</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;