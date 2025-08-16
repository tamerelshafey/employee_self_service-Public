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
  role?: 'manager' | 'employee';
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