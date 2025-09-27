export enum LeaveStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export enum ExpenseStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export enum PerformanceRating {
  NeedsImprovement = 'Needs Improvement',
  MeetsExpectations = 'Meets Expectations',
  ExceedsExpectations = 'Exceeds Expectations',
  Outstanding = 'Outstanding',
}

export enum DocumentCategory {
    Contracts = 'Contracts',
    Policies = 'Policies',
    TaxForms = 'Tax Forms',
    Personal = 'Personal',
}

export enum CourseStatus {
    NotStarted = 'Not Started',
    InProgress = 'In Progress',
    Completed = 'Completed',
}

export enum AttendanceStatus {
    Present = 'Present',
    OnLeave = 'On Leave',
    Holiday = 'Holiday',
    Absent = 'Absent',
}

export enum CompanyValue {
    Teamwork = 'Teamwork',
    Innovation = 'Innovation',
    CustomerFocus = 'Customer Focus',
    Integrity = 'Integrity',
    Excellence = 'Excellence',
}

export enum NotificationType {
    Kudos = 'Kudos',
    LeaveRequest = 'Leave Request',
    PerformanceReview = 'Performance Review',
    System = 'System',
}

export enum ApprovalAction {
    Approve = 'Approved',
    Reject = 'Rejected',
}

export enum TaskStatus {
    Open = 'Open',
    InProgress = 'In Progress',
    Completed = 'Completed',
    Cancelled = 'Cancelled',
}

export enum TaskPriority {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
}

export interface BenefitEnrollment {
    medical: {
        planName: string;
        coverageTier: string;
        costPerPaycheck: number;
    };
    dental: {
        planName: string;
        coverageTier: string;
        costPerPaycheck: number;
    };
    vision: {
        planName: string;
        coverageTier: string;
        costPerPaycheck: number;
    };
    retirement: {
        contributionRate: number; // Percentage
        employerMatch: string;
        balance: number;
    };
}

export interface CalendarEvent {
    date: string; // YYYY-MM-DD
    title: string;
    type: 'holiday' | 'event';
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  address: string;
  avatarUrl: string;
  managerId?: string;
  role?: 'new_hire' | 'employee' | 'manager' | 'director';
  compensation: {
      salary: number;
      lastBonus: {
          amount: number;
          date: string;
      }
  };
  benefits: BenefitEnrollment;
}

export interface LeaveRequest {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
  employeeId?: string;
}

export interface LeaveBalance {
  type: 'Annual Leave' | 'Sick Leave' | 'Personal Leave';
  total: number;
  used: number;
}

export interface Payslip {
  id: string;
  period: string;
  issueDate: string;
  netPay: number;
}

export interface ExpenseClaim {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  status: ExpenseStatus;
  employeeId?: string;
}

export interface PerformanceReview {
    id: string;
    period: string;
    reviewer: string;
    rating: PerformanceRating;
    summary: string;
    details: {
        strengths: string;
        areasForImprovement: string;
        goalsForNextPeriod: string;
    }
}

export interface Document {
    id: string;
    name: string;
    category: DocumentCategory;
    uploadDate: string;
}

export interface Course {
    id: string;
    title: string;
    description: string;
    status: CourseStatus;
    progress: number; // Percentage 0-100
}

export interface AttendanceRecord {
    date: string;
    day: string;
    clockIn: string | null;
    clockOut: string | null;
    totalHours: number;
    status: AttendanceStatus;
}

export interface JobOpening {
    id: string;
    title: string;
    department: string;
    location: string;
    type: 'Full-time' | 'Part-time' | 'Contract';
    description: string;
    qualifications: string[];
}

export interface OnboardingTask {
    id: string;
    text: string;
    completed: boolean;
    category: 'Before You Start' | 'Your First Week' | 'First 30 Days';
}

export interface OffboardingTask {
    id: string;
    text: string;
    completed: boolean;
    category: 'Knowledge Transfer' | 'Asset Return' | 'Final Admin';
}

export interface Kudo {
    id: string;
    senderId: string;
    receiverId: string;
    message: string;
    value: CompanyValue;
    timestamp: string; // ISO 8601 format
}

export interface Announcement {
    id: string;
    title: string;
    snippet: string;
    category: 'Company News' | 'HR Update' | 'Tech Blog' | 'Event';
    date: string; // YYYY-MM-DD
}

export interface Notification {
    id: string;
    type: NotificationType;
    message: string;
    timestamp: string; // ISO 8601 format
    read: boolean;
    recipientId: string; // The ID of the employee who should see this, or 'all'
    relatedId?: string; // e.g., the ID of the kudo or leave request
}

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    creatorId: string;
    assigneeId: string;
    dueDate: string; // ISO 8601 Date
    progress: number; // 0-100
    messageCount: number;
}

export type DashboardWidget = 'quickActions' | 'recognition' | 'announcements';

export interface DashboardLayout {
    left: DashboardWidget[];
    right: DashboardWidget[];
}