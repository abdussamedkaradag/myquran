'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import transliterations from '@/data/transliterations.json';

interface WordMeaning {
  kelime: string;
  anlam: string;
}

interface VerseData {
  okunus: string;
  kelime_meali: WordMeaning[];
}

interface Verse {
  data: {
    verse: string;
    verse_number: number;
    surah: {
      name: string;
      name_original: string;
      verse_count: number;
    };
  };
}

const getDiyanetMeal = async (surahId: string, verseId: string) => {
  try {
    const response = await fetch(`https://api.alquran.cloud/v1/ayah/${surahId}:${verseId}/tr.diyanet`);
    const data = await response.json();
    return data.data.text;
  } catch (error) {
    console.error('Diyanet meal alınamadı:', error);
    return null;
  }
};

export default function VerseDetailPage() {
  const [verse, setVerse] = useState<Verse['data'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [diyanetMeal, setDiyanetMeal] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchVerse = async () => {
      try {
        setIsLoading(true);
        const surahId = params.id as string;
        const verseId = params.verse as string;

        if (!surahId || !verseId) {
          console.error('Surah ID veya Verse ID bulunamadı');
          return;
        }

        const response = await fetch(`https://api.acikkuran.com/surah/${surahId}/verse/${verseId}`);
        const data: Verse = await response.json();
        setVerse(data.data);

        if (data.data) {
          const meal = await getDiyanetMeal(surahId, verseId);
          setDiyanetMeal(meal);
        }
      } catch (error) {
        console.error('Error fetching verse:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVerse();
  }, [params.id, params.verse]);

  const getVerseData = () => {
    const surahId = params.id as string;
    const verseId = params.verse as string;
    const data = transliterations[surahId]?.[verseId];
    return data ? (data as unknown as VerseData) : undefined;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-pattern bg-cover flex items-center justify-center p-4 md:p-8">
        <div className="max-w-3xl w-full mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 backdrop-blur-sm bg-opacity-90">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-600"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!verse) {
    return (
      <div className="min-h-screen bg-pattern bg-cover flex items-center justify-center p-4 md:p-8">
        <div className="max-w-3xl w-full mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 backdrop-blur-sm bg-opacity-90">
            <p className="text-center text-brown-600">Ayet bulunamadı.</p>
          </div>
        </div>
      </div>
    );
  }

  const verseData = getVerseData();

  return (
    <div className="min-h-screen bg-pattern bg-cover flex items-center justify-center p-4 md:p-8">
      <div className="max-w-3xl w-full mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => router.back()}
            className="detail-back-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Geri Dön</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 backdrop-blur-sm bg-opacity-90">
          <div className="detail-surah-title-container text-center">
            <h1 className="detail-surah-title">{verse.surah.name}</h1>
            <p className="detail-surah-title-arabic">{verse.surah.name_original}</p>
          </div>

          <div className="text-center mb-8">
            <div className="detail-arabic-text text-8xl font-bold text-brown-800 mb-6 leading-tight flex items-center justify-center gap-4 font-arabic" style={{ fontSize: '2.5rem', lineHeight: '4rem', textAlign: 'right', color: 'rgb(var(--foreground-rgb))' }}>
              {verse.verse}
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(verse.verse);
                  toast.success('Ayet kopyalandı!', {
                    style: {
                      background: '#4B5563',
                      color: '#fff',
                      padding: '16px',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    },
                    icon: '📋',
                  });
                }}
                className="detail-copy-button text-brown-600 hover:text-brown-800 transition-colors p-0 m-0 bg-transparent border-none outline-none" 
                title="Ayeti Kopyala"
              >
                <span className="material-symbols-outlined">content_copy</span>
              </button>
            </div>

            {verseData?.okunus && (
              <div className="detail-okunus-text text-lg text-brown-700 leading-relaxed mb-6 font-turkish bg-brown-50 p-6 rounded-xl">
                {verseData.okunus}
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(verseData.okunus);
                    toast.success('Okunuş kopyalandı!', {
                      style: {
                        background: '#4B5563',
                        color: '#fff',
                        padding: '16px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      },
                      icon: '📋',
                    });
                  }}
                  className="detail-copy-button text-brown-600 hover:text-brown-800 transition-colors p-0 m-0 bg-transparent border-none outline-none ml-2" 
                  title="Okunuşu Kopyala"
                >
                  <span className="material-symbols-outlined">content_copy</span>
                </button>
              </div>
            )}

            {diyanetMeal && (
              <div className="detail-meal-text text-xl text-brown-700 leading-relaxed flex items-center justify-center gap-4 font-turkish bg-brown-50 p-6 rounded-xl mb-6">
                {diyanetMeal}
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(diyanetMeal);
                    toast.success('Diyanet meal kopyalandı!', {
                      style: {
                        background: '#4B5563',
                        color: '#fff',
                        padding: '16px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      },
                      icon: '📋',
                    });
                  }}
                  className="detail-copy-button text-brown-600 hover:text-brown-800 transition-colors p-0 m-0 bg-transparent border-none outline-none" 
                  title="Diyanet Mealini Kopyala"
                >
                  <span className="material-symbols-outlined">content_copy</span>
                </button>
              </div>
            )}

            {verseData?.kelime_meali && (
              <div className="detail-word-meaning-container mb-6">
                <div className="detail-word-meaning-grid grid grid-cols-1 md:grid-cols-2 gap-4">
                  {verseData.kelime_meali.map((word, index) => (
                    <div key={index} className="detail-word-meaning-item flex items-start gap-2">
                      <span className="detail-word-meaning-arabic font-medium text-brown-800">{word.kelime}:</span>
                      <span className="detail-word-meaning-turkish text-brown-700">{word.anlam}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 