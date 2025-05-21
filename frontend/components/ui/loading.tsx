import React from 'react';

export function Loading() {
  return (
    <div className="flex items-center justify-center h-40">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}
