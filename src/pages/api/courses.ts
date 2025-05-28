import { NextApiRequest, NextApiResponse } from 'next';
import { sampleCourses } from '@/data/courses';
import { Course, CoursesApiResponse } from '@/types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CoursesApiResponse | { success: false; message: string }>
) {
  try {
    // Only allow GET requests
    if (req.method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      return res.status(405).json({
        success: false,
        message: `Method ${req.method} not allowed`
      });
    }

    // Get search query from request
    const { search } = req.query;
    let filteredCourses: Course[] = sampleCourses;

    // Filter courses based on search query
    if (search && typeof search === 'string') {
      const searchQuery = search.toLowerCase().trim();
      
      if (searchQuery) {
        filteredCourses = sampleCourses.filter(course => {
          const searchableText = [
            course.title,
            course.shortDescription,
            course.fullDescription,
            course.instructor,
            course.category,
            ...course.tags,
            ...course.prerequisites
          ].join(' ').toLowerCase();
          
          return searchableText.includes(searchQuery);
        });
      }
    }

    // Sort courses by title for consistent ordering
    filteredCourses.sort((a, b) => a.title.localeCompare(b.title));

    // Simulate slight delay (optional - for realistic API behavior)
    // await new Promise(resolve => setTimeout(resolve, 100));

    // Return successful response
    return res.status(200).json({
      success: true,
      data: filteredCourses,
      message: `Found ${filteredCourses.length} course${filteredCourses.length !== 1 ? 's' : ''}`
    });

  } catch (error) {
    console.error('API Error:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}