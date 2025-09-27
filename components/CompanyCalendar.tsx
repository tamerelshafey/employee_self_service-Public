

import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { CalendarEvent } from '../types';

interface CompanyCalendarProps {
    events: CalendarEvent[];
}

const CompanyCalendar: React.FC<CompanyCalendarProps> = ({ events }) => {
    const { t, i18n } = useTranslation();
    const [currentDate, setCurrentDate] = useState(new Date());

    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay();
    
    const parseUTCDate = (dateString: string) => {
        const parts = dateString.split('-').map(Number);
        return new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
    };

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
        const startOfTodayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
        return events
            .filter(event => parseUTCDate(event.date) >= startOfTodayUTC)
            .sort((a, b) => parseUTCDate(a.date).getTime() - parseUTCDate(b.date).getTime())
            .slice(0, 5);
    }, [events]);

    const calendarDays = [];
    for (let i = 0; i < startingDay; i++) {
        calendarDays.push(<div key={`empty-${i}`} className="border-e border-b border-slate-200 dark:border-slate-700"></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        const dateStr = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
        const dayEvents = eventsByDate[dateStr] || [];
        
        let dayClass = 'p-2 border-e border-b border-slate-200 dark:border-slate-700 flex flex-col h-24';
        const isHoliday = dayEvents.some(e => e.type === 'holiday');
        if (isHoliday) dayClass += ' bg-blue-50 dark:bg-blue-900/20';
        
        calendarDays.push(
            <div key={i} className={dayClass}>
                <span className="font-medium text-slate-700 dark:text-slate-300">{i}</span>
                 <div className="mt-1 space-y-1 overflow-y-auto">
                    {dayEvents.map(event => (
                        <div key={event.title} className={`text-xs p-1 rounded ${event.type === 'holiday' ? 'bg-blue-200 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' : 'bg-indigo-200 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300'}`}>
                           {event.title}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    
    const weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map(day => t(`calendar.days.${day}`));

    return (
        <div className="space-y-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">&larr;</button>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                        {currentDate.toLocaleString(i18n.language, { month: 'long', year: 'numeric' })}
                    </h3>
                    <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">&rarr;</button>
                </div>
                <div className="grid grid-cols-7 text-center font-bold text-slate-600 dark:text-slate-400 border-t border-s border-e border-slate-200 dark:border-slate-700">
                    {weekDays.map(day => <div key={day} className="py-2 border-b border-slate-200 dark:border-slate-700">{day}</div>)}
                </div>
                <div className="grid grid-cols-7 border-s border-slate-200 dark:border-slate-700">
                    {calendarDays}
                </div>
            </div>
             <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">{t('calendar.upcoming_events')}</h3>
                {upcomingEvents.length > 0 ? (
                    <ul className="space-y-3">
                        {upcomingEvents.map(event => {
                            const eventDate = parseUTCDate(event.date);
                            return (
                             <li key={event.date + event.title} className="flex items-center space-x-4 rtl:space-x-reverse p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                                <div className="text-center w-16">
                                    <p className="font-bold text-indigo-600 dark:text-indigo-400 text-sm">{eventDate.toLocaleString(i18n.language, { month: 'short', timeZone: 'UTC' })}</p>
                                    <p className="font-bold text-slate-800 dark:text-slate-200 text-2xl">{eventDate.getUTCDate()}</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-800 dark:text-slate-200">{event.title}</p>
                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${event.type === 'holiday' ? 'bg-blue-200 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' : 'bg-indigo-200 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300'}`}>
                                        {t(`calendar.${event.type}`)}
                                    </span>
                                </div>
                            </li>
                        )})}
                    </ul>
                ) : (
                    <p className="text-slate-500 dark:text-slate-400">{t('calendar.no_upcoming_events')}</p>
                )}
            </div>
        </div>
    );
};

export default CompanyCalendar;