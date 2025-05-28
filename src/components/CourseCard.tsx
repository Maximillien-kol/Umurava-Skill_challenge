import React from 'react';
import Link from 'next/link';
import { Clock, User, BookOpen, Award } from 'lucide-react';
import { CourseCardProps } from '@/types';

const CourseCard: React.FC<CourseCardProps> = ({ course, isEnrolled, onEnroll }) => {
  const handleEnrollClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEnroll(course.id);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200">
      <Link href={`/courses/${course.id}`} className="block group">
        {/* Course Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
            {course.title}
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)} flex-shrink-0 ml-2`}>
            {course.level}
          </span>
        </div>

        {/* Course Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {course.shortDescription}
        </p>

        {/* Course Meta Information */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              <span className="truncate max-w-24">{course.instructor}</span>
            </div>
          </div>
          <div className="flex items-center">
            <BookOpen className="w-4 h-4 mr-1" />
            <span>{course.category}</span>
          </div>
        </div>

        {/* Course Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {course.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
            >
              #{tag}
            </span>
          ))}
          {course.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
              +{course.tags.length - 3} more
            </span>
          )}
        </div>
      </Link>

      {/* Enrollment Button */}
      <div className="pt-4 border-t border-gray-100">
        <button
          onClick={handleEnrollClick}
          className={`w-full py-2 px-4 rounded-md font-medium text-sm transition-all duration-200 flex items-center justify-center ${
            isEnrolled
              ? 'bg-green-100 text-green-800 hover:bg-green-200 border border-green-300'
              : 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none'
          }`}
        >
          {isEnrolled ? (
            <>
              <Award className="w-4 h-4 mr-2" />
              Enrolled
            </>
          ) : (
            <>
              <BookOpen className="w-4 h-4 mr-2" />
              Enroll Now
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;