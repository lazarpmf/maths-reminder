'use client';

import Link from 'next/link';

interface NavbarProps {
  onAboutClick?: () => void;
  onHomeClick?: () => void;
  isAboutActive?: boolean;
}

export default function Navbar({
  onAboutClick,
  onHomeClick,
  isAboutActive = false,
}: NavbarProps) {
  const isHomeActive = !isAboutActive;
  const tabBase =
    'rounded-t-lg border border-transparent px-4 py-1.5 text-sm font-medium transition-colors -mb-px';
  const tabActive = 'bg-white text-gray-900 border-gray-200 border-b-white';
  const tabInactive = 'text-gray-700 bg-gray-100 hover:bg-gray-200';

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
              <span
                className={`${tabBase} ${
                  isHomeActive ? tabActive : tabInactive
                }`}
              >
                Matematički podsjetnik
              </span>
            </Link>
            <div className="hidden space-x-4 md:flex">
              <Link
                href="#about"
                onClick={onAboutClick}
                className={`${tabBase} ${
                  isAboutActive ? tabActive : tabInactive
                }`}
              >
                O nama
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button
              type="button"
              onClick={onAboutClick}
              className={`${tabBase} ${
                isAboutActive ? tabActive : tabInactive
              }`}
            >
              O nama
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
