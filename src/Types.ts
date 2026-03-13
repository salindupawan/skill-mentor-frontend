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
