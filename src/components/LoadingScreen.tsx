import React from 'react';
import { Dog } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center z-50">
      <div className="text-center">
        <Dog className="w-16 h-16 text-white animate-bounce mx-auto mb-4" />
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">CareerPup</h2>
          <div className="flex justify-center gap-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-white rounded-full animate-pulse"
                style={{ animationDelay: `${i * 200}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}