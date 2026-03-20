export interface Mentor {
  mentorId:number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  title: string;
  profession: string;
  company: string;
  experienceYears: number;
  bio: string;
  profileImageUrl: string;
  isCertified: boolean;
  startYear: number;
  specialization: string;
  totalStudents: number;
  subjects: Subject[];
  reviews: Review[];
}

export interface Review {
  reviewId:number;
  reviewerProfileImageUrl: string;
  comment: string;
  rating: number;
  reviewerFirstName: string;
  reviewerLastName: string;
  reviewDate: string;
}

export interface Subject {
  subjectId: number;
  subjectName: string;
  description: string;
  subjectImageUrl: string;
  noOfEnrollments: number;
  mentor: Mentor;
}

export interface Session {
  sessionId: number;
  mentorName: string;
  sessionStatus: string;
  sessionTitle: string;
  sessionImageUrl: string;
  sessionDate: string;
  startTime: string;
  studentName: string;
  PaymentStatus: string;
  paymentProofLink: string;
}

export interface ErrorResponse {
  message: string;
  errorCode: string;
  timestamp: string;
  validationErrors: Record<string, string>;
}

export interface subjectProps{
    subject:Subject;
}

export interface MentorProps{
  mentor:Mentor;
}

export interface ReviewProps{
  review:Review;
}

export interface CreateSession{
  subjectId:number;
  mentorId:number;
  sessionDate:string;
  sessionStartTime:string;
}

export interface CreateReview{
  comment:string;
  rating:number;
  mentorId:number;
}

export interface CreateMentorRequest{
  firstName:string;
  lastName:string;
  email:string;
  phoneNumber:string;
  title:string;
  profession:string;
  company:string;
  experienceYears:number;
  bio:string;
  isCertified:boolean;
  startYear:number;
  specializations:string;
}

export interface CreateSubjectRequest{
  subjectName:string;
  description:string;
  mentorId:number;
}

export interface PatchSessionRequest{ 
  meetingLink?:string;
  sessionStatus?:string;
  paymentStatus?:string;
}

export interface Booking {
  studentName: string;
  paymentStatus: string;
  subjectName: string;
}

export interface EnrollmentStats {
  subjectName: string;
  count: number;
}

export interface AnalyticsData {
  totalStudents: number;
  activeMentors: number;
  totalBookings: number;
  pendingPayments: number;
  topEnrollments: EnrollmentStats[];
  recentBookings: Booking[];
}
