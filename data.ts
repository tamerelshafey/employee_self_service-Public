import type { Employee, CalendarEvent, Kudo, Announcement, Notification, LeaveRequest, ExpenseClaim, LeaveBalance, Payslip, PerformanceReview, Document, Course, AttendanceRecord, OnboardingTask, OffboardingTask, JobOpening, Task } from './types';
import { CompanyValue, NotificationType, LeaveStatus, ExpenseStatus, PerformanceRating, DocumentCategory, CourseStatus, AttendanceStatus, TaskStatus, TaskPriority } from './types';

export const allEmployees: Employee[] = [
    { // Regular Employee
        id: 'E4521', name: 'Alex Doe', position: 'Senior Frontend Engineer', department: 'Technology',
        email: 'alex.doe@example.com', phone: '+1 (555) 123-4567', address: '123 Tech Way, Silicon Valley, CA 94105',
        avatarUrl: `https://i.pravatar.cc/150?u=E4521`, managerId: 'E9876', role: 'employee',
        compensation: { salary: 120000, lastBonus: { amount: 15000, date: '2024-01-15' } },
        benefits: {
            medical: { planName: 'PPO Gold', coverageTier: 'Employee + Spouse', costPerPaycheck: 180 },
            dental: { planName: 'DentalPlus', coverageTier: 'Employee + Spouse', costPerPaycheck: 25 },
            vision: { planName: 'VisionPro', coverageTier: 'Employee + Spouse', costPerPaycheck: 10 },
            retirement: { contributionRate: 6, employerMatch: '100% up to 4%', balance: 52340 }
        }
    },
    { // Project/Site Manager
        id: 'E9876', name: 'Jane Smith', position: 'Engineering Manager', department: 'Technology',
        email: 'jane.smith@example.com', phone: '+1 (555) 987-6543', address: '456 Code Lane, Silicon Valley, CA 94105',
        avatarUrl: `https://i.pravatar.cc/150?u=E9876`, managerId: 'E1122', role: 'manager',
        compensation: { salary: 160000, lastBonus: { amount: 25000, date: '2024-01-15' } },
        benefits: {
            medical: { planName: 'HMO Platinum', coverageTier: 'Family', costPerPaycheck: 250 },
            dental: { planName: 'DentalPlus', coverageTier: 'Family', costPerPaycheck: 40 },
            vision: { planName: 'VisionPro Max', coverageTier: 'Family', costPerPaycheck: 15 },
            retirement: { contributionRate: 8, employerMatch: '100% up to 5%', balance: 110500 }
        }
    },
    { // Joker / Top-Level Manager
        id: 'E1122', name: 'Robert Brown', position: 'Director of Engineering', department: 'Technology',
        email: 'robert.brown@example.com', phone: '+1 (555) 112-2334', address: '789 App Ave, Silicon Valley, CA 94105',
        avatarUrl: `https://i.pravatar.cc/150?u=E1122`, role: 'director', managerId: undefined,
        compensation: { salary: 220000, lastBonus: { amount: 40000, date: '2024-01-15' } },
         benefits: {
            medical: { planName: 'HMO Platinum', coverageTier: 'Family', costPerPaycheck: 250 },
            dental: { planName: 'DentalPlus', coverageTier: 'Family', costPerPaycheck: 40 },
            vision: { planName: 'VisionPro Max', coverageTier: 'Family', costPerPaycheck: 15 },
            retirement: { contributionRate: 10, employerMatch: '100% up to 5%', balance: 250000 }
        }
    },
    {
        id: 'E7364', name: 'Emily White', position: 'UI/UX Designer', department: 'Design',
        email: 'emily.white@example.com', phone: '+1 (555) 736-4555', address: '101 Design St, San Francisco, CA 94102',
        avatarUrl: `https://i.pravatar.cc/150?u=E7364`, managerId: 'E8455', role: 'employee',
        compensation: { salary: 95000, lastBonus: { amount: 10000, date: '2024-01-15' } },
        benefits: {
            medical: { planName: 'PPO Gold', coverageTier: 'Employee Only', costPerPaycheck: 90 },
            dental: { planName: 'DentalBasic', coverageTier: 'Employee Only', costPerPaycheck: 12 },
            vision: { planName: 'VisionPro', coverageTier: 'Employee Only', costPerPaycheck: 5 },
            retirement: { contributionRate: 5, employerMatch: '100% up to 4%', balance: 28000 }
        }
    },
    { // Department Manager
        id: 'E8455', name: 'Michael Green', position: 'Design Lead', department: 'Design',
        email: 'michael.green@example.com', phone: '+1 (555) 845-5666', address: '202 Creative Blvd, San Francisco, CA 94102',
        avatarUrl: `https://i.pravatar.cc/150?u=E8455`, role: 'manager', managerId: 'E1122',
        compensation: { salary: 140000, lastBonus: { amount: 20000, date: '2024-01-15' } },
        benefits: {
            medical: { planName: 'PPO Gold', coverageTier: 'Family', costPerPaycheck: 280 },
            dental: { planName: 'DentalPlus', coverageTier: 'Family', costPerPaycheck: 40 },
            vision: { planName: 'VisionPro Max', coverageTier: 'Family', costPerPaycheck: 15 },
            retirement: { contributionRate: 7, employerMatch: '100% up to 5%', balance: 95000 }
        }
    },
     {
        id: 'E5555', name: 'Sarah Jones', position: 'Backend Engineer', department: 'Technology',
        email: 'sarah.jones@example.com', phone: '+1 (555) 555-5555', address: '303 Data Dr, Silicon Valley, CA 94105',
        avatarUrl: `https://i.pravatar.cc/150?u=E5555`, managerId: 'E9876', role: 'employee',
        compensation: { salary: 115000, lastBonus: { amount: 14000, date: '2024-01-15' } },
        benefits: {
            medical: { planName: 'PPO Gold', coverageTier: 'Employee Only', costPerPaycheck: 90 },
            dental: { planName: 'DentalPlus', coverageTier: 'Employee Only', costPerPaycheck: 15 },
            vision: { planName: 'VisionPro', coverageTier: 'Employee Only', costPerPaycheck: 5 },
            retirement: { contributionRate: 5, employerMatch: '100% up to 4%', balance: 45000 }
        }
    },
     {
        id: 'E6666', name: 'David Lee', position: 'Product Manager', department: 'Product',
        email: 'david.lee@example.com', phone: '+1 (555) 666-6666', address: '404 Feature Rd, San Francisco, CA 94102',
        avatarUrl: `https://i.pravatar.cc/150?u=E6666`, managerId: 'E8455', role: 'employee',
        compensation: { salary: 130000, lastBonus: { amount: 18000, date: '2024-01-15' } },
        benefits: {
            medical: { planName: 'HMO Platinum', coverageTier: 'Employee + Family', costPerPaycheck: 250 },
            dental: { planName: 'DentalPlus', coverageTier: 'Employee + Family', costPerPaycheck: 40 },
            vision: { planName: 'VisionPro', coverageTier: 'Employee + Family', costPerPaycheck: 15 },
            retirement: { contributionRate: 8, employerMatch: '100% up to 5%', balance: 88000 }
        }
    },
    { // New Employee
        id: 'E1234', name: 'Chris Pine', position: 'Junior Frontend Engineer', department: 'Technology',
        email: 'chris.pine@example.com', phone: '+1 (555) 123-1234', address: '100 Newbie Ave, Silicon Valley, CA 94105',
        avatarUrl: `https://i.pravatar.cc/150?u=E1234`, managerId: 'E9876', role: 'new_hire',
        compensation: { salary: 85000, lastBonus: { amount: 5000, date: '2024-07-01' } },
        benefits: {
            medical: { planName: 'PPO Silver', coverageTier: 'Employee Only', costPerPaycheck: 75 },
            dental: { planName: 'DentalBasic', coverageTier: 'Employee Only', costPerPaycheck: 12 },
            vision: { planName: 'VisionBasic', coverageTier: 'Employee Only', costPerPaycheck: 4 },
            retirement: { contributionRate: 4, employerMatch: '100% up to 3%', balance: 1500 }
        }
    }
];

export const mockCalendarEvents: CalendarEvent[] = [
    { date: '2024-01-01', title: 'New Year\'s Day', type: 'holiday' },
    { date: '2024-05-27', title: 'Memorial Day', type: 'holiday' },
    { date: '2024-07-04', title: 'Independence Day', type: 'holiday' },
    { date: '2024-08-15', title: 'Summer Picnic', type: 'event' },
    { date: '2024-09-02', title: 'Labor Day', type: 'holiday' },
    { date: '2024-10-31', title: 'Halloween Party', type: 'event' },
    { date: '2024-11-28', title: 'Thanksgiving Day', type: 'holiday' },
    { date: '2024-11-29', title: 'Day after Thanksgiving', type: 'holiday' },
    { date: '2024-12-20', title: 'Company Town Hall', type: 'event' },
    { date: '2024-12-24', title: 'Christmas Eve', type: 'holiday' },
    { date: '2024-12-25', title: 'Christmas Day', type: 'holiday' },
];

export const mockCompanyValues: CompanyValue[] = [
    CompanyValue.Teamwork,
    CompanyValue.Innovation,
    CompanyValue.CustomerFocus,
    CompanyValue.Integrity,
    CompanyValue.Excellence,
];

export const mockKudos: Kudo[] = [
    { id: 'K001', senderId: 'E9876', receiverId: 'E4521', message: 'Alex did an incredible job refactoring our legacy component library. His work was clean, well-documented, and has already improved performance across the app. True excellence!', value: CompanyValue.Excellence, timestamp: '2024-07-28T14:30:00Z' },
    { id: 'K002', senderId: 'E7364', receiverId: 'E6666', message: 'Huge thanks to David for stepping in to help with the user interviews for the new dashboard design. His product insights were invaluable and showed amazing teamwork.', value: CompanyValue.Teamwork, timestamp: '2024-07-27T10:00:00Z' },
    { id: 'K003', senderId: 'E4521', receiverId: 'E5555', message: 'Sarah came up with a brilliant new caching strategy for our main API endpoint, which cut down response times by 50%. A perfect example of innovation!', value: CompanyValue.Innovation, timestamp: '2024-07-26T16:45:00Z' },
    { id: 'K004', senderId: 'E1122', receiverId: 'E9876', message: 'Jane handled a critical production issue with incredible calm and professionalism, keeping the client informed and satisfied. A masterclass in customer focus.', value: CompanyValue.CustomerFocus, timestamp: '2024-07-25T11:20:00Z' },
];

export const mockAnnouncements: Announcement[] = [
    { id: 'A001', title: 'Q3 Town Hall Next Week', snippet: 'Join us for our quarterly town hall meeting to discuss our progress and future goals.', category: 'Event', date: '2024-08-15' },
    { id: 'A002', title: 'New Open Enrollment Period for Benefits', snippet: 'The open enrollment period for health and dental benefits begins on September 1st. Please review your options.', category: 'HR Update', date: '2024-08-12' },
    { id: 'A003', title: 'Frontend Team Launches New Component Library', snippet: 'A huge congratulations to the frontend team for launching v1.0 of our new internal component library!', category: 'Tech Blog', date: '2024-08-10' },
    { id: 'A004', title: 'Welcome to Our New Hires!', snippet: 'We are excited to welcome three new members to our team this month. Please make them feel welcome!', category: 'Company News', date: '2024-08-05' },
];

export const mockNotifications: Notification[] = [
    { id: 'N001', recipientId: 'E9876', type: NotificationType.LeaveRequest, message: 'Sarah Jones has submitted a new leave request for approval.', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), read: false },
    { id: 'N002', recipientId: 'E4521', type: NotificationType.Kudos, message: 'Jane Smith gave you kudos for Excellence.', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), read: false },
    { id: 'N003', recipientId: 'E4521', type: NotificationType.PerformanceReview, message: 'Your self-assessment for the H1 2024 performance review is due next week.', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), read: true },
    { id: 'N004', recipientId: 'all', type: NotificationType.System, message: 'The employee handbook has been updated. Please review the new policies.', timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), read: true },
    { id: 'N005', recipientId: 'E5555', type: NotificationType.Kudos, message: 'Alex Doe gave you kudos for Innovation.', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), read: false },
];

export const allLeaveRequests: LeaveRequest[] = [
    // For Alex Doe (E4521), manager is Jane (E9876)
    { id: 'LR001', employeeId: 'E4521', type: 'Annual Leave', startDate: '2024-08-01', endDate: '2024-08-05', reason: 'Family vacation', status: LeaveStatus.Approved },
    { id: 'LR002', employeeId: 'E4521', type: 'Sick Leave', startDate: '2024-07-22', endDate: '2024-07-22', reason: 'Flu', status: LeaveStatus.Approved },
    { id: 'LR-A4521', employeeId: 'E4521', type: 'Sick Leave', startDate: '2024-08-25', endDate: '2024-08-25', reason: 'Doctors Appointment', status: LeaveStatus.Pending },
    { id: 'LR004', employeeId: 'E4521', type: 'Annual Leave', startDate: '2024-06-15', endDate: '2024-06-16', reason: 'Weekend trip', status: LeaveStatus.Rejected },

    // For Sarah Jones (E5555), manager is Jane (E9876)
    { id: 'LR-S5555', employeeId: 'E5555', type: 'Annual Leave', startDate: '2024-09-01', endDate: '2024-09-07', reason: 'Vacation', status: LeaveStatus.Pending }, 
    
    // For Emily White (E7364), manager is Michael (E8455)
    { id: 'LR-E7364', employeeId: 'E7364', type: 'Personal Leave', startDate: '2024-08-10', endDate: '2024-08-11', reason: 'Family event', status: LeaveStatus.Pending },
];

export const allExpenseClaims: ExpenseClaim[] = [
     // For Alex Doe (E4521), manager is Jane (E9876)
    { id: 'EC001', employeeId: 'E4521', date: '2024-07-15', description: 'Client lunch meeting', category: 'Meals', amount: 75.50, status: ExpenseStatus.Approved },
    { id: 'EC002', employeeId: 'E4521', date: '2024-07-18', description: 'Round-trip flight for conference', category: 'Travel', amount: 450.00, status: ExpenseStatus.Pending },
    { id: 'EC004', employeeId: 'E4521', date: '2024-05-10', description: 'Software subscription renewal', category: 'Software', amount: 49.99, status: ExpenseStatus.Rejected },

    // For Chris Pine (E1234), manager is Jane (E9876)
    { id: 'EC-C1234', employeeId: 'E1234', date: '2024-07-29', description: 'React Conf 2024 Ticket', category: 'Travel', amount: 699.00, status: ExpenseStatus.Pending }, 

    // For Emily White (E7364), manager is Michael (E8455)
    { id: 'EC-E7364', employeeId: 'E7364', date: '2024-07-25', description: 'Figma Pro Subscription', category: 'Software', amount: 15.00, status: ExpenseStatus.Pending },
];

export const mockLeaveBalances: { [employeeId: string]: LeaveBalance[] } = {
    'E4521': [ // Alex Doe - Employee
        { type: 'Annual Leave', total: 20, used: 5 },
        { type: 'Sick Leave', total: 10, used: 1 },
        { type: 'Personal Leave', total: 5, used: 2 },
    ],
    'E9876': [ // Jane Smith - Manager
        { type: 'Annual Leave', total: 25, used: 10 },
        { type: 'Sick Leave', total: 10, used: 0 },
        { type: 'Personal Leave', total: 5, used: 1 },
    ],
    'E1122': [ // Robert Brown - Director
        { type: 'Annual Leave', total: 30, used: 8 },
        { type: 'Sick Leave', total: 15, used: 2 },
        { type: 'Personal Leave', total: 7, used: 0 },
    ],
    'E7364': [ // Emily White - Employee
        { type: 'Annual Leave', total: 20, used: 12 },
        { type: 'Sick Leave', total: 10, used: 3 },
        { type: 'Personal Leave', total: 5, used: 5 },
    ],
    'E8455': [ // Michael Green - Manager
        { type: 'Annual Leave', total: 25, used: 4 },
        { type: 'Sick Leave', total: 10, used: 1 },
        { type: 'Personal Leave', total: 5, used: 0 },
    ],
    'E5555': [ // Sarah Jones - Employee
        { type: 'Annual Leave', total: 20, used: 2 },
        { type: 'Sick Leave', total: 10, used: 2 },
        { type: 'Personal Leave', total: 5, used: 1 },
    ],
    'E6666': [ // David Lee - Employee
        { type: 'Annual Leave', total: 20, used: 7 },
        { type: 'Sick Leave', total: 10, used: 0 },
        { type: 'Personal Leave', total: 5, used: 3 },
    ],
    'E1234': [ // Chris Pine - New Hire
        { type: 'Annual Leave', total: 15, used: 0 },
        { type: 'Sick Leave', total: 10, used: 0 },
        { type: 'Personal Leave', total: 5, used: 0 },
    ]
};

export const mockPayslips: Payslip[] = [
    { id: 'PS006', period: 'June 2024', issueDate: '2024-06-28', netPay: 4500.00 },
    { id: 'PS005', period: 'May 2024', issueDate: '2024-05-30', netPay: 4500.00 },
    { id: 'PS004', period: 'April 2024', issueDate: '2024-04-29', netPay: 4450.00 },
    { id: 'PS003', period: 'March 2024', issueDate: '2024-03-29', netPay: 4500.00 },
    { id: 'PS002', period: 'February 2024', issueDate: '2024-02-27', netPay: 4300.00 },
    { id: 'PS001', period: 'January 2024', issueDate: '2024-01-30', netPay: 4500.00 },
];

export const mockPerformanceReviews: PerformanceReview[] = [
    {
        id: 'PR003',
        period: 'H2 2023 Review',
        reviewer: 'Jane Smith',
        rating: PerformanceRating.ExceedsExpectations,
        summary: 'Alex consistently delivered high-quality work and took initiative on several key projects, exceeding all targets.',
        details: {
            strengths: 'Excellent problem-solving skills, strong team collaboration, and proactive project leadership.',
            areasForImprovement: 'Could benefit from delegating smaller tasks more frequently to focus on high-impact activities.',
            goalsForNextPeriod: 'Lead the upcoming "Phoenix" project architecture redesign. Mentor a junior engineer.',
        },
    },
    {
        id: 'PR002',
        period: 'H1 2023 Review',
        reviewer: 'Jane Smith',
        rating: PerformanceRating.MeetsExpectations,
        summary: 'Solid performance throughout the first half of the year. Met all core job responsibilities and targets.',
        details: {
            strengths: 'Reliable and consistent code quality. Good communication within the immediate team.',
            areasForImprovement: 'Increase participation in cross-departmental meetings and technical discussions.',
            goalsForNextPeriod: 'Take ownership of the new analytics module.',
        },
    },
    {
        id: 'PR001',
        period: 'H2 2022 Review',
        reviewer: 'John Davis',
        rating: PerformanceRating.MeetsExpectations,
        summary: 'Successfully onboarded and integrated into the team, quickly becoming a productive member.',
        details: {
            strengths: 'Fast learner, positive attitude, and eager to take on new challenges.',
            areasForImprovement: 'Continue to deepen knowledge of the legacy codebase.',
            goalsForNextPeriod: 'Complete advanced Typescript training.',
        },
    },
];

export const mockDocuments: Document[] = [
    { id: 'DOC001', name: 'Employment Contract.pdf', category: DocumentCategory.Contracts, uploadDate: '2022-01-15' },
    { id: 'DOC002', name: 'Employee Handbook_v3.pdf', category: DocumentCategory.Policies, uploadDate: '2023-01-01' },
    { id: 'DOC003', name: 'W4_2024.pdf', category: DocumentCategory.TaxForms, uploadDate: '2024-01-20' },
    { id: 'DOC004', name: 'Direct Deposit Form.pdf', category: DocumentCategory.Personal, uploadDate: '2022-01-16' },
    { id: 'DOC005', name: 'Performance Review Q4_2023.pdf', category: DocumentCategory.Personal, uploadDate: '2024-01-10' },
    { id: 'DOC006', name: 'Remote Work Policy.pdf', category: DocumentCategory.Policies, uploadDate: '2023-05-11' },
    { id: 'DOC007', name: 'Stock Option Grant.pdf', category: DocumentCategory.Contracts, uploadDate: '2023-07-01' },
];

export const mockEnrolledCourses: Course[] = [
    { id: 'C001', title: 'Advanced React Patterns', description: 'Deep dive into hooks, context, and performance optimization.', status: CourseStatus.InProgress, progress: 75 },
    { id: 'C002', title: 'Leadership for Engineers', description: 'Learn to lead projects and mentor team members effectively.', status: CourseStatus.InProgress, progress: 40 },
    { id: 'C003', title: 'Cybersecurity Fundamentals', description: 'Understand the basics of protecting digital assets.', status: CourseStatus.Completed, progress: 100 },
];

export const mockAvailableCourses: Course[] = [
    { id: 'C004', title: 'Introduction to GraphQL', description: 'Master the query language for your APIs.', status: CourseStatus.NotStarted, progress: 0 },
    { id: 'C005', title: 'Project Management Essentials', description: 'Learn the fundamentals of managing projects from start to finish.', status: CourseStatus.NotStarted, progress: 0 },
    { id: 'C006', title: 'Advanced CSS and Sass', description: 'Take your styling skills to the next level.', status: CourseStatus.NotStarted, progress: 0 },
];

export const mockAttendance: AttendanceRecord[] = [
    { date: '2024-07-22', day: 'Monday', clockIn: '09:05 AM', clockOut: '05:35 PM', totalHours: 8, status: AttendanceStatus.Present },
    { date: '2024-07-21', day: 'Sunday', clockIn: null, clockOut: null, totalHours: 0, status: AttendanceStatus.Holiday },
    { date: '2024-07-20', day: 'Saturday', clockIn: null, clockOut: null, totalHours: 0, status: AttendanceStatus.Holiday },
    { date: '2024-07-19', day: 'Friday', clockIn: '08:58 AM', clockOut: '05:30 PM', totalHours: 8.5, status: AttendanceStatus.Present },
    { date: '2024-07-18', day: 'Thursday', clockIn: '09:00 AM', clockOut: '05:00 PM', totalHours: 8, status: AttendanceStatus.Present },
    { date: '2024-07-17', day: 'Wednesday', clockIn: null, clockOut: null, totalHours: 0, status: AttendanceStatus.OnLeave },
    { date: '2024-07-16', day: 'Tuesday', clockIn: '09:15 AM', clockOut: '06:00 PM', totalHours: 8.75, status: AttendanceStatus.Present },
];

export const mockOnboardingTasks: OnboardingTask[] = [
    // Before You Start
    { id: 'T01', text: 'Complete your new hire paperwork in Workday', completed: true, category: 'Before You Start' },
    { id: 'T02', text: 'Set up your direct deposit information', completed: true, category: 'Before You Start' },
    { id: 'T03', text: 'Review the Employee Handbook', completed: false, category: 'Before You Start' },

    // Your First Week
    { id: 'T04', text: 'Set up your company email and Slack account', completed: true, category: 'Your First Week' },
    { id: 'T05', text: 'Meet with your manager to discuss your 30-60-90 day plan', completed: true, category: 'Your First Week' },
    { id: 'T06', text: 'Schedule introductory meetings with your team members', completed: false, category: 'Your First Week' },
    { id: 'T07', text: 'Complete mandatory security awareness training', completed: false, category: 'Your First Week' },
    
    // First 30 Days
    { id: 'T08', text: 'Enroll in company benefits (Health, Dental, Vision)', completed: false, category: 'First 30 Days' },
    { id: 'T09', text: 'Explore the internal documentation on Confluence', completed: false, category: 'First 30 Days' },
    { id: 'T10', text: 'Contribute your first piece of code or project deliverable', completed: false, category: 'First 30 Days' },
    { id: 'T11', text: 'Attend your first team-wide meeting', completed: false, category: 'First 30 Days' },
];

export const mockOffboardingTasks: OffboardingTask[] = [
    // Knowledge Transfer
    { id: 'OT01', text: 'Document all ongoing projects and their current status', completed: true, category: 'Knowledge Transfer' },
    { id: 'OT02', text: 'Transfer ownership of key documents and reports', completed: false, category: 'Knowledge Transfer' },
    { id: 'OT03', text: 'Conduct a knowledge handover session with your manager/team', completed: false, category: 'Knowledge Transfer' },

    // Asset Return
    { id: 'OT04', text: 'Return company laptop and accessories', completed: false, category: 'Asset Return' },
    { id: 'OT05', text: 'Return company mobile phone', completed: false, category: 'Asset Return' },
    { id: 'OT06', text: 'Return company ID badge and access cards', completed: false, category: 'Asset Return' },
    
    // Final Admin
    { id: 'OT07', text: 'Complete the exit interview with HR', completed: false, category: 'Final Admin' },
    { id: 'OT08', text: 'Review final paycheck details and confirm mailing address', completed: false, category: 'Final Admin' },
    { id: 'OT09', text: 'Understand post-employment benefits (COBRA, 401k, etc.)', completed: false, category: 'Final Admin' },
];

export const mockJobOpenings: JobOpening[] = [
    {
        id: 'JOB001', title: 'Senior Backend Engineer (Go)', department: 'Technology', location: 'Remote', type: 'Full-time',
        description: 'We are seeking an experienced Backend Engineer to design, develop, and maintain our core services. You will work with a talented team to build scalable and reliable systems.',
        qualifications: ['5+ years of experience with Go (Golang)', 'Strong understanding of microservices architecture', 'Experience with AWS or GCP', 'Proficiency with PostgreSQL or similar relational databases']
    },
    {
        id: 'JOB002', title: 'Product Manager', department: 'Product', location: 'New York, NY', type: 'Full-time',
        description: 'As a Product Manager, you will be responsible for the product planning and execution throughout the Product Lifecycle, including gathering and prioritizing product and customer requirements.',
        qualifications: ['3+ years of product management experience in a SaaS company', 'Proven track record of managing all aspects of a successful product throughout its lifecycle', 'Excellent written and verbal communication skills']
    },
    {
        id: 'JOB003', title: 'UX/UI Designer', department: 'Design', location: 'Remote', type: 'Contract',
        description: 'We are looking for a creative UX/UI Designer to join our team on a contract basis. You will be responsible for delivering the best online user experience, which makes your role extremely important for our success.',
        qualifications: ['A strong portfolio of successful UX/UI design projects', 'Proficiency in Figma, Sketch, or Adobe XD', 'Solid understanding of design systems and component-based design']
    },
    {
        id: 'JOB004', title: 'Marketing Analyst', department: 'Marketing', location: 'San Francisco, CA', type: 'Full-time',
        description: 'The Marketing Analyst will be responsible for tracking and analyzing the performance of advertising campaigns, assessing market trends, and providing insights to optimize marketing strategies.',
        qualifications: ['2+ years of experience in marketing analytics', 'Proficiency with Google Analytics and SQL', 'Strong analytical skills with the ability to collect, organize, and analyze significant amounts of information']
    }
];

export const mockTasks: Task[] = [
    {
        id: 'TSK001',
        title: 'today I will fix stock alert ios issue',
        status: TaskStatus.Open,
        priority: TaskPriority.Low,
        creatorId: 'E9876', // Jane Smith
        assigneeId: 'E4521', // Alex Doe
        dueDate: '2024-10-29T00:00:00Z',
        progress: 28,
        messageCount: 1,
    },
    {
        id: 'TSK002',
        title: 'Create New Interface Design for Nesscale Application',
        description: 'The project involves creating wireframes, prototypes, and high-fidelity designs. The proje...',
        status: TaskStatus.Completed,
        priority: TaskPriority.Medium,
        creatorId: 'E8455', // Michael Green
        assigneeId: 'E7364', // Emily White
        dueDate: '2024-08-22T00:00:00Z',
        progress: 100,
        messageCount: 5,
    },
    {
        id: 'TSK003',
        title: 'Refactor Authentication Service',
        description: 'The current authentication service needs to be updated to use the new security protocols.',
        status: TaskStatus.Cancelled,
        priority: TaskPriority.Medium,
        creatorId: 'E9876', // Jane Smith
        assigneeId: 'E5555', // Sarah Jones
        dueDate: '2024-09-15T00:00:00Z',
        progress: 10,
        messageCount: 2,
    },
    {
        id: 'TSK004',
        title: 'Develop API for User Profiles',
        status: TaskStatus.InProgress,
        priority: TaskPriority.High,
        creatorId: 'E9876', // Jane Smith
        assigneeId: 'E5555', // Sarah Jones
        dueDate: '2024-08-30T00:00:00Z',
        progress: 65,
        messageCount: 8,
    },
];