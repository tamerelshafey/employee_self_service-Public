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

export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  address: string;
  avatarUrl: string;
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