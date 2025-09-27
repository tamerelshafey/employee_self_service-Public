

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Course, CourseStatus } from '../types';

interface LearningProps {
    enrolledCourses: Course[];
    availableCourses: Course[];
}

interface CourseCardProps {
    course: Course;
    isEnrolled: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, isEnrolled }) => {
    const { t } = useTranslation();
    
    const getStatusBadge = (status: CourseStatus) => {
        switch (status) {
            case CourseStatus.Completed: return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
            case CourseStatus.InProgress: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
            default: return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
        }
    }

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md transition-shadow hover:shadow-lg flex flex-col justify-between">
            <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-slate-50">{course.title}</h4>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 h-10">{course.description}</p>
            </div>
            <div className="mt-4">
                {isEnrolled ? (
                    <>
                        <div className="flex justify-between items-center mb-1">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(course.status)}`}>
                                {course.status}
                            </span>
                             <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                            <div className="bg-indigo-600 dark:bg-indigo-500 h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                        </div>
                    </>
                ) : (
                    <div className="flex justify-end">
                        <button className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
                            {t('learning.enroll_now')}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const Learning: React.FC<LearningProps> = ({ enrolledCourses, availableCourses }) => {
    const { t } = useTranslation();
    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">{t('learning.my_learning')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {enrolledCourses.map(course => (
                        <CourseCard key={course.id} course={course} isEnrolled={true} />
                    ))}
                </div>
            </div>
             <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">{t('learning.course_catalog')}</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableCourses.map(course => (
                        <CourseCard key={course.id} course={course} isEnrolled={false} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Learning;