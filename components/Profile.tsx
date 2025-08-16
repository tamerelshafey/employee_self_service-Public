
import React from 'react';
import type { Employee } from '../types';

interface ProfileProps {
    employee: Employee;
}

interface ProfileFieldProps {
    label: string;
    value: string;
}

const ProfileField: React.FC<ProfileFieldProps> = ({ label, value }) => (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
        <dt className="text-sm font-medium text-slate-500">{label}</dt>
        <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">{value}</dd>
    </div>
);


const Profile: React.FC<ProfileProps> = ({ employee }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
                <div className="md:flex-shrink-0 p-8 flex flex-col items-center justify-center bg-indigo-50">
                    <img className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-lg" src={employee.avatarUrl} alt="Employee Avatar" />
                    <h3 className="mt-4 text-2xl font-bold text-slate-900">{employee.name}</h3>
                    <p className="mt-1 text-md text-indigo-600 font-semibold">{employee.position}</p>
                </div>
                <div className="p-8 flex-1">
                    <h3 className="text-lg leading-6 font-bold text-slate-900">Personal Information</h3>
                    <p className="mt-1 max-w-2xl text-sm text-slate-500">Details about the employee.</p>
                    <div className="mt-5 border-t border-slate-200">
                        <dl className="divide-y divide-slate-200">
                            <ProfileField label="Employee ID" value={employee.id} />
                            <ProfileField label="Full name" value={employee.name} />
                            <ProfileField label="Department" value={employee.department} />
                            <ProfileField label="Email address" value={employee.email} />
                            <ProfileField label="Phone number" value={employee.phone} />
                            <ProfileField label="Address" value={employee.address} />
                        </dl>
                    </div>
                     <div className="mt-6 flex justify-end">
                        <button className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
