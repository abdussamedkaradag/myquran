'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

interface Verse {
  id: number;
  verse_number: number;
  verse: string;
  translation: {
    text: string;
    author: {
      name: string;
    };
  };
}

export default function SurahDetailPage() {
  const params = useParams();
  const surahId = params.id;
  const [loading, setLoading] = useState(true);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [surahInfo, setSurahInfo] = useState<any>(null);

  useEffect(() => {
    const fetchSurah = async () => {
      try {
        setLoading(true);
        // Diyanet İşleri meali için author=8
        const response = await axios.get(`https://api.acikkuran.com/surah/${surahId}?author=8`);
        setVerses(response.data.data.verses);
        setSurahInfo(response.data.data);
      } catch (error) {
        console.error('Error fetching surah:', error);
      } finally {
        setLoading(false);
      }
    };

    if (surahId) {
      fetchSurah();
    }
  }, [surahId]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <div className="text-center py-8">Yükleniyor...</div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {surahInfo?.name}
              </h1>
              <p className="text-xl font-arabic mb-2">{surahInfo?.name_ar}</p>
              <p className="text-gray-600">{surahInfo?.verse_count} Ayet</p>
            </div>

            <div className="space-y-8">
              {verses.map((verse) => (
                <div
                  key={verse.id}
                  className="bg-white rounded-lg shadow-sm p-6 space-y-4"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-gray-500 text-sm">
                      {verse.verse_number}
                    </span>
                    <div className="flex-1">
                      <p className="arabic-text font-arabic mb-4">{verse.verse}</p>
                      <p className="text-gray-600">{verse.translation.text}</p>
                      <hr className="my-4 border-gray-100 border-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
} 