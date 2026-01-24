'use client';

import type { Lesson } from '@/lib/types';
import Card from './Card';

interface CardGridProps {
  lessons: Lesson[];
  onCardClick: (lesson: Lesson) => void;
  onEdit?: (lesson: Lesson) => void;
  onDelete?: (lesson: Lesson) => void;
  isAdmin?: boolean;
}

export default function CardGrid({
  lessons,
  onCardClick,
  onEdit,
  onDelete,
  isAdmin = false,
}: CardGridProps) {
  if (lessons.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">No lessons found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {lessons.map((lesson) => (
          <Card
            key={lesson.id}
            lesson={lesson}
            onCardClick={onCardClick}
            onEdit={onEdit}
            onDelete={onDelete}
            isAdmin={isAdmin}
          />
        ))}
      </div>
    </div>
  );
}
