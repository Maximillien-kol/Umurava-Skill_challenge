import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GraduationCap, Home, BookOpen } from 'lucide-react';
import { LayoutProps } from '@/types';

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = 'Employee Training Portal' 
}) => {
  const router = useRouter();

  const isActive = (pathname: string) => {
    return router.pathname === pathname;
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Professional training platform for employees and students" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Navigation Header */}
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              {/* Logo and Brand */}
              <div className="flex items-center">
                <Link href="/" className="flex items-center space-x-2 group">
                  <div className="p-2 bg-blue-500 rounded-lg group-hover:bg-blue-600 transition-colors duration-200">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                      Training Portal
                    </h1>
                    <p className="text-xs text-gray-500 hidden sm:block">
                      Professional Development
                    </p>
                  </div>
                </Link>
              </div>

              {/* Navigation Links */}
              <div className="flex items-center space-x-4">
                <Link
                  href="/"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive('/')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  <Home className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Home</span>
                </Link>
                
                <Link
                  href="/courses"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    router.pathname.startsWith('/courses')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  <BookOpen className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Courses</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 sm:mb-0">
                <GraduationCap className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-gray-600">
                  © 2025 Training Portal. Empowering professional growth.
                </span>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <a
                  href="#"
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  Help Center
                </a>
                <a
                  href="#"
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  Contact
                </a>
                <a
                  href="#"
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  Privacy
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;