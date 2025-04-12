'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

interface Verse {
  id: number;
  verse_number: number;
  verse: string;
  surah_id: number;
  surah: {
    id: number;
    name: string;
    name_ar: string;
  };
  translation?: {
    text: string;
    author?: {
      name: string;
    };
  };
}

const JUZ_DATA = [
  { id: 1, start: { surah: 1, verse: 1 }, end: { surah: 2, verse: 141 } },
  { id: 2, start: { surah: 2, verse: 142 }, end: { surah: 2, verse: 252 } },
  { id: 3, start: { surah: 2, verse: 253 }, end: { surah: 3, verse: 92 } },
  { id: 4, start: { surah: 3, verse: 93 }, end: { surah: 4, verse: 23 } },
  { id: 5, start: { surah: 4, verse: 24 }, end: { surah: 4, verse: 147 } },
  { id: 6, start: { surah: 4, verse: 148 }, end: { surah: 5, verse: 81 } },
  { id: 7, start: { surah: 5, verse: 82 }, end: { surah: 6, verse: 110 } },
  { id: 8, start: { surah: 6, verse: 111 }, end: { surah: 7, verse: 87 } },
  { id: 9, start: { surah: 7, verse: 88 }, end: { surah: 8, verse: 40 } },
  { id: 10, start: { surah: 8, verse: 41 }, end: { surah: 9, verse: 92 } },
  { id: 11, start: { surah: 9, verse: 93 }, end: { surah: 11, verse: 5 } },
  { id: 12, start: { surah: 11, verse: 6 }, end: { surah: 12, verse: 52 } },
  { id: 13, start: { surah: 12, verse: 53 }, end: { surah: 14, verse: 52 } },
  { id: 14, start: { surah: 15, verse: 1 }, end: { surah: 16, verse: 128 } },
  { id: 15, start: { surah: 17, verse: 1 }, end: { surah: 18, verse: 74 } },
  { id: 16, start: { surah: 18, verse: 75 }, end: { surah: 20, verse: 135 } },
  { id: 17, start: { surah: 21, verse: 1 }, end: { surah: 22, verse: 78 } },
  { id: 18, start: { surah: 23, verse: 1 }, end: { surah: 25, verse: 20 } },
  { id: 19, start: { surah: 25, verse: 21 }, end: { surah: 27, verse: 55 } },
  { id: 20, start: { surah: 27, verse: 56 }, end: { surah: 29, verse: 45 } },
  { id: 21, start: { surah: 29, verse: 46 }, end: { surah: 33, verse: 30 } },
  { id: 22, start: { surah: 33, verse: 31 }, end: { surah: 36, verse: 27 } },
  { id: 23, start: { surah: 36, verse: 28 }, end: { surah: 39, verse: 31 } },
  { id: 24, start: { surah: 39, verse: 32 }, end: { surah: 41, verse: 46 } },
  { id: 25, start: { surah: 41, verse: 47 }, end: { surah: 45, verse: 37 } },
  { id: 26, start: { surah: 46, verse: 1 }, end: { surah: 51, verse: 30 } },
  { id: 27, start: { surah: 51, verse: 31 }, end: { surah: 57, verse: 29 } },
  { id: 28, start: { surah: 58, verse: 1 }, end: { surah: 66, verse: 12 } },
  { id: 29, start: { surah: 67, verse: 1 }, end: { surah: 77, verse: 50 } },
  { id: 30, start: { surah: 78, verse: 1 }, end: { surah: 114, verse: 6 } }
];

// Sure isimlerini içeren obje
const SURAH_NAMES: { [key: number]: string } = {
  1: "Fatiha",
  2: "Bakara",
  3: "Al-i İmran",
  4: "Nisa",
  5: "Maide",
  6: "En'am",
  7: "A'raf",
  8: "Enfal",
  9: "Tevbe",
  10: "Yunus",
  // ... diğer sure isimleri
};

export default function JuzDetailPage() {
  const params = useParams();
  const juzId = Number(params.id);
  const [loading, setLoading] = useState(true);
  const [verses, setVerses] = useState<Verse[]>([]);
  const juzInfo = JUZ_DATA.find(j => j.id === juzId);

  useEffect(() => {
    const fetchJuzVerses = async () => {
      if (!juzInfo) return;

      try {
        setLoading(true);
        const startSurah = juzInfo.start.surah;
        const endSurah = juzInfo.end.surah;
        const allVerses: Verse[] = [];

        // Her sure için ayetleri çekelim
        for (let surahId = startSurah; surahId <= endSurah; surahId++) {
          const response = await axios.get(`https://api.acikkuran.com/surah/${surahId}?author=8`);
          const surahVerses = response.data.data.verses;
          
          // Sadece cüze ait ayetleri filtreleyelim
          const filteredVerses = surahVerses.filter((verse: Verse) => {
            if (surahId === startSurah && surahId === endSurah) {
              return verse.verse_number >= juzInfo.start.verse && verse.verse_number <= juzInfo.end.verse;
            } else if (surahId === startSurah) {
              return verse.verse_number >= juzInfo.start.verse;
            } else if (surahId === endSurah) {
              return verse.verse_number <= juzInfo.end.verse;
            }
            return true;
          });

          // Her ayete sure bilgisini ekleyelim
          const versesWithSurah = filteredVerses.map((verse: Verse) => ({
            ...verse,
            surah_id: surahId
          }));

          allVerses.push(...versesWithSurah);
        }

        setVerses(allVerses);
      } catch (error) {
        console.error('Error fetching juz verses:', error);
      } finally {
        setLoading(false);
      }
    };

    if (juzId) {
      fetchJuzVerses();
    }
  }, [juzId, juzInfo]);

  if (!juzInfo) {
    return <div className="text-center py-8">Cüz bulunamadı</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <div className="text-center py-8">Yükleniyor...</div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-brown-800 mb-4">
                {juzInfo.id}. Cüz
              </h1>
              <div className="flex flex-col gap-2 text-gray-600">
                <p className="text-lg">
                  <span className="font-semibold text-brown-700">Başlangıç: </span>
                  {SURAH_NAMES[juzInfo.start.surah] || `Sure ${juzInfo.start.surah}`}, {juzInfo.start.verse}. Ayet
                </p>
                <p className="text-lg">
                  <span className="font-semibold text-brown-700">Bitiş: </span>
                  {SURAH_NAMES[juzInfo.end.surah] || `Sure ${juzInfo.end.surah}`}, {juzInfo.end.verse}. Ayet
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {verses.map((verse) => (
                <div
                  key={`${verse.surah_id}-${verse.verse_number}`}
                  className="bg-white rounded-lg shadow-sm p-6 space-y-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-gray-500 text-sm text-right min-w-[60px]">
                      <div>{SURAH_NAMES[verse.surah_id] || `Sure ${verse.surah_id}`}</div>
                      <div>{verse.verse_number}</div>
                    </div>
                    <div className="flex-1">
                      <p className="arabic-text font-arabic mb-4">{verse.verse}</p>
                      <p className="text-gray-600">{verse.translation?.text}</p>
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