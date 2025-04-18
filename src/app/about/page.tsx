'use client';

import { useRouter } from 'next/navigation';

export default function About() {
  const router = useRouter();

  return (
    <div className="quran-app-container min-h-screen bg-pattern bg-cover flex items-center justify-center p-4">
      <div className="quran-content-container bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-8 max-w-md w-full mx-auto">
        <h1 className="text-4xl font-semibold text-center mb-8 text-brown-800">Hakkında</h1>
        
        <div className="text-center">
          <p className="text-gray-600 mb-4">Bu sayfa yakında güncellenecektir.</p>
          <button
            onClick={() => router.push('/')}
            className="bg-brown-200 hover:bg-brown-300 text-brown-800 font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    </div>
  );
} 