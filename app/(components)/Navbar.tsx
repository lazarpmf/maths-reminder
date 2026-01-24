'use client';

import Link from 'next/link';

interface NavbarProps {
  onAboutClick?: () => void;
  onHomeClick?: () => void;
}

export default function Navbar({ onAboutClick, onHomeClick }: NavbarProps) {
  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4 sm:space-x-8">
            <Link
              href="/"
              onClick={onHomeClick}
              className="text-xl font-semibold text-gray-900 hover:text-gray-700"
            >
              Matematički podsjetnik
            </Link>
            <div className="hidden space-x-4 md:flex">
              <Link
                href="#about"
                onClick={onAboutClick}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                O nama
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button
              type="button"
              onClick={onAboutClick}
              className="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700 hover:bg-gray-50"
            >
              O nama
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
