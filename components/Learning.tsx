import React from 'react';
import { Course, CourseStatus } from '../types';

const mockEnrolledCourses: Course[] = [
    { id: 'C001', title: 'Advanced React Patterns', description: 'Deep dive into hooks, context, and performance optimization.', status: CourseStatus.InProgress, progress: 75 },
    { id: 'C002', title: 'Leadership for Engineers', description: 'Learn to lead projects and mentor team members effectively.', status: CourseStatus.InProgress, progress: 40 },
    { id: 'C003', title: 'Cybersecurity Fundamentals', description: 'Understand the basics of protecting digital assets.', status: CourseStatus.Completed, progress: 100 },
];

const mockAvailableCourses: Course[] = [
    { id: 'C004', title: 'Introduction to GraphQL', description: 'Master the query language for your APIs.', status: CourseStatus.NotStarted, progress: 0 },
    { id: 'C005', title: 'Project Management Essentials', description: 'Learn the fundamentals of managing projects from start to finish.', status: CourseStatus.NotStarted, progress: 0 },
    { id: 'C006', title: 'Advanced CSS and Sass', description: 'Take your styling skills to the next level.', status: CourseStatus.NotStarted, progress: 0 },
];

interface CourseCardProps {
    course: Course;
    isEnrolled: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, isEnrolled }) => {
    
    const getStatusBadge = (status: CourseStatus) => {
        switch (status) {
            case CourseStatus.Completed: return 'bg-green-100 text-green-800';
            case CourseStatus.InProgress: return 'bg-blue-100 text-blue-800';
            default: return 'bg-slate-100 text-slate-800';
        }
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-md transition-shadow hover:shadow-lg flex flex-col justify-between">
            <div>
                <h4 className="text-lg font-bold text-slate-900">{course.title}</h4>
                <p className="mt-2 text-sm text-slate-600 h-10">{course.description}</p>
            </div>
            <div className="mt-4">
                {isEnrolled ? (
                    <>
                        <div className="flex justify-between items-center mb-1">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(course.status)}`}>
                                {course.status}
                            </span>
                             <span className="text-sm font-medium text-slate-500">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5">
                            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                        </div>
                    </>
                ) : (
                    <div className="flex justify-end">
                        <button className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
                            Enroll Now
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const Learning: React.FC = () => {
    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">My Learning</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockEnrolledCourses.map(course => (
                        <CourseCard key={course.id} course={course} isEnrolled={true} />
                    ))}
                </div>
            </div>
             <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Course Catalog</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockAvailableCourses.map(course => (
                        <CourseCard key={course.id} course={course} isEnrolled={false} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Learning;
