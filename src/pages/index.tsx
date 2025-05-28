import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { AlertCircle, BookOpen, Users, Award } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store';
import { 
  fetchCourses, 
  setSearchQuery, 
  enrollInCourse, 
  unenrollFromCourse,
  selectCourses,
  selectEnrolledCourses,
  selectSearchQuery,
  selectLoading,
  selectError,
  selectIsCourseEnrolled
} from '@/store/coursesSlice';
import CourseCard from '@/components/CourseCard';
import SearchBar from '@/components/SearchBar';
import LoadingSpinner from '@/components/LoadingSpinner';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const courses = useAppSelector(selectCourses);
  const enrolledCourses = useAppSelector(selectEnrolledCourses);
  const searchQuery = useAppSelector(selectSearchQuery);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  // Fetch courses on component mount and when search query changes
  useEffect(() => {
    dispatch(fetchCourses({ search: searchQuery }));
  }, [dispatch]);

  // Handle search with debouncing
  const handleSearch = () => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      dispatch(fetchCourses({ search: searchQuery }));
    }, 300);

    setSearchTimeout(timeout);
  };

  // Handle search input change
  const handleSearchChange = (value: string) => {
    dispatch(setSearchQuery(value));
    handleSearch();
  };

  // Handle enrollment toggle
  const handleEnrollment = (courseId: string) => {
    const isEnrolled = enrolledCourses.includes(courseId);
    if (isEnrolled) {
      dispatch(unenrollFromCourse(courseId));
    } else {
      dispatch(enrollInCourse(courseId));
    }
  };

  // Calculate statistics
  const stats = {
    totalCourses: courses.length,
    enrolledCount: enrolledCourses.length,
    categories: [...new Set(courses.map(course => course.category))].length,
  };

  return (
    <>
      <Head>
        <title>Employee Training Portal - Home</title>
        <meta name="description" content="Browse and enroll in professional training courses. Enhance your skills with our comprehensive course catalog." />
      </Head>

      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Your Learning Journey
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover professional training courses designed to enhance your skills and advance your career. 
              From programming to design, find the perfect course for your growth.
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{stats.totalCourses}</h3>
                <p className="text-gray-600">Available Courses</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{stats.enrolledCount}</h3>
                <p className="text-gray-600">Your Enrollments</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{stats.categories}</h3>
                <p className="text-gray-600">Course Categories</p>
              </div>
            </div>

            {/* Search Bar */}
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              onSearch={handleSearch}
              placeholder="Search courses by title, category, or instructor..."
            />
          </div>

          {/* Course Results */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {searchQuery ? `Search Results for "${searchQuery}"` : 'Available Courses'}
              </h2>
              <span className="text-sm text-gray-500">
                {courses.length} course{courses.length !== 1 ? 's' : ''} found
              </span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-700 font-medium">Error loading courses</span>
              </div>
              <p className="text-red-600 mt-1">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <LoadingSpinner size="lg" />
              <span className="ml-2 text-gray-600">Loading courses...</span>
            </div>
          ) : (
            <>
              {/* Course Grid */}
              {courses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      isEnrolled={enrolledCourses.includes(course.id)}
                      onEnroll={handleEnrollment}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {searchQuery ? 'No courses found' : 'No courses available'}
                  </h3>
                  <p className="text-gray-600">
                    {searchQuery 
                      ? 'Try adjusting your search terms or browse all courses.' 
                      : 'Check back later for new courses.'}
                  </p>
                  {searchQuery && (
                    <button
                      onClick={() => {
                        dispatch(setSearchQuery(''));
                        dispatch(fetchCourses());
                      }}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                      View All Courses
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;