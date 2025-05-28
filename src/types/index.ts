// Course related types
export interface Course {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  instructor: string;
  prerequisites: string[];
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface CoursesApiResponse extends ApiResponse<Course[]> {}

// Redux state types
export interface CourseState {
  courses: Course[];
  enrolledCourses: string[];
  searchQuery: string;
  loading: boolean;
  error: string | null;
}

// Component prop types
export interface CourseCardProps {
  course: Course;
  isEnrolled: boolean;
  onEnroll: (courseId: string) => void;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
}

export interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

// API request types
export interface GetCoursesParams {
  search?: string;
}

// Enrollment action types
export interface EnrollmentPayload {
  courseId: string;
}

// Error types
export interface ApiError {
  message: string;
  statusCode?: number;
}