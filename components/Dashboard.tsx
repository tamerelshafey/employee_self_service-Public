import React from 'react';
import type { Employee, Kudo } from '../types';
import { ProfileIcon, LeaveIcon, CompensationIcon, LearningIcon, AttendanceIcon } from './Icons';

interface DashboardProps {
    employee: Employee;
    setActivePage: (page: string) => void;
    kudos: Kudo[];
    allEmployees: Employee[];
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

const RecognitionCard: React.FC<{ kudo: Kudo; sender: Employee | undefined }> = ({ kudo, sender }) => (
    <div className="bg-slate-50 p-4 rounded-lg flex items-start space-x-4">
        <img src={sender?.avatarUrl} alt={sender?.name} className="w-12 h-12 rounded-full" />
        <div className="flex-1">
            <p className="text-sm text-slate-600">
                <span className="font-bold text-slate-800">{sender?.name}</span> gave you kudos:
            </p>
            <p className="text-sm italic text-slate-800 mt-1 line-clamp-2">"{kudo.message}"</p>
        </div>
    </div>
);

const Dashboard: React.FC<DashboardProps> = ({ employee, setActivePage, kudos, allEmployees }) => {
    
    const latestKudos = kudos
        .filter(k => k.receiverId === employee.id)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 1);

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

            {latestKudos.length > 0 && (
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">Latest Recognition</h3>
                        <button onClick={() => setActivePage('recognition')} className="text-sm font-semibold text-indigo-600 hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                        {latestKudos.map(kudo => {
                            const sender = allEmployees.find(e => e.id === kudo.senderId);
                            return <RecognitionCard key={kudo.id} kudo={kudo} sender={sender} />
                        })}
                    </div>
                </div>
            )}
            
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                 <div className="flex flex-wrap gap-4">
                    <button onClick={() => setActivePage('recognition')} className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">Give Kudos</button>
                    <button onClick={() => setActivePage('leave')} className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">Request Leave</button>
                    <button onClick={() => setActivePage('careers')} className="bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors">View Open Roles</button>
                    <button onClick={() => setActivePage('directory')} className="bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors">Find a Colleague</button>
                    <button onClick={() => setActivePage('benefits')} className="bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors">View Benefits</button>
                    <button onClick={() => setActivePage('profile')} className="bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors">Update Profile</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;