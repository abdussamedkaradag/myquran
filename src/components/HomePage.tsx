'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handleOptionSelect = (option: 'surah' | 'juz' | 'verse') => {
    router.push(`/${option}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center text-green-800 mb-8">
          Kuran-ı Kerim
        </h1>
        
        <div className="space-y-6">
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => handleOptionSelect('surah')}
              className="px-6 py-3 rounded-lg transition-all bg-green-600 text-white hover:bg-green-700"
            >
              Sure Seç
            </button>
            <button
              onClick={() => handleOptionSelect('juz')}
              className="px-6 py-3 rounded-lg transition-all bg-green-600 text-white hover:bg-green-700"
            >
              Cüz Seç
            </button>
            <button
              onClick={() => handleOptionSelect('verse')}
              className="px-6 py-3 rounded-lg transition-all bg-green-600 text-white hover:bg-green-700"
            >
              Ayet Ara
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 