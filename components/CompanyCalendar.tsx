import React, { useState, useMemo } from 'react';
import type { CalendarEvent } from '../types';

interface CompanyCalendarProps {
    events: CalendarEvent[];
}

const CompanyCalendar: React.FC<CompanyCalendarProps> = ({ events }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay();

    const eventsByDate = useMemo(() => {
        return events.reduce((acc, event) => {
            (acc[event.date] = acc[event.date] || []).push(event);
            return acc;
        }, {} as Record<string, CalendarEvent[]>);
    }, [events]);
    
    const changeMonth = (offset: number) => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + offset);
            return newDate;
        });
    };

    const upcomingEvents = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return events
            .filter(event => new Date(event.date) >= today)
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 5);
    }, [events]);

    const calendarDays = [];
    for (let i = 0; i < startingDay; i++) {
        calendarDays.push(<div key={`empty-${i}`} className="border-r border-b border-slate-200"></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        const dateStr = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
        const dayEvents = eventsByDate[dateStr] || [];
        const isHoliday = dayEvents.some(e => e.type === 'holiday');
        const isEvent = dayEvents.some(e => e.type === 'event');
        
        let dayClass = 'p-2 border-r border-b border-slate-200 flex flex-col h-24';
        if (isHoliday) dayClass += ' bg-blue-50';
        
        calendarDays.push(
            <div key={i} className={dayClass}>
                <span className="font-medium text-slate-700">{i}</span>
                 <div className="mt-1 space-y-1 overflow-y-auto">
                    {dayEvents.map(event => (
                        <div key={event.title} className={`text-xs p-1 rounded ${event.type === 'holiday' ? 'bg-blue-200 text-blue-800' : 'bg-indigo-200 text-indigo-800'}`}>
                           {event.title}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-slate-100">&larr;</button>
                    <h3 className="text-xl font-bold text-slate-900">
                        {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </h3>
                    <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-slate-100">&rarr;</button>
                </div>
                <div className="grid grid-cols-7 text-center font-bold text-slate-600 border-t border-l border-r border-slate-200">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day} className="py-2 border-b border-slate-200">{day}</div>)}
                </div>
                <div className="grid grid-cols-7 border-l border-slate-200">
                    {calendarDays}
                </div>
            </div>
             <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Upcoming Events & Holidays</h3>
                {upcomingEvents.length > 0 ? (
                    <ul className="space-y-3">
                        {upcomingEvents.map(event => (
                             <li key={event.date + event.title} className="flex items-center space-x-4 p-3 bg-slate-50 rounded-lg">
                                <div className="text-center w-16">
                                    <p className="font-bold text-indigo-600 text-sm">{new Date(event.date).toLocaleString('default', { month: 'short' })}</p>
                                    <p className="font-bold text-slate-800 text-2xl">{new Date(event.date).getDate() + 1}</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-800">{event.title}</p>
                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${event.type === 'holiday' ? 'bg-blue-200 text-blue-800' : 'bg-indigo-200 text-indigo-800'}`}>
                                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-slate-500">No upcoming events or holidays found.</p>
                )}
            </div>
        </div>
    );
};

export default CompanyCalendar;
