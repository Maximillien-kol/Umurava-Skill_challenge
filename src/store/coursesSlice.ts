import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Course, CourseState, GetCoursesParams } from '@/types';

// Async thunk for fetching courses
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (params: GetCoursesParams = {}) => {
    const searchParam = params.search ? `?search=${encodeURIComponent(params.search)}` : '';
    const response = await fetch(`/api/courses${searchParam}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    
    const data = await response.json();
    return data.data as Course[];
  }
);

// Initial state
const initialState: CourseState = {
  courses: [],
  enrolledCourses: [],
  searchQuery: '',
  loading: false,
  error: null,
};

// Courses slice
const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    // Enroll in a course
    enrollInCourse: (state, action: PayloadAction<string>) => {
      const courseId = action.payload;
      if (!state.enrolledCourses.includes(courseId)) {
        state.enrolledCourses.push(courseId);
      }
    },
    
    // Unenroll from a course
    unenrollFromCourse: (state, action: PayloadAction<string>) => {
      const courseId = action.payload;
      state.enrolledCourses = state.enrolledCourses.filter(id => id !== courseId);
    },
    
    // Set search query
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    
    // Reset state
    resetState: (state) => {
      state.courses = [];
      state.searchQuery = '';
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch courses pending
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fetch courses fulfilled
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
        state.error = null;
      })
      // Fetch courses rejected
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch courses';
      });
  },
});

// Export actions
export const {
  enrollInCourse,
  unenrollFromCourse,
  setSearchQuery,
  clearError,
  resetState,
} = coursesSlice.actions;

// Selectors
export const selectCourses = (state: { courses: CourseState }) => state.courses.courses;
export const selectEnrolledCourses = (state: { courses: CourseState }) => state.courses.enrolledCourses;
export const selectSearchQuery = (state: { courses: CourseState }) => state.courses.searchQuery;
export const selectLoading = (state: { courses: CourseState }) => state.courses.loading;
export const selectError = (state: { courses: CourseState }) => state.courses.error;

// Helper selector to check if a course is enrolled
export const selectIsCourseEnrolled = (courseId: string) => 
  (state: { courses: CourseState }) => state.courses.enrolledCourses.includes(courseId);

export default coursesSlice.reducer;