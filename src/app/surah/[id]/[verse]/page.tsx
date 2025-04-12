'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface Verse {
  id: number;
  verse_number: number;
  verse: string;
  surah: {
    name: string;
    name_original: string;
    verse_count: number;
  };
  translation: {
    text: string;
  };
}

export default function VersePage() {
  const params = useParams();
  const router = useRouter();
  const surahId = params.id as string;
  const verseNumber = params.verse as string;
  const [verse, setVerse] = useState<Verse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVerse = async () => {
      try {
        const response = await axios.get(`https://api.acikkuran.com/surah/${surahId}/verse/${verseNumber}`);
        setVerse(response.data.data);
      } catch (error) {
        console.error('Ayet yüklenirken hata oluştu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVerse();
  }, [surahId, verseNumber]);

  const handlePreviousVerse = () => {
    if (verse && verse.verse_number > 1) {
      router.push(`/surah/${surahId}/${verse.verse_number - 1}`);
    }
  };

  const handleNextVerse = () => {
    if (verse && verse.verse_number < verse.surah.verse_count) {
      router.push(`/surah/${surahId}/${verse.verse_number + 1}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-pattern bg-cover flex items-center justify-center">
        <div className="text-2xl text-brown-800">Yükleniyor...</div>
      </div>
    );
  }

  if (!verse) {
    return (
      <div className="min-h-screen bg-pattern bg-cover flex items-center justify-center">
        <div className="text-2xl text-brown-800">Ayet bulunamadı</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pattern bg-cover p-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => router.back()}
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brown-100 text-brown-700 hover:bg-brown-200 hover:text-brown-900 transition-all duration-300 shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
          </svg>
          <span className="text-sm font-medium">Geri Dön</span>
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-black mb-2 font-arabic" style={{ fontSize: '2.5rem', lineHeight: '4rem', textAlign: 'right' }}>{verse.surah.name}</h1>
            <p className="text-black font-arabic" style={{ fontSize: '2.5rem', lineHeight: '4rem', textAlign: 'right' }}>{verse.surah.name_original}</p>
          </div>

          <div className="text-center mb-8">
            <div className="text-8xl font-bold text-brown-800 mb-6 leading-tight flex items-center justify-center gap-4 font-arabic" style={{ fontSize: '2.5rem', lineHeight: '4rem', textAlign: 'right', color: 'rgb(var(--foreground-rgb))' }}>
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
                className="text-brown-600 hover:text-brown-800 transition-colors p-0 m-0 bg-transparent border-none outline-none" 
                title="Ayeti Kopyala"
              >
                <span className="material-symbols-outlined">content_copy</span>
              </button>
            </div>
            <div className="text-xl text-gray-700 leading-relaxed flex items-center justify-center gap-4 font-turkish">
              {verse.translation.text}
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(verse.translation.text);
                  toast.success('Meal kopyalandı!', {
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
                className="text-brown-600 hover:text-brown-800 transition-colors p-0 m-0 bg-transparent border-none outline-none" 
                title="Meali Kopyala"
              >
                <span className="material-symbols-outlined">content_copy</span>
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handleNextVerse}
              disabled={verse.verse_number >= verse.surah.verse_count}
              className={`flex items-center px-4 py-2 rounded-full ${
                verse.verse_number >= verse.surah.verse_count
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-brown-600 hover:text-brown-800 hover:bg-brown-100'
              }`}
            >
              Sonraki Ayet
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>

            <span className="px-4 py-2 bg-brown-100 rounded-full text-sm text-gray-500">
              Ayet {verse.verse_number}
            </span>

            <button
              onClick={handlePreviousVerse}
              disabled={verse.verse_number <= 1}
              className={`flex items-center px-4 py-2 rounded-full ${
                verse.verse_number <= 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-brown-600 hover:text-brown-800 hover:bg-brown-100'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Önceki Ayet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 