

import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AttendanceRecord, AttendanceStatus } from '../types';

interface AttendanceProps {
    attendanceLog: AttendanceRecord[];
}

const Attendance: React.FC<AttendanceProps> = ({ attendanceLog }) => {
    const { t, i18n } = useTranslation();
    const [isClockedIn, setIsClockedIn] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());

    const getStatusBadge = (status: AttendanceStatus) => {
        switch (status) {
            case AttendanceStatus.Present: return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
            case AttendanceStatus.OnLeave: return 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300';
            case AttendanceStatus.Holiday: return 'bg-slate-200 text-slate-800 dark:bg-slate-600 dark:text-slate-300';
            case AttendanceStatus.Absent: return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
            default: return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
        }
    };

    const handleClockInOut = () => {
        setIsClockedIn(!isClockedIn);
    }
    
    // Calendar Logic
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay();

    const attendanceMap = useMemo(() => {
        return new Map(attendanceLog.map(record => [record.date, record]));
    }, [attendanceLog]);
    
    const changeMonth = (offset: number) => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(1); // Set to first day to avoid month skipping issues
            newDate.setMonth(newDate.getMonth() + offset);
            return newDate;
        });
    };
    
    const calendarDays = [];
    for (let i = 0; i < startingDay; i++) {
        calendarDays.push(<div key={`empty-${i}`} className="border-e border-b border-slate-200 dark:border-slate-700"></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        const dateStr = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
        const record = attendanceMap.get(dateStr);
        const today = new Date();
        const isToday = i === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear();
        
        calendarDays.push(
            <div key={i} className="p-2 border-e border-b border-slate-200 dark:border-slate-700 h-24 flex flex-col relative">
                <span className={`font-medium text-slate-700 dark:text-slate-300 w-7 h-7 flex items-center justify-center ${isToday ? 'bg-indigo-600 text-white rounded-full' : ''}`}>{i}</span>
                {record && (
                    <div className="mt-1">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full text-center w-full block ${getStatusBadge(record.status)}`}>
                            {t(`attendance.${record.status.toLowerCase().replace(' ', '_')}`)}
                        </span>
                         {record.clockIn && (
                            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 text-center font-mono">
                                {record.clockIn} - {record.clockOut}
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
    
    const weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map(day => t(`calendar.days.${day}`));

    const LegendItem: React.FC<{ status: AttendanceStatus }> = ({ status }) => (
        <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${getStatusBadge(status)}`}></span>
            <span className="text-sm text-slate-600 dark:text-slate-400">{t(`attendance.${status.toLowerCase().replace(' ', '_')}`)}</span>
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md flex flex-col sm:flex-row items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">{t('attendance.time_clock')}</h3>
                        <p className="mt-1 text-slate-500 dark:text-slate-400">
                            {t('attendance.current_status')}
                            <span className={`font-semibold ${isClockedIn ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {isClockedIn ? t('attendance.clocked_in') : t('attendance.clocked_out')}
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
                         {isClockedIn ? t('attendance.clock_out_button') : t('attendance.clock_in_button')}
                    </button>
                </div>
                 <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md flex items-center justify-center">
                    <div className="text-center">
                         <p className="text-slate-500 dark:text-slate-400 font-medium">{t('attendance.todays_hours')}</p>
                         <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">4.5</p>
                    </div>
                 </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">&larr;</button>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                        {currentDate.toLocaleString(i18n.language, { month: 'long', year: 'numeric' })}
                    </h3>
                    <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">&rarr;</button>
                </div>
                <div className="grid grid-cols-7 text-center font-semibold text-slate-600 dark:text-slate-400 border-t border-s border-e border-slate-200 dark:border-slate-700">
                    {weekDays.map(day => <div key={day} className="py-2 border-b border-slate-200 dark:border-slate-700">{day}</div>)}
                </div>
                <div className="grid grid-cols-7 border-s border-slate-200 dark:border-slate-700">
                    {calendarDays}
                </div>
                 <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center gap-x-6 gap-y-2">
                    <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 me-4">{t('attendance.legend')}:</h4>
                    <LegendItem status={AttendanceStatus.Present} />
                    <LegendItem status={AttendanceStatus.OnLeave} />
                    <LegendItem status={AttendanceStatus.Holiday} />
                    <LegendItem status={AttendanceStatus.Absent} />
                </div>
            </div>
        </div>
    );
};

export default Attendance;