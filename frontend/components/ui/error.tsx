import React from 'react';

interface ErrorProps {
  message: string;
}

export function Error({ message }: ErrorProps) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {message}
    </div>
  );
}
