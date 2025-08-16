import React, { useState } from 'react';
import { AttendanceRecord, AttendanceStatus } from '../types';

const initialAttendance: AttendanceRecord[] = [
    { date: '2024-07-22', day: 'Monday', clockIn: '09:05 AM', clockOut: '05:35 PM', totalHours: 8, status: AttendanceStatus.Present },
    { date: '2024-07-21', day: 'Sunday', clockIn: null, clockOut: null, totalHours: 0, status: AttendanceStatus.Holiday },
    { date: '2024-07-20', day: 'Saturday', clockIn: null, clockOut: null, totalHours: 0, status: AttendanceStatus.Holiday },
    { date: '2024-07-19', day: 'Friday', clockIn: '08:58 AM', clockOut: '05:30 PM', totalHours: 8.5, status: AttendanceStatus.Present },
    { date: '2024-07-18', day: 'Thursday', clockIn: '09:00 AM', clockOut: '05:00 PM', totalHours: 8, status: AttendanceStatus.Present },
    { date: '2024-07-17', day: 'Wednesday', clockIn: null, clockOut: null, totalHours: 0, status: AttendanceStatus.OnLeave },
    { date: '2024-07-16', day: 'Tuesday', clockIn: '09:15 AM', clockOut: '06:00 PM', totalHours: 8.75, status: AttendanceStatus.Present },
];

const StatCard: React.FC<{ title: string; value: string; }> = ({ title, value }) => (
    <div className="bg-slate-50 p-4 rounded-lg text-center">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
    </div>
);


const Attendance: React.FC = () => {
    const [attendanceLog] = useState<AttendanceRecord[]>(initialAttendance);
    const [isClockedIn, setIsClockedIn] = useState(false);
    
    const getStatusBadge = (status: AttendanceStatus) => {
        switch (status) {
            case AttendanceStatus.Present: return 'bg-green-100 text-green-800';
            case AttendanceStatus.OnLeave: return 'bg-amber-100 text-amber-800';
            case AttendanceStatus.Holiday: return 'bg-slate-200 text-slate-800';
            case AttendanceStatus.Absent: return 'bg-red-100 text-red-800';
            default: return 'bg-slate-100 text-slate-800';
        }
    };

    const handleClockInOut = () => {
        setIsClockedIn(!isClockedIn);
    }
    
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-md flex flex-col sm:flex-row items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">Time Clock</h3>
                        <p className="mt-1 text-slate-500">
                            Your current status is: 
                            <span className={`font-semibold ${isClockedIn ? 'text-green-600' : 'text-red-600'}`}>
                                {isClockedIn ? ' Clocked In' : ' Clocked Out'}
                            </span>
                        </p>
                    </div>
                    <button 
                        onClick={handleClockInOut}
                        className={`mt-4 sm:mt-0 w-full sm:w-auto text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform hover:scale-105 ${
                            isClockedIn 
                            ? 'bg-red-500 hover:bg-red-600' 
                            : 'bg-green-500 hover:bg-green-600'
                        }`}
                    >
                         {isClockedIn ? 'Clock Out' : 'Clock In'}
                    </button>
                </div>
                 <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-center">
                    <div className="text-center">
                         <p className="text-slate-500 font-medium">Today's Hours</p>
                         <p className="text-4xl font-bold text-indigo-600">4.5</p>
                    </div>
                 </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
                 <h3 className="text-xl font-bold text-slate-900 mb-4">My Recent Activity</h3>
                 <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Clock In</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Clock Out</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Total Hours</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {attendanceLog.map((record) => (
                                <tr key={record.date}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-slate-900">{record.date}</div>
                                        <div className="text-sm text-slate-500">{record.day}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{record.clockIn || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{record.clockOut || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{record.totalHours > 0 ? record.totalHours.toFixed(2) : '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(record.status)}`}>
                                            {record.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Attendance;