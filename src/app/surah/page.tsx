'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Surah {
  id: number;
  name: string;
  name_original: string;
  verse_count: number;
  page_number: number;
}

// Cüz hesaplama fonksiyonu
const calculateJuz = (pageNumber: number, surahId: number): number => {
  // Karia suresi (101) ve sonrası için cüz 30
  if (surahId >= 101) {
    return 30;
  }
  // Her cüz yaklaşık 20 sayfa
  return Math.floor(pageNumber / 20) + 1;
};

export default function SurahPage() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch('https://api.acikkuran.com/surahs');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API Response:', data);
        console.log('Data structure:', {
          data: data.data,
          firstSurah: data.data?.[0],
          juzValue: data.data?.[0]?.juz
        });
        setSurahs(data.data || []);
      } catch (error) {
        console.error('Error fetching surahs:', error);
        setSurahs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSurahs();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-pattern bg-cover flex items-center justify-center p-4 md:p-8">
        <div className="max-w-6xl w-full mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 backdrop-blur-sm bg-opacity-90">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-600"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pattern bg-cover flex items-center justify-center p-4 md:p-8">
      <div className="max-w-6xl w-full mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 backdrop-blur-sm bg-opacity-90">
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => router.push('/')}
              className="home-button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Anasayfa</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-brown-200">
                  <th className="text-center py-4 px-4 text-brown-600 font-medium">Ayet Sayısı</th>
                  <th className="text-center py-4 px-4 text-brown-600 font-medium">Cüz</th>
                  <th className="text-left py-4 px-4 text-brown-600 font-medium">Türkçe Adı</th>
                  <th className="text-right py-4 px-4 text-brown-600 font-medium">Arapça Adı</th>
                  <th className="text-left py-4 px-4 text-brown-600 font-medium">Sıra</th>
                </tr>
              </thead>
              <tbody>
                {surahs.map((surah) => (
                  <tr 
                    key={surah.id}
                    onClick={() => router.push(`/surah/${surah.id}`)}
                    className="border-b-2 border-brown-100 hover:bg-brown-50 cursor-pointer transition-colors duration-200"
                  >
                    <td className="py-4 px-4 text-brown-700 text-center">{surah.verse_count}</td>
                    <td className="py-4 px-4 text-brown-700 text-center font-medium">{calculateJuz(surah.page_number, surah.id)}</td>
                    <td className="py-4 px-4 text-brown-700">{surah.name}</td>
                    <td className="py-4 px-4 text-brown-700 font-arabic text-right">{surah.name_original}</td>
                    <td className="py-4 px-4 text-brown-700 font-medium">{surah.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 