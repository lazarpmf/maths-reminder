'use client';

import type { Lesson } from '@/lib/types';

interface CardProps {
  lesson: Lesson;
  onCardClick: (lesson: Lesson) => void;
  onEdit?: (lesson: Lesson) => void;
  onDelete?: (lesson: Lesson) => void;
  isAdmin?: boolean;
}

export default function Card({
  lesson,
  onCardClick,
  onEdit,
  onDelete,
  isAdmin = false,
}: CardProps) {
  const titleWords = lesson.title.split(/\s+/);
  const displayTitle =
    titleWords.length > 50
      ? titleWords.slice(0, 50).join(' ') + '...'
      : lesson.title;

  return (
    <div
      className="group relative cursor-pointer rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
      onClick={() => onCardClick(lesson)}
    >
      {isAdmin && (
        <div
          className="absolute right-2 top-2 z-10 flex gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => onEdit?.(lesson)}
            className="rounded bg-blue-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-blue-700"
          >
            Promijeni
          </button>
          <button
            onClick={() => onDelete?.(lesson)}
            className="rounded bg-red-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-red-700"
          >
            Obriši
          </button>
        </div>
      )}
      <div className="mb-2">
        <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
          {lesson.grade} razred
        </span>
      </div>
      <h3 className="mb-2 text-lg font-semibold text-gray-900 line-clamp-2">
        {displayTitle}
      </h3>
      <p className="text-sm text-gray-600 line-clamp-3">
        {lesson.description}
      </p>
    </div>
  );
}
